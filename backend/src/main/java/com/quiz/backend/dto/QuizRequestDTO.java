package com.quiz.backend.dto;

import com.quiz.backend.entity.QuizCategory;
import com.quiz.backend.entity.QuizDifficulty;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizRequestDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Category is required")
    private QuizCategory category;

    @NotNull(message = "Difficulty is required")
    private QuizDifficulty difficulty;

    @Min(value = 1, message = "Timer must be at least 1 minute")
    private int timer;
}