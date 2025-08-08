package com.quiz.backend.controller;

import com.quiz.backend.dto.QuizRequestDTO;
import com.quiz.backend.dto.QuizResponseDTO;
import com.quiz.backend.service.QuizService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public QuizResponseDTO createQuiz(@Valid @RequestBody QuizRequestDTO dto) {
        return quizService.createQuiz(dto);
    }

    @GetMapping
    public List<QuizResponseDTO> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @PutMapping("/{id}")
    public QuizResponseDTO updateQuiz(@PathVariable Long id, @Valid @RequestBody QuizRequestDTO dto) {
        return quizService.updateQuiz(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
    }
}
