package com.edu.hcmuaf.springserver.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.edu.hcmuaf.springserver.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.encrypt.AesBytesEncryptor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class JwtService {

    private static final String Secret_key = "123";

    public String generateToken(User user, Collection<SimpleGrantedAuthority> authorities) {
        Algorithm algorithm = Algorithm.HMAC256(Secret_key.getBytes());
        System.out.println(user);
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 50*60*1000))
                .withClaim("role", user.getRole())
                .sign(algorithm);
    }

    public String generateRefreshToken(User user, Collection<SimpleGrantedAuthority> authorities) {
        Algorithm algorithm = Algorithm.HMAC256(Secret_key.getBytes());
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 50*60*1000))
                .withClaim("role", user.getRole())
                .sign(algorithm);
    }
}
