package com.quiz.backend.service;

import com.quiz.backend.dto.QuizResultDTO;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.entity.QuizResult;
import com.quiz.backend.exception.ResourceNotFoundException;
import com.quiz.backend.mapper.ResultMapper;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.repository.QuizResultRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResultServiceImpl implements ResultService {

    private final QuizResultRepository quizResultRepository;
    private final QuizRepository quizRepository;
    private final ResultMapper resultMapper;

    @Override
    @Transactional(readOnly = true)
    public List<QuizResultDTO> getResultsByQuiz(Long quizId) {
        // ensure quiz exists (better error messages)
        quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        return quizResultRepository.findByQuizId(quizId)
                .stream()
                .map(resultMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public QuizResultDTO getUserResult(Long quizId, Long userId) {
        // ensure quiz exists
        quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        QuizResult result = quizResultRepository.findByQuizIdAndUserId(quizId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Result not found for quizId: " + quizId + " and userId: " + userId));

        return resultMapper.toDto(result);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizResultDTO> getLeaderboard(Long quizId) {
        // ensure quiz exists
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        // Repo returns results sorted by score desc
        return quizResultRepository.findByQuizIdOrderByScoreDesc(quiz.getId())
                .stream()
                .map(resultMapper::toDto)
                .collect(Collectors.toList());
    }
}
