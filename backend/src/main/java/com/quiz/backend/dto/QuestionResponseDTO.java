package com.quiz.backend.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionResponseDTO {
    private Long id;
    private String questionText;
    private List<String> options;
    private String correctAnswer;
    private int marks;
}
