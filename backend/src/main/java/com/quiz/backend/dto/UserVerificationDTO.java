package com.quiz.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserVerificationDTO {
    private Long questionId;
    private String questionText;
    private String selectedAnswer;
    private String correctAnswer;
    private String status; // Correct / Incorrect
    private Integer marksAwarded;
}
