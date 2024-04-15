package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.auth.AuthenticationRequest;
import com.edu.hcmuaf.springserver.auth.AuthenticationResponse;
import com.edu.hcmuaf.springserver.entity.User;
import com.edu.hcmuaf.springserver.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);


    public List<User> getListUser() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public AuthenticationResponse authentication(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        User user = userRepository.findByUsername(authenticationRequest.getUsername()).orElseThrow();

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

        var jwtToken = jwtService.generateToken(user, authorities);
        var jwtRefreshToken = jwtService.generateRefreshToken(user, authorities);

        return AuthenticationResponse.builder().token(jwtToken).refreshToken(jwtRefreshToken).build();

    }



}
