package com.edu.hcmuaf.springserver.dto;

import lombok.*;

import java.sql.Date;

public class UserRequest {
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    @ToString
    public static class EditUser {
        private int id;
        private String username;
        private String fullName;
        private String email;
        private String phone;
        private String gender;
        private String birthday;
        private boolean changePassword;
        private String password;
    }
}
