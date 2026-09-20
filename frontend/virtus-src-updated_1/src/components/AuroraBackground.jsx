import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * AuroraBackground
 * Fixed, full-viewport WebGL canvas rendering a drifting particle mesh
 * ("fluid aurora") in obsidian + champagne-gold tones. Reacts to the
 * user's mouse position in real time. Sits behind all content
 * (z-index 0) at opacity 0.75, defined in .v-aurora-canvas.
 */
export default function AuroraBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // --- Particle field -----------------------------------------------
    const COUNT = 2600;
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const colorMix = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      seeds[i] = Math.random() * Math.PI * 2;
      colorMix[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute('aMix', new THREE.BufferAttribute(colorMix, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uGold: { value: new THREE.Color('#e2b714') },
        uWhite: { value: new THREE.Color('#f4ede0') },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute float aSeed;
        attribute float aMix;
        varying float vMix;
        varying float vAlpha;

        void main() {
          vMix = aMix;
          vec3 pos = position;

          float t = uTime * 0.18;
          pos.x += sin(t + aSeed) * 1.4;
          pos.y += cos(t * 0.8 + aSeed * 1.7) * 1.1;
          pos.z += sin(t * 0.6 + aSeed * 2.3) * 1.2;

          // gentle mouse-reactive drift toward cursor
          vec2 toMouse = uMouse * 3.5 - pos.xy * 0.02;
          pos.x += toMouse.x * 0.12;
          pos.y += toMouse.y * 0.12;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float dist = length(mvPosition.xyz);
          vAlpha = smoothstep(14.0, 4.0, dist);

          gl_PointSize = (18.0 + sin(t * 2.0 + aSeed) * 6.0) * (6.0 / dist);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uGold;
        uniform vec3 uWhite;
        varying float vMix;
        varying float vAlpha;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float soft = smoothstep(0.5, 0.0, d);
          vec3 color = mix(uWhite, uGold, vMix);
          gl_FragColor = vec4(color, soft * vAlpha * 0.55);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Soft aurora plane behind the particles for depth
    const planeGeo = new THREE.PlaneGeometry(40, 24, 1, 1);
    const planeMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv - 0.5;
          float t = uTime * 0.05;
          float d1 = length(uv - vec2(sin(t) * 0.25, cos(t * 0.7) * 0.2) - uMouse * 0.15);
          float d2 = length(uv - vec2(cos(t * 0.6) * 0.3, sin(t * 0.9) * 0.25));
          float glow = smoothstep(0.55, 0.0, d1) * 0.10 + smoothstep(0.6, 0.0, d2) * 0.06;
          vec3 gold = vec3(0.886, 0.718, 0.078);
          gl_FragColor = vec4(gold * glow * 3.0, glow);
        }
      `,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.z = -6;
    scene.add(plane);

    // --- Mouse tracking --------------------------------------------------
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const onPointerMove = (e) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointerMove);

    // --- Resize ------------------------------------------------------
    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // --- Animate -------------------------------------------------------
    let rafId;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      mouse.lerp(targetMouse, 0.04);

      material.uniforms.uTime.value = elapsed;
      material.uniforms.uMouse.value.copy(mouse);
      planeMat.uniforms.uTime.value = elapsed;
      planeMat.uniforms.uMouse.value.copy(mouse);

      points.rotation.y = mouse.x * 0.15;
      points.rotation.x = mouse.y * 0.08;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="v-aurora-canvas" aria-hidden="true" />;
}
