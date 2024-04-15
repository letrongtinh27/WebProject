package com.edu.hcmuaf.springserver.controller;

import com.edu.hcmuaf.springserver.entity.User;
import com.edu.hcmuaf.springserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserService userService;

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
