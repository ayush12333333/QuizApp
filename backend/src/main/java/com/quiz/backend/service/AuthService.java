package com.quiz.backend.service;

import com.quiz.backend.dto.LoginRequest;

import com.quiz.backend.dto.AuthResponse;
import com.quiz.backend.entity.Role;
import com.quiz.backend.entity.User;
import com.quiz.backend.repository.UserRepository;
import com.quiz.backend.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return new AuthResponse(null, "Email already registered",null, user.getId());
        }
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
         userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, "User registered successfully",null, user.getId());
    }


    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, "Login successful",user.getRole().name(), user.getId());
    }
}
