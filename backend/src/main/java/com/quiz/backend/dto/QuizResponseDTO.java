package com.quiz.backend.dto;

import com.quiz.backend.entity.QuizCategory;
import com.quiz.backend.entity.QuizDifficulty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizResponseDTO {

    private Long id;
    private String title;
    private QuizCategory category;
    private QuizDifficulty difficulty;
    private int timer;
    private boolean completed;
}
