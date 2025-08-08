package com.quiz.backend.service;

import com.quiz.backend.dto.QuizRequestDTO;
import com.quiz.backend.dto.QuizResponseDTO;

import java.util.List;

public interface QuizService {
    QuizResponseDTO createQuiz(QuizRequestDTO dto);
    List<QuizResponseDTO> getAllQuizzes();
    QuizResponseDTO updateQuiz(Long id, QuizRequestDTO dto);
    void deleteQuiz(Long id);
}
