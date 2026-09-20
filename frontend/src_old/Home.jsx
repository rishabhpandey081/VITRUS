import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Server, Headphones, HardDrive, Cpu, FileText, CheckCircle2, ArrowRight, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({ company: '', name: '', email: '', phone: '', staff: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const slaTiers = [
    { level: 'P1', example: 'Whole site down, no one can work', actual: 4, target: 15 },
    { level: 'P2', example: 'Department blocked, one system down', actual: 11, target: 30 },
    { level: 'P3', example: 'Individual blocked, workaround exists', actual: 26, target: 120 },
    { level: 'P4', example: 'Request, change, or question', actual: 74, target: 480 },
  ];

  const services = [
    { icon: <Headphones className="w-6 h-6 text-[#b3e93a]" />, title: 'Helpdesk', desc: 'Unlimited support by phone, email, and portal, staffed 07:30 to 18:30 with out-of-hours cover for priority one. Every ticket goes to a human first, not a form.' },
    { icon: <Server className="w-6 h-6 text-[#b3e93a]" />, title: 'Infrastructure', desc: 'Servers, networking, firewalls, and Wi-Fi, whether on premises, in Azure, or the awkward mixture most companies actually run.' },
    { icon: <Cpu className="w-6 h-6 text-[#b3e93a]" />, title: 'Microsoft 365', desc: 'Migration, tenant hardening, Intune device management, SharePoint that people can navigate, and licensing reviews that usually save money.' },
    { icon: <ShieldCheck className="w-6 h-6 text-[#b3e93a]" />, title: 'Cyber Essentials', desc: 'Certification support and the remediation work to actually pass it, rather than a checklist you fill in optimistically.' },
    { icon: <HardDrive className="w-6 h-6 text-[#b3e93a]" />, title: 'Backup & Recovery', desc: 'Immutable backups, quarterly restore testing, and a documented recovery plan. We test restores because backups that have never been restored are a rumour.' },
    { icon: <FileText className="w-6 h-6 text-[#b3e93a]" />, title: 'Procurement', desc: 'Hardware specification, purchase, imaging, and asset tagging, delivered configured to the desk.' },
  ];

  const onboardingSteps = [
    { day: 'DAY 1', title: 'Discovery', desc: 'We walk the site, inventory everything, and interview three people who use it daily. The list of what nobody documented is always the interesting part.' },
    { day: 'DAY 3', title: 'Risk report', desc: 'You get a written assessment with what is urgent, what is expensive, and what we would leave alone for now.' },
    { day: 'DAY 7', title: 'Tooling deployed', desc: 'Monitoring, patching, and backup agents rolled out. From here we can see problems before you report them.' },
    { day: 'DAY 14', title: 'Handover from incumbent', desc: 'We manage the conversation with your outgoing provider, including the awkward parts.' },
    { day: 'DAY 30', title: 'Review', desc: 'First month of ticket data, patch compliance, and a revised priority list.' },
  ];

  return (
    <div className="min-h-screen bg-[#131722] text-[#eceff3] font-sans selection:bg-[#b3e93a] selection:text-[#131722]">
      
      {/* 1. Navbar */}
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-[#131722]/94 backdrop-blur-md border-b border-[#222a3d] z-50 flex items-center justify-between px-6 md:px-16">
        <div className="font-extrabold text-xl tracking-tight flex items-center gap-2">
          <span className="w-3 h-3 bg-[#b3e93a] inline-block"></span>
          NORTHGATE IT <span className="text-xs font-mono text-[#8c95a5] font-normal hidden sm:inline">· Birmingham</span>
        </div>
        <nav className="hidden lg:flex items-center gap-8 text-sm text-[#eceff3]/80">
          <a href="#services" className="hover:text-[#b3e93a] transition">Services</a>
          <a href="#sla" className="hover:text-[#b3e93a] transition">SLA</a>
          <a href="#pricing" className="hover:text-[#b3e93a] transition">Pricing</a>
          <a href="#onboarding" className="hover:text-[#b3e93a] transition">Onboarding</a>
          <a href="#sectors" className="hover:text-[#b3e93a] transition">Sectors</a>
        </nav>
        <a href="#contact" className="bg-[#b3e93a] text-[#131722] font-semibold text-sm px-5 py-2.5 rounded hover:bg-[#a2d432] transition">
          Book a Discovery Call
        </a>
      </header>

      {/* 2. Hero */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 px-6 md:px-16 max-w-7xl mx-auto flex flex-col justify-center min-h-[86vh]">
        <div className="font-mono text-xs text-[#b3e93a] tracking-[0.12em] uppercase mb-4">
          MANAGED IT SUPPORT · BIRMINGHAM & WEST MIDLANDS · SINCE 2012
        </div>
        <h1 className="text-4xl md:text-[72px] font-extrabold tracking-[-0.035em] leading-[1.08] max-w-4xl mb-6">
          We answer in four minutes. Ask the last lot.
        </h1>
        <p className="text-lg md:text-xl text-[#8c95a5] max-w-2xl leading-[1.72] mb-10">
          Fully managed IT for businesses between fifteen and two hundred staff. Fixed per-user pricing, a named engineer who knows your setup, and an SLA we publish rather than bury in an appendix.
        </p>
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a href="#contact" className="bg-[#b3e93a] text-[#131722] font-bold px-7 py-3.5 rounded flex items-center gap-2 hover:bg-[#a2d432] transition">
            Book a Discovery Call <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#sla" className="border border-[#222a3d] hover:border-[#b3e93a] text-[#eceff3] font-semibold px-7 py-3.5 rounded transition">
            See Our SLA
          </a>
        </div>
        <div className="flex flex-wrap gap-4 font-mono text-xs text-[#8c95a5] tracking-wider uppercase">
          <span className="border border-[#222a3d] px-3 py-1.5 rounded bg-[#181d2c]">15–200 STAFF</span>
          <span className="border border-[#222a3d] px-3 py-1.5 rounded bg-[#181d2c]">MULTI-SITE</span>
          <span className="border border-[#222a3d] px-3 py-1.5 rounded bg-[#181d2c]">HYBRID</span>
          <span className="border border-[#222a3d] px-3 py-1.5 rounded bg-[#181d2c]">REGULATED</span>
        </div>
      </section>

      {/* 3. Metrics Band */}
      <section className="border-y border-[#222a3d] bg-[#181d2c]/50 py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold font-mono text-[#b3e93a] mb-1">4m 12s</div>
            <div className="text-sm text-[#8c95a5]">Average first response</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold font-mono text-[#b3e93a] mb-1">71%</div>
            <div className="text-sm text-[#8c95a5]">Resolved on first contact</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold font-mono text-[#b3e93a] mb-1">96%</div>
            <div className="text-sm text-[#8c95a5]">Client retention</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold font-mono text-[#b3e93a] mb-1">14</div>
            <div className="text-sm text-[#8c95a5]">Years operating</div>
          </div>
        </div>
      </section>

      {/* 4. Services */}
      <section id="services" className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="font-mono text-xs text-[#b3e93a] tracking-[0.12em] uppercase mb-3">WHAT WE DO</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Engineered for uptime, not ticket counts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <div key={idx} className="bg-[#181d2c] border border-[#222a3d] p-8 rounded-lg hover:border-[#b3e93a]/50 transition group">
              <div className="mb-4 p-3 bg-[#21283b] inline-block rounded">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-[#8c95a5] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SLA Table */}
      <section id="sla" className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#222a3d]">
        <div className="font-mono text-xs text-[#b3e93a] tracking-[0.12em] uppercase mb-3">PUBLISHED STANDARDS</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our actual rolling twelve-month averages</h2>
        <p className="text-[#8c95a5] mb-12 max-w-2xl">Not our targets. We publish both because publishing only the target is how the industry got its reputation.</p>
        
        <div className="bg-[#181d2c] border border-[#222a3d] rounded-lg p-6 md:p-8">
          <div className="grid grid-cols-12 pb-4 border-b border-[#222a3d] text-xs font-mono text-[#8c95a5] uppercase tracking-wider">
            <span className="col-span-2">Priority</span>
            <span className="col-span-4">Example</span>
            <span className="col-span-4">Performance vs Target</span>
            <span className="col-span-2 text-right">Actual / Target</span>
          </div>
          {slaTiers.map((t, i) => (
            <div key={t.level} className="grid grid-cols-12 items-center gap-4 border-b border-[#222a3d]/50 py-5">
              <span className="col-span-2 font-mono text-xs uppercase tracking-wider text-[#b3e93a] font-bold">{t.level}</span>
              <span className="col-span-4 text-sm">{t.example}</span>
              <div className="col-span-4 h-2 rounded-full bg-[#21283b]">
                <motion.div className="h-full rounded-full bg-[#b3e93a]"
                  initial={{ width: 0 }} whileInView={{ width: `${(t.actual / t.target) * 100}%` }}
                  viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} />
              </div>
              <span className="col-span-2 text-right font-bold font-mono text-sm tabular-nums">{t.actual}m<span className="text-[#8c95a5] font-normal"> / {t.target}m</span></span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Onboarding */}
      <section id="onboarding" className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#222a3d]">
        <div className="font-mono text-xs text-[#b3e93a] tracking-[0.12em] uppercase mb-3">FIRST THIRTY DAYS</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">How onboarding works without disrupting your team</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {onboardingSteps.map((step, idx) => (
            <div key={idx} className="bg-[#181d2c] border border-[#222a3d] p-6 rounded-lg relative">
              <div className="font-mono text-xs text-[#b3e93a] font-bold tracking-wider mb-2">{step.day}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-[#8c95a5] text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Pricing */}
      <section id="pricing" className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#222a3d]">
        <div className="font-mono text-xs text-[#b3e93a] tracking-[0.12em] uppercase mb-3">FIXED PRICING</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Predictable per-user monthly billing</h2>
        <p className="text-[#8c95a5] mb-12">Hardware, licences, and project work are quoted separately. We would rather show them as line items than hide them in a per-user figure.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="bg-[#181d2c] border border-[#222a3d] p-8 rounded-lg flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#8c95a5] uppercase mb-2">Essential</div>
              <div className="text-3xl font-extrabold mb-4">£42 <span className="text-sm font-normal text-[#8c95a5]">/ user / month</span></div>
              <ul className="space-y-3 text-sm text-[#8c95a5] mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Helpdesk 07:30–18:30</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Patching and monitoring</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Microsoft 365 management</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Backup with monthly restore test</li>
              </ul>
            </div>
            <a href="#contact" className="w-full border border-[#222a3d] hover:border-[#b3e93a] text-center py-3 rounded font-semibold text-sm transition">Get Started</a>
          </div>

          <div className="bg-[#21283b] border-2 border-[#b3e93a] p-8 rounded-lg flex flex-col justify-between relative shadow-xl">
            <div className="absolute -top-3 right-8 bg-[#b3e93a] text-[#131722] font-mono text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">Most Chosen</div>
            <div>
              <div className="font-mono text-xs text-[#b3e93a] uppercase mb-2">Complete</div>
              <div className="text-3xl font-extrabold mb-4">£64 <span className="text-sm font-normal text-[#8c95a5]">/ user / month</span></div>
              <ul className="space-y-3 text-sm text-[#eceff3] mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Everything in Essential</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Out-of-hours priority one cover</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Named engineer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Quarterly technology review</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Cyber Essentials maintained</li>
              </ul>
            </div>
            <a href="#contact" className="w-full bg-[#b3e93a] text-[#131722] text-center py-3 rounded font-bold text-sm hover:bg-[#a2d432] transition">Get Started</a>
          </div>

          <div className="bg-[#181d2c] border border-[#222a3d] p-8 rounded-lg flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#8c95a5] uppercase mb-2">Complete + Infrastructure</div>
              <div className="text-3xl font-extrabold mb-4">£89 <span className="text-sm font-normal text-[#8c95a5]">/ user / month</span></div>
              <ul className="space-y-3 text-sm text-[#8c95a5] mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Everything in Complete</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Server and network management</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> Firewall and Wi-Fi under contract</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#b3e93a]" /> On-site day every month</li>
              </ul>
            </div>
            <a href="#contact" className="w-full border border-[#222a3d] hover:border-[#b3e93a] text-center py-3 rounded font-semibold text-sm transition">Get Started</a>
          </div>
        </div>
      </section>

      {/* 8. Sectors */}
      <section id="sectors" className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#222a3d]">
        <div className="font-mono text-xs text-[#b3e93a] tracking-[0.12em] uppercase mb-3">SECTORS WE SERVE</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Compliance-ready IT for regulated industries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#181d2c] border border-[#222a3d] p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Professional services</h3>
            <p className="text-[#8c95a5] text-sm leading-relaxed">Legal and accounting firms where document retention and client confidentiality are contractual, not aspirational.</p>
          </div>
          <div className="bg-[#181d2c] border border-[#222a3d] p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Manufacturing</h3>
            <p className="text-[#8c95a5] text-sm leading-relaxed">Shop-floor systems that predate everyone in the building, plus the office network that has to talk to them.</p>
          </div>
          <div className="bg-[#181d2c] border border-[#222a3d] p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Healthcare</h3>
            <p className="text-[#8c95a5] text-sm leading-relaxed">Private practices and clinics under DSPT, where patient data handling has to survive an audit.</p>
          </div>
        </div>
      </section>

      {/* 9. Honesty Section */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#222a3d]">
        <div className="font-mono text-xs text-[#b3e93a] tracking-[0.12em] uppercase mb-3">OUR PHILOSOPHY</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Three things most providers will not say</h2>
        <div className="space-y-6 max-w-4xl">
          <div className="bg-[#181d2c] border border-[#222a3d] p-6 rounded-lg flex items-start gap-4">
            <span className="font-mono text-lg font-bold text-[#b3e93a]">01</span>
            <p className="text-sm leading-relaxed text-[#eceff3]">You probably need fewer licences than you are paying for. We audit this in month one and it usually pays for a chunk of our fee.</p>
          </div>
          <div className="bg-[#181d2c] border border-[#222a3d] p-6 rounded-lg flex items-start gap-4">
            <span className="font-mono text-lg font-bold text-[#b3e93a]">02</span>
            <p className="text-sm leading-relaxed text-[#eceff3]">Some of your hardware is fine. The industry standard is a three-year refresh cycle because it suits the reseller margin, not because the machines stop working.</p>
          </div>
          <div className="bg-[#181d2c] border border-[#222a3d] p-6 rounded-lg flex items-start gap-4">
            <span className="font-mono text-lg font-bold text-[#b3e93a]">03</span>
            <p className="text-sm leading-relaxed text-[#eceff3]">If your current provider is responsive and you like them, stay. We would rather lose a pitch than take on a client who did not need to move.</p>
          </div>
        </div>
      </section>

      {/* 10. Contact */}
      <section id="contact" className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#222a3d]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="font-mono text-xs text-[#b3e93a] tracking-[0.12em] uppercase mb-3">GET IN TOUCH</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Book a Discovery Call</h2>
            <p className="text-[#8c95a5] text-sm mb-8">Speak directly with a senior engineer. No account managers, no pushy sales pitches.</p>
            
            <div className="space-y-4 font-mono text-sm text-[#eceff3]">
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#b3e93a]" /> hello@northgateit.co.uk</div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#b3e93a]" /> 0121 555 0133</div>
              <div className="flex items-center gap-3"><ExternalLink className="w-4 h-4 text-[#b3e93a]" /> Existing clients: support portal</div>
            </div>
          </div>

          <div className="bg-[#181d2c] border border-[#222a3d] p-8 rounded-lg">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-[#b3e93a] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Thank you</h3>
                <p className="text-[#8c95a5] text-sm">We have received your details and will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#8c95a5] uppercase mb-1">Company</label>
                  <input type="text" required className="w-full bg-[#131722] border border-[#222a3d] rounded p-3 text-sm focus:outline-none focus:border-[#b3e93a]" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8c95a5] uppercase mb-1">Name</label>
                    <input type="text" required className="w-full bg-[#131722] border border-[#222a3d] rounded p-3 text-sm focus:outline-none focus:border-[#b3e93a]" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#8c95a5] uppercase mb-1">Email</label>
                    <input type="email" required className="w-full bg-[#131722] border border-[#222a3d] rounded p-3 text-sm focus:outline-none focus:border-[#b3e93a]" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8c95a5] uppercase mb-1">Phone</label>
                    <input type="text" required className="w-full bg-[#131722] border border-[#222a3d] rounded p-3 text-sm focus:outline-none focus:border-[#b3e93a]" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#8c95a5] uppercase mb-1">Number of staff</label>
                    <input type="text" required className="w-full bg-[#131722] border border-[#222a3d] rounded p-3 text-sm focus:outline-none focus:border-[#b3e93a]" value={formData.staff} onChange={e => setFormData({...formData, staff: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#8c95a5] uppercase mb-1">What is not working?</label>
                  <textarea rows="3" className="w-full bg-[#131722] border border-[#222a3d] rounded p-3 text-sm focus:outline-none focus:border-[#b3e93a]" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button type="submit" className="w-full bg-[#b3e93a] text-[#131722] font-bold py-3 rounded text-sm hover:bg-[#a2d432] transition">
                  Book a Discovery Call
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t-2 border-[#b3e93a] bg-[#0d1017] py-12 px-6 md:px-16 text-xs text-[#8c95a5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="font-extrabold text-sm text-[#eceff3] mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#b3e93a] inline-block"></span> NORTHGATE IT
            </div>
            <p>Managed IT support, Birmingham & West Midlands</p>
          </div>
          <div>
            <div className="font-bold text-[#eceff3] mb-2">Location</div>
            <p>Unit 12, Fazeley Studios, Birmingham B5 5SE</p>
          </div>
          <div>
            <div className="font-bold text-[#eceff3] mb-2">Registration</div>
            <p>Company registration 08123774</p>
            <p>ICO registration ZA204118</p>
          </div>
          <div>
            <div className="font-bold text-[#eceff3] mb-2">Copyright</div>
            <p>© 2026 Northgate IT. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}