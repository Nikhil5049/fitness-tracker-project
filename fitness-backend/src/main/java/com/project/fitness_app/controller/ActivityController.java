package com.project.fitness_app.controller;

import com.project.fitness_app.dto.ActivityRequest;
import com.project.fitness_app.dto.ActivityResponse;
import com.project.fitness_app.service.ActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;


    @PostMapping
    public ResponseEntity<ActivityResponse> trackActivity(
            @Valid @RequestBody ActivityRequest request,
            Authentication authentication
    ) {
        String userId = authentication.getName();
        return ResponseEntity.ok(activityService.trackActivity(request, userId));
    }


    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getUserActivities(
            Authentication authentication
    ) {
        String userId = authentication.getName();
        return ResponseEntity.ok(activityService.getUserActivities(userId));
    }
}