package com.project.fitness_app.controller;

import com.project.fitness_app.dto.RecommendationDTO;
import com.project.fitness_app.model.Activity;
import com.project.fitness_app.model.User;
import com.project.fitness_app.service.RecommendationService;
import com.project.fitness_app.repository.UserRepository;
import com.project.fitness_app.repository.ActivityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    public RecommendationController(RecommendationService recommendationService, UserRepository userRepository, ActivityRepository activityRepository) {
        this.recommendationService = recommendationService;
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
    }

    // Generate recommendation for a specific activity
    @PostMapping("/generate/{userId}/{activityId}")
    public ResponseEntity<RecommendationDTO> generateRecommendation(
            @PathVariable String userId,
            @PathVariable String activityId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        RecommendationDTO dto = recommendationService.mapToDTO(
                recommendationService.generateRecommendation(user, activity)
        );

        return ResponseEntity.ok(dto);
    }

    // Get all recommendations for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RecommendationDTO>> getRecommendations(@PathVariable String userId) {
        return ResponseEntity.ok(recommendationService.getRecommendationsByUser(userId));
    }
}
