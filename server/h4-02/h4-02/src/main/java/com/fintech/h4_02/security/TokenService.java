package com.fintech.h4_02.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fintech.h4_02.entity.UserEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("spring.security.secret")
    private String apiSecret;

    public String generateToken(UserEntity user) {
        Algorithm algorithm = Algorithm.HMAC256(apiSecret);
        try {
            return JWT.create()
                    .withIssuer(apiSecret)
                    .withSubject(user.getName())
                    .withClaim("id", user.getId())
                    .withExpiresAt(generateDateExpiration())
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException();
        }
    }

    private Instant generateDateExpiration() {

        return LocalDateTime.now().plusHours(5).toInstant(ZoneOffset.of("-05:00"));
    }

    public String gerSubject(String token) {
        DecodedJWT verifier = null;

        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            verifier = JWT.require(algorithm)
                    .withIssuer(apiSecret)
                    .build()
                    .verify(token);
            verifier.getSubject();

        } catch (JWTVerificationException e) {
            System.out.println("error verify token jwt = " + e);
        }
        if (verifier.getSubject() == null) {
            throw new RuntimeException("verifier invalid");
        }
        return verifier.getSubject();
    }
}
