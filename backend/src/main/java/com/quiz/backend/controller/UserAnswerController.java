package com.quiz.backend.controller;

import com.quiz.backend.dto.*;

import com.quiz.backend.service.UserAnswerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user-answers")
public class UserAnswerController {

    private final UserAnswerService userAnswerService;

    public UserAnswerController(UserAnswerService userAnswerService) {
        this.userAnswerService = userAnswerService;
    }

    // Save user answers
    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submitQuizAnswers(@RequestBody QuizVerificationDTO submissionDTO) {
        userAnswerService.saveUserAnswersFromDTO(submissionDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Answers saved successfully");
        return ResponseEntity.ok(response);
    }


    // Get explanation (user answer vs correct answer)
    @GetMapping("/explanation/{userId}/{quizId}")
    public ResponseEntity<List<UserVerificationDTO>> getExplanation(
            @PathVariable Long userId,
            @PathVariable Long quizId
    ) {
        List<UserVerificationDTO> explanation = userAnswerService.getUserAnswersWithExplanation(userId, quizId);
        return ResponseEntity.ok(explanation);
    }
}
