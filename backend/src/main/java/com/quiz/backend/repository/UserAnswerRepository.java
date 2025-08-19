package com.quiz.backend.repository;

import com.quiz.backend.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAnswerRepository extends JpaRepository<UserAnswer,Long> {
    List<UserAnswer> findByUserIdAndQuizId(Long userId, Long quizId);
    UserAnswer findByUserIdAndQuizIdAndQuestionId(Long userId, Long quizId, Long questionId);

}
