package com.quiz.backend.service;

import com.quiz.backend.dto.QuizRequestDTO;
import com.quiz.backend.dto.QuizResponseDTO;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.exception.ResourceNotFoundException;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.util.QuizMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuizMapper quizMapper;

    @Override
    public QuizResponseDTO createQuiz(QuizRequestDTO dto) {
        Quiz quiz = quizMapper.toEntity(dto);
        return quizMapper.toDto(quizRepository.save(quiz));
    }

    @Override
    public List<QuizResponseDTO> getAllQuizzes() {
        return quizRepository.findAll()
                .stream()
                .map(quizMapper::toDto)
                .toList();
    }

    @Override
    public QuizResponseDTO updateQuiz(Long id, QuizRequestDTO dto) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + id));
        quiz.setTitle(dto.getTitle());
        quiz.setCategory(dto.getCategory());
        quiz.setDifficulty(dto.getDifficulty());
        quiz.setTimer(dto.getTimer());
        return quizMapper.toDto(quizRepository.save(quiz));
    }

    @Override
    public void deleteQuiz(Long id) {
        if (!quizRepository.existsById(id)) {
            throw new ResourceNotFoundException("Quiz not found with id: " + id);
        }
        quizRepository.deleteById(id);
    }
}
