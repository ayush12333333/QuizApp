package com.quiz.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizAttemptDTO {
    private Long quizId;
    private String username;  // optional, backend me principal se mil jayega
    private List<UserAnswerDTO> answers;
}
