package com.edu.hcmuaf.springserver.controller;

import com.edu.hcmuaf.springserver.auth.AuthenticationRequest;
import com.edu.hcmuaf.springserver.auth.AuthenticationResponse;
import com.edu.hcmuaf.springserver.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthenticationController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
        return ResponseEntity.ok(userService.authentication(authenticationRequest));
    }
}
