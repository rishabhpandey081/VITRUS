package com.interviewiq.backend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET =
            "InterviewIQSecretKey123456789123456789123456789";

    private static final SecretKey KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    public static String generateToken(String email) {

        System.out.println("SECRET: " + SECRET);

        String token = Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(KEY)
                .compact();

        System.out.println("GENERATED TOKEN: " + token);

        return token;
    }

    public static Claims validateToken(String token) {

        System.out.println("SECRET: " + SECRET);
        System.out.println("TOKEN TO VALIDATE: " + token);

        return Jwts.parser()
                .verifyWith(KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}