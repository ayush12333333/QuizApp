package com.quiz.backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizVerificationDTO {
    private Long userId;
    private Long quizId;
    private List<UserVerificationDTO> answers;
}
