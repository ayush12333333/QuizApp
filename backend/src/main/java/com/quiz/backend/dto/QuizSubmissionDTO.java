package com.quiz.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizSubmissionDTO {
    private Long userId;
    private Long quizId;
    private List<UserAnswerDTO> answers;
}
