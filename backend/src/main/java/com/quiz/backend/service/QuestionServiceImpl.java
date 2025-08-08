package com.quiz.backend.service;

import com.quiz.backend.dto.QuestionRequestDTO;
import com.quiz.backend.dto.QuestionResponseDTO;
import com.quiz.backend.entity.Question;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.exception.ResourceNotFoundException;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;

    @Override
    public QuestionResponseDTO addQuestion(Long quizId, QuestionRequestDTO dto) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        Question question = Question.builder()
                .quiz(quiz)
                .questionText(dto.getQuestionText())
                .options(dto.getOptions())
                .correctAnswer(dto.getCorrectAnswer())
                .marks(dto.getMarks())
                .build();

        Question saved = questionRepository.save(question);
        return mapToDto(saved);
    }

    @Override
    public List<QuestionResponseDTO> getQuestionsByQuiz(Long quizId) {
        return questionRepository.findByQuizId(quizId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public QuestionResponseDTO updateQuestion(Long questionId, QuestionRequestDTO dto) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionId));

        question.setQuestionText(dto.getQuestionText());
        question.setOptions(dto.getOptions());
        question.setCorrectAnswer(dto.getCorrectAnswer());
        question.setMarks(dto.getMarks());

        return mapToDto(questionRepository.save(question));
    }

    @Override
    public void deleteQuestion(Long questionId) {
        if (!questionRepository.existsById(questionId)) {
            throw new ResourceNotFoundException("Question not found with id: " + questionId);
        }
        questionRepository.deleteById(questionId);
    }

    private QuestionResponseDTO mapToDto(Question question) {
        return QuestionResponseDTO.builder()
                .id(question.getId())
                .questionText(question.getQuestionText())
                .options(question.getOptions())
                .correctAnswer(question.getCorrectAnswer())
                .marks(question.getMarks())
                .build();
    }
}
