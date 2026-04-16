package com.project.fitness_app.service;

import com.project.fitness_app.dto.LoginRequest;
import com.project.fitness_app.dto.RegisterRequest;
import com.project.fitness_app.dto.UserResponse;
import com.project.fitness_app.model.User;
import com.project.fitness_app.model.UserRole;
import com.project.fitness_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("Email already in use: " + request.getEmail());
        }

        UserRole role = request.getRole() != null ? request.getRole() : UserRole.USER;

        User user = User.builder()
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        return mapToResponse(userRepository.save(user));
    }

    public UserResponse mapToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());

        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());

        response.setRole(user.getRole() != null ? user.getRole().name() : "USER");
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        return response;
    }

    public User authenticate(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        return user;
    }
}
