package com.quiz.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizResultHistoryDTO {
    private String quizTitle;
    private int score;
    private LocalDateTime submittedAt;
}

