package com.quiz.backend.util;

import com.quiz.backend.dto.QuizRequestDTO;
import com.quiz.backend.dto.QuizResponseDTO;
import com.quiz.backend.entity.Quiz;
import org.springframework.stereotype.Component;

@Component
public class QuizMapper {

    public Quiz toEntity(QuizRequestDTO dto) {
        return Quiz.builder()
                .title(dto.getTitle())
                .category(dto.getCategory())
                .difficulty(dto.getDifficulty())
                .timer(dto.getTimer())
                .build();
    }

    public QuizResponseDTO toDto(Quiz quiz) {
        return QuizResponseDTO.builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .category(quiz.getCategory())
                .difficulty(quiz.getDifficulty())
                .timer(quiz.getTimer())
                .build();
    }
}
