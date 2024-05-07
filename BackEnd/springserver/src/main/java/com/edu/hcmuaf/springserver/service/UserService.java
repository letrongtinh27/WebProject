package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.auth.AuthenticationRequest;
import com.edu.hcmuaf.springserver.auth.AuthenticationResponse;
import com.edu.hcmuaf.springserver.auth.RegisterRequest;
import com.edu.hcmuaf.springserver.entity.User;
import com.edu.hcmuaf.springserver.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public AuthenticationResponse authentication(AuthenticationRequest authenticationRequest) {
        return authenticateAndGenerateToken(authenticationRequest, false);
    }

    public AuthenticationResponse adminAuthentication(AuthenticationRequest authenticationRequest) {
        return authenticateAndGenerateToken(authenticationRequest, true);
    }

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsUserByUsername(registerRequest.getUsername()) || userRepository.existsUserByEmail(registerRequest.getEmail())) {
            return AuthenticationResponse.builder().code(400).message("Username or email already exists").build();
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

        return authenticateAndGenerateToken(new AuthenticationRequest(newUser.getUsername(), registerRequest.getPassword()), false);
    }

    private AuthenticationResponse authenticateAndGenerateToken(AuthenticationRequest authenticationRequest, boolean isAdmin) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
            User user = userRepository.findByUsername(authenticationRequest.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (isAdmin && !user.getRole().equals("admin")) {
                return AuthenticationResponse.builder().code(401).message("Not an admin").build();
            }

            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            String jwtToken = jwtService.generateToken(user, authorities);

            return AuthenticationResponse.builder().code(200).message("Succeed").token(jwtToken).tokenExpirationTime(jwtService.getTokenExpirationTime()).build();
        } catch (AuthenticationException e) {
            return AuthenticationResponse.builder().code(401).message("User not found").build();
        }
    }
}
