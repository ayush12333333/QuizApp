package com.quiz.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionRequestDTO {

    @NotBlank(message = "Question text is required")
    private String questionText;

    @NotEmpty(message = "Options cannot be empty")
    private List<String> options;

    @NotBlank(message = "Correct answer is required")
    private String correctAnswer;

    @Min(value = 1, message = "Marks must be at least 1")
    private int marks;
}
