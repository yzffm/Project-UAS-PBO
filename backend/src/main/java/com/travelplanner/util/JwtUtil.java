package com.travelplanner.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret:defaultSecretKeyWithAtLeast256BitsLengthBecauseItIsRequiredByJwt!}")
    private String secret;

    @Value("${jwt.expiration:86400000}")
    private long expirationMs;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email) // ← baru (bukan setSubject)
                .issuedAt(new Date()) // ← baru (bukan setIssuedAt)
                .expiration(new Date(System.currentTimeMillis() + expirationMs)) // ← baru
                .signWith(getSigningKey()) // ← baru (algorithm otomatis HS256)
                .compact();
    }

    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey()) // ← baru (bukan setSigningKey)
                .build()
                .parseSignedClaims(token) // ← baru (bukan parseClaimsJws)
                .getPayload() // ← baru (bukan getBody)
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}