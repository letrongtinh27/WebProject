package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.entity.User;
import com.edu.hcmuaf.springserver.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getListUser() {
        return userRepository.findAll();
    }
}
