package com.project.fitness_app.service;

import com.project.fitness_app.dto.RecommendationDTO;
import com.project.fitness_app.model.Activity;
import com.project.fitness_app.model.Recommendation;
import com.project.fitness_app.model.User;
import com.project.fitness_app.repository.RecommendationRepository;
import com.project.fitness_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final UserRepository userRepository;

    public Recommendation generateRecommendation(User user, Activity activity) {
        List<String> improvements = new ArrayList<>();
        List<String> suggestions  = new ArrayList<>();
        List<String> safety       = new ArrayList<>();

        switch (activity.getType()) {
            case RUNNING -> {
                improvements.add("Increase your pace by 10% each week to build speed safely.");
                suggestions.add("Add dynamic stretching before and static stretching after each run.");
                safety.add("Wear proper running shoes and replace them every 500 km.");
            }
            case WALKING -> {
                improvements.add("Try interval walking — alternate fast and slow paces.");
                suggestions.add("Swing your arms naturally to engage your core.");
                safety.add("Stay hydrated and wear sun protection on outdoor walks.");
            }
            case CYCLING -> {
                improvements.add("Include hill intervals to build power in your legs.");
                suggestions.add("Maintain 80-100 RPM cadence for efficient pedaling.");
                safety.add("Always wear a helmet and use proper hand signals.");
            }
            case SWIMMING -> {
                improvements.add("Focus on your stroke technique before increasing distance.");
                suggestions.add("Add kick drills to strengthen your lower body.");
                safety.add("Never swim alone and respect pool lane etiquette.");
            }
            case WEIGHT_TRAINING -> {
                improvements.add("Apply progressive overload — increase weight by 2–5% weekly.");
                suggestions.add("Record each set, weight, and rep count to track progress.");
                safety.add("Use a spotter for heavy compound lifts like bench press and squat.");
            }
            case YOGA -> {
                improvements.add("Hold each pose for 5–10 breaths to build deeper flexibility.");
                suggestions.add("Focus on diaphragmatic breathing to enhance mind-muscle connection.");
                safety.add("Avoid pushing through pain; modify poses to suit your flexibility level.");
            }
            case HIIT -> {
                improvements.add("Aim for 90% max heart rate during work intervals.");
                suggestions.add("Keep rest periods consistent — a 2:1 rest-to-work ratio is optimal.");
                safety.add("Limit HIIT sessions to 3–4 per week to allow adequate recovery.");
            }
            case CARDIO -> {
                improvements.add("Incorporate steady-state and interval cardio for best results.");
                suggestions.add("Monitor your heart rate to stay in the target fat-burning zone.");
                safety.add("Cool down for 5 minutes after every cardio session.");
            }
            case STRETCHING -> {
                improvements.add("Hold each stretch for 30–60 seconds for maximum benefit.");
                suggestions.add("Stretch both sides equally to prevent muscle imbalances.");
                safety.add("Never bounce during a stretch — use slow, controlled movements.");
            }
            default -> {
                improvements.add("Stay consistent — frequency beats intensity for long-term progress.");
                suggestions.add("Log each session to identify patterns and improvements over time.");
                safety.add("Listen to your body and rest when you feel pain or excessive fatigue.");
            }
        }

        String rec = String.format(
            "Based on your %s session (duration: %d min, calories: %d), " +
            "you are on the right track! Focus on the improvements and suggestions below " +
            "to maximise your results while staying safe.",
            activity.getType().name().replace("_", " ").toLowerCase(),
            activity.getDuration()      != null ? activity.getDuration()      : 0,
            activity.getCaloriesBurned() != null ? activity.getCaloriesBurned() : 0
        );

        Recommendation recommendation = Recommendation.builder()
                .user(user)
                .activity(activity)
                .type(activity.getType().name())
                .recommendation(rec)
                .improvements(improvements)
                .suggestions(suggestions)
                .safety(safety)
                .build();

        return recommendationRepository.save(recommendation);
    }


    public List<RecommendationDTO> getRecommendationsByUser(String userId) {
        return recommendationRepository.findByUser_Id(userId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public RecommendationDTO mapToDTO(Recommendation recommendation) {
        return RecommendationDTO.builder()
                .id(recommendation.getId())
                .userId(recommendation.getUser().getId())
                .activityId(recommendation.getActivity().getId())
                .type(recommendation.getType())
                .recommendation(recommendation.getRecommendation())
                .improvements(recommendation.getImprovements())
                .suggestions(recommendation.getSuggestions())
                .safety(recommendation.getSafety())
                .build();
    }
}
