package com.quiz.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DetailedQuestionResultDTO {
    private Long questionId;
    private String questionText;
    private List<String> options;
    private String correctAnswer;
    private String userAnswer;
    private String status; // "Correct", "Incorrect", "Skipped"
    private int marksAwarded;
}


