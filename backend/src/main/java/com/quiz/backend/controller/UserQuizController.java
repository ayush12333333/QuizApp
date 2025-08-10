package com.quiz.backend.controller;

import com.quiz.backend.dto.*;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserQuizController {

    private final QuizService quizService;

    // Get all published/active quizzes
    @GetMapping("/my-quizzes")
    public ResponseEntity<List<UserQuizStatusDTO>> getUserQuizzes(Principal principal) {
        return ResponseEntity.ok(quizService.getUserQuizzes(principal.getName()));
    }

    @GetMapping("/questions/{quizId}")
    public ResponseEntity<List<QuestionResponseDTO>> getQuestionsForQuiz(@PathVariable Long quizId) {
        List<QuestionResponseDTO> questions = quizService.getQuestionsForUser(quizId);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/submit-quiz/{quizId}")
    public ResponseEntity<QuizResultDTO> submitQuiz(
            @PathVariable Long quizId,
            @RequestBody QuizAttemptDTO attempt,
            Principal principal) {

        QuizResultDTO result = quizService.submitQuiz(principal.getName(), quizId, attempt);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/submit-with-details/{quizId}")
    public ResponseEntity<List<DetailedQuestionResultDTO>> explanationWithAnswer(
            @PathVariable Long quizId,
            @RequestBody QuizAttemptDTO attempt,
            Principal principal) {

       List< DetailedQuestionResultDTO> compare = quizService. getDetailedExplanation(principal.getName(), quizId, attempt);
        return ResponseEntity.ok(compare);
    }

    @GetMapping("/my-results")
    public ResponseEntity<List<QuizResultHistoryDTO>> getUserResultsHistory(Principal principal) {
        List<QuizResultHistoryDTO> history = quizService.getUserResultsHistory(principal.getName());
        return ResponseEntity.ok(history);
    }

}
