package com.edu.hcmuaf.springserver.controller;

import com.edu.hcmuaf.springserver.auth.AuthenticationResponse;
import com.edu.hcmuaf.springserver.auth.RegisterAdminRequest;
import com.edu.hcmuaf.springserver.dto.UserRequest;
import com.edu.hcmuaf.springserver.dto.UserResponse;
import com.edu.hcmuaf.springserver.entity.User;
import com.edu.hcmuaf.springserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
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
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        userResponse.setBirthday(sdf.format(user.getBirthday()));


        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getListUser() {
        List<User> listUser = userService.getListUser();
        if (listUser != null) {
            return ResponseEntity.ok(listUser);
        } else return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        User user = userService.findUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else return ResponseEntity.badRequest().body(null);
    }

    @PostMapping("/edit")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest.EditUser userRequest, Authentication authentication) throws ParseException {
        boolean update = userService.updateUser(userRequest);
        System.out.println(userRequest);
//        boolean update = true
        if(update) {
            return getProfile(authentication);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping ("/admin_create")
    public ResponseEntity<?> createUser(@RequestBody RegisterAdminRequest adminRequest) throws ParseException {
//        User user1 = userService.createUser(user);
//        return  ResponseEntity.ok(user1);
        AuthenticationResponse authenticationResponse = userService.createUser(adminRequest);
        if(authenticationResponse != null) {
            return ResponseEntity.ok(authenticationResponse);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteUser(@PathVariable long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
