package com.quiz.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuizResultDTO {
    private String quizTitle;
    private String username;
    private int score;
    private int totalMarks;
    private int correctCount;
    private int wrongCount;
    private int skippedCount;
    private LocalDateTime submittedAt;
}
