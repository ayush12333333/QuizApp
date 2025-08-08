package com.quiz.backend.controller;

import com.quiz.backend.dto.QuestionRequestDTO;
import com.quiz.backend.dto.QuestionResponseDTO;
import com.quiz.backend.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/quizzes/{quizId}/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<QuestionResponseDTO> addQuestion(
            @PathVariable Long quizId,
            @Valid @RequestBody QuestionRequestDTO dto) {
        return ResponseEntity.ok(questionService.addQuestion(quizId, dto));
    }

    @GetMapping
    public ResponseEntity<List<QuestionResponseDTO>> getQuestionsByQuiz(@PathVariable Long quizId) {
        return ResponseEntity.ok(questionService.getQuestionsByQuiz(quizId));
    }

    @PutMapping("/{questionId}")
    public ResponseEntity<QuestionResponseDTO> updateQuestion(
            @PathVariable Long questionId,
            @Valid @RequestBody QuestionRequestDTO dto) {
        return ResponseEntity.ok(questionService.updateQuestion(questionId, dto));
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }
}
