package com.quiz.backend.service;

import com.quiz.backend.dto.*;
import com.quiz.backend.entity.User;

import java.util.List;

public interface QuizService {
    QuizResponseDTO createQuiz(QuizRequestDTO dto);
    List<QuizResponseDTO> getAllQuizzes();
    QuizResponseDTO updateQuiz(Long id, QuizRequestDTO dto);
    void deleteQuiz(Long id);
    List<UserQuizStatusDTO>getUserQuizzes(String email);
    List<QuestionResponseDTO>getQuestionsForUser(Long quizId);
    QuizResultDTO submitQuiz(String username,Long quizId,QuizAttemptDTO attempt);
    List<DetailedQuestionResultDTO> getDetailedExplanation(String username, Long quizId, QuizAttemptDTO attempt);
    List<QuizResultHistoryDTO> getUserResultsHistory(String username);
    boolean hasUserCompletedQuiz(Long quizId, String email);
}
