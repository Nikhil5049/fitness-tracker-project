package com.project.fitness_app.repository;

import com.project.fitness_app.model.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, String> {

    List<Recommendation> findByUser_Id(String userId);


    List<Recommendation> findByActivity_Id(String activityId);
}
