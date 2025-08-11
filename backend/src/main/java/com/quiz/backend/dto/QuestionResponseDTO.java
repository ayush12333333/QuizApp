package com.quiz.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //  null fields will not appear
public class QuestionResponseDTO {
    private Long id;
    private String questionText;
    private List<String> options;
    private String correctAnswer;
    private int marks;
}
