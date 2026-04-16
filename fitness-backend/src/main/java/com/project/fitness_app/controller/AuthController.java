package com.project.fitness_app.controller;

import com.project.fitness_app.dto.LoginRequest;
import com.project.fitness_app.dto.LoginResponse;
import com.project.fitness_app.dto.RegisterRequest;
import com.project.fitness_app.dto.UserResponse;
import com.project.fitness_app.model.User;
import com.project.fitness_app.security.JwtUtils;
import com.project.fitness_app.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        // RuntimeException for duplicate email is handled by GlobalExceptionHandler
        return ResponseEntity.ok(userService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.authenticate(loginRequest);
            String token = jwtUtils.generateToken(user.getId(), user.getRole().name());
            return ResponseEntity.ok(new LoginResponse(token, userService.mapToResponse(user)));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }
}