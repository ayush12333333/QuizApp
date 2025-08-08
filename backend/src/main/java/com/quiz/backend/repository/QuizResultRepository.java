package com.quiz.backend.repository;

import com.quiz.backend.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByQuizId(Long quizId);
    List<QuizResult> findByQuizIdOrderByScoreDesc(Long quizId);
    Optional<QuizResult> findByQuizIdAndUserId(Long quizId, Long userId);
}
