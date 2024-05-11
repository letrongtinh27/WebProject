package com.edu.hcmuaf.springserver.controller;

import com.edu.hcmuaf.springserver.dto.UserResponse;
import com.edu.hcmuaf.springserver.entity.User;
import com.edu.hcmuaf.springserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {

        String username = authentication.getPrincipal().toString();
        User user = userService.getUserProfileByUsername(username);
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhone(user.getPhone_number());
        userResponse.setFullName(user.getFull_name());
        userResponse.setGender(user.getGender());
        userResponse.setBirthday(user.getBirthday());

        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getListUser() {
        List<User> listUser = userService.getListUser();
        if (listUser != null) {
            return ResponseEntity.ok(listUser);
        } else return ResponseEntity.badRequest().body(null);
    }

    @PostMapping("/")
    public ResponseEntity<?> createTheatre() {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTheatre() {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTheatre() {
        return null;
    }
}
