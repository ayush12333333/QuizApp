package com.quiz.backend.service;

import com.quiz.backend.dto.QuestionRequestDTO;
import com.quiz.backend.dto.QuestionResponseDTO;

import java.util.List;

public interface QuestionService {
    QuestionResponseDTO addQuestion(Long quizId, QuestionRequestDTO dto);
    List<QuestionResponseDTO> getQuestionsByQuiz(Long quizId);
    QuestionResponseDTO updateQuestion(Long questionId, QuestionRequestDTO dto);
    void deleteQuestion(Long questionId);
}
