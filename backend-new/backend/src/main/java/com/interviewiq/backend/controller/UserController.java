package com.interviewiq.backend.controller;

import com.interviewiq.backend.jwt.JwtUtil;
import com.interviewiq.backend.model.LoginRequest;
import com.interviewiq.backend.model.User;
import com.interviewiq.backend.repository.UserRepository;
import com.interviewiq.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping
    public String createUser(@RequestBody User user) {

        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists";
        }

        userService.registerUser(user);

        return "User registered successfully";
    }

    @PostMapping("/login")
    public Object loginUser(@RequestBody LoginRequest loginRequest) {

        Optional<User> user = userService.findByEmail(loginRequest.getEmail());

        if (user.isEmpty()) {
            return "User not found";
        }

        if (!userService.checkPassword(loginRequest.getPassword(), user.get().getPassword())) {
            return "Invalid password";
        }

        String token = JwtUtil.generateToken(user.get().getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.get().getId());
        response.put("name", user.get().getName());
        response.put("email", user.get().getEmail());
        response.put("token", token);

        return response;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {

        Optional<User> user = userRepository.findById(id);

        return user.orElse(null);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {

        Optional<User> existingUser = userRepository.findById(id);

        if (existingUser.isPresent()) {

            User user = existingUser.get();

            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());

            userService.registerUser(user);

            return user;
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return "User deleted successfully";
        }

        return "User not found";
    }
}