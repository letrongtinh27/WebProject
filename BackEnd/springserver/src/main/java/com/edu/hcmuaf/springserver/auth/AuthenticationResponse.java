package com.edu.hcmuaf.springserver.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private int code;
    private String message;
    private String token;
    private String refreshToken;
}
