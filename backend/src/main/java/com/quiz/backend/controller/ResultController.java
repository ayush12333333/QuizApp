package com.quiz.backend.controller;

import com.quiz.backend.dto.QuizResultDTO;
import com.quiz.backend.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    // Admin: view all results for a quiz
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<List<QuizResultDTO>> getAllResults(@PathVariable Long quizId) {
        return ResponseEntity.ok(resultService.getResultsByQuiz(quizId));
    }

    // User: view own result
    @GetMapping("/quiz/{quizId}/user/{userId}")
    public ResponseEntity<QuizResultDTO> getUserResult(@PathVariable Long quizId, @PathVariable Long userId) {
        return ResponseEntity.ok(resultService.getUserResult(quizId, userId));
    }

    // Leaderboard: sorted by score desc
    @GetMapping("/quiz/{quizId}/leaderboard")
    public ResponseEntity<List<QuizResultDTO>> getLeaderboard(@PathVariable Long quizId) {
        return ResponseEntity.ok(resultService.getLeaderboard(quizId));
    }
}
