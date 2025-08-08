package com.quiz.backend.mapper;

import com.quiz.backend.dto.QuizResultDTO;
import com.quiz.backend.entity.QuizResult;
import org.springframework.stereotype.Component;

@Component
public class ResultMapper {

    public QuizResultDTO toDto(QuizResult r) {
        if (r == null) return null;
        return QuizResultDTO.builder()
                .quizTitle(r.getQuiz().getTitle())
                .username(r.getUser().getUsername())
                .score(r.getScore())
                .totalMarks(r.getTotalMarks())
                .correctCount(r.getCorrectCount())
                .wrongCount(r.getWrongCount())
                .skippedCount(r.getSkippedCount())
                .submittedAt(r.getSubmittedAt())
                .build();
    }
}
