package com.quiz.backend.service;

import com.quiz.backend.dto.QuizResultDTO;

import java.util.List;

public interface ResultService {

    List<QuizResultDTO> getResultsByQuiz(Long quizId);       // Admin: all results of a quiz
    QuizResultDTO getUserResult(Long quizId, Long userId);
    List<QuizResultDTO> getLeaderboard(Long quizId);    // User: his own result
}
