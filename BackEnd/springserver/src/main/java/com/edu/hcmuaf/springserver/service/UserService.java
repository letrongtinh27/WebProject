package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.auth.AuthenticationRequest;
import com.edu.hcmuaf.springserver.auth.AuthenticationResponse;
import com.edu.hcmuaf.springserver.auth.RegisterRequest;
import com.edu.hcmuaf.springserver.entity.User;
import com.edu.hcmuaf.springserver.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public User getUserProfileByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }

    public AuthenticationResponse authentication(AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
            User user = userRepository.findByUsername(authenticationRequest.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

            var jwtToken = jwtService.generateToken(user, authorities);
            var jwtRefreshToken = jwtService.generateRefreshToken(user, authorities);

            return AuthenticationResponse.builder().code(200).message("Succeed").token(jwtToken).refreshToken(jwtRefreshToken).build();
        } catch (AuthenticationException e) {
            return AuthenticationResponse.builder().code(401).message("User not found").build();
        }
    }

    public AuthenticationResponse AdminAuthentication(AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
            User admin = userRepository.findByUsername(authenticationRequest.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (admin.getRole().equals("admin")) {
                Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

                var jwtToken = jwtService.generateToken(admin, authorities);
                var jwtRefreshToken = jwtService.generateRefreshToken(admin, authorities);

                return AuthenticationResponse.builder().code(200).message("Succeed").token(jwtToken).refreshToken(jwtRefreshToken).build();
            } else return AuthenticationResponse.builder().code(401).message("Not an admin").build();

        } catch (AuthenticationException e) {
            return AuthenticationResponse.builder().code(401).message("User not found").build();
        }
    }


    public AuthenticationResponse register(RegisterRequest registerRequest) {
        if(userRepository.existsUserByUsername(registerRequest.getUsername()) || userRepository.existsUserByEmail(registerRequest.getEmail())) {
            return AuthenticationResponse.builder().code(400).message("Username already exits").build();
        }

        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setPassword(encoder.encode(registerRequest.getPassword()));
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPhone_number("");
        newUser.setFull_name(registerRequest.getUsername());
        newUser.setRole("user");
        newUser.setGender("Nam");

        userRepository.save(newUser);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(registerRequest.getUsername(), registerRequest.getPassword()));
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            var jwtToken = jwtService.generateToken(newUser, authorities);
            var jwtRefreshToken = jwtService.generateRefreshToken(newUser, authorities);
            return AuthenticationResponse.builder().code(200).message("Registration successful").token(jwtToken).refreshToken(jwtRefreshToken).build();
        } catch (AuthenticationException e) {
            return AuthenticationResponse.builder().code(500).message("Internal server error").build();
        }

    }

    public User createAdmin(User user){ return userRepository.save(user);}


}
