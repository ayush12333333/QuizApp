
package com.quiz.backend.service;

import com.quiz.backend.dto.UserVerificationDTO;
import com.quiz.backend.dto.QuizVerificationDTO;
import com.quiz.backend.entity.Question;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.entity.User;
import com.quiz.backend.entity.UserAnswer;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.repository.UserAnswerRepository;
import com.quiz.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserAnswerService {

    private final UserAnswerRepository userAnswerRepository;
    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;



    // Save user answers from DTO
    public void saveUserAnswersFromDTO(QuizVerificationDTO submissionDTO) {
        // fetch user and quiz objects first
        User user = userRepository.findById(submissionDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Quiz quiz = quizRepository.findById(submissionDTO.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<UserAnswer> userAnswers = submissionDTO.getAnswers().stream().map(dto -> {
            UserAnswer ua = new UserAnswer();
            ua.setUser(user);  // set user object
            ua.setQuiz(quiz);  // set quiz object

            Question q = questionRepository.findById(dto.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));
            ua.setQuestion(q);  // set question object

            ua.setSelectedAnswer(dto.getSelectedAnswer());
            ua.setIsCorrect(q.getCorrectAnswer().equals(dto.getSelectedAnswer()));

            return ua;
        }).collect(Collectors.toList());

        userAnswerRepository.saveAll(userAnswers);
    }


    public List<UserVerificationDTO> getUserAnswersWithExplanation(Long userId, Long quizId) {
        List<UserAnswer> userAnswers = userAnswerRepository.findByUserIdAndQuizId(userId, quizId);

        return userAnswers.stream().map(ua -> {
            Question q = ua.getQuestion(); // <-- change yahi

            UserVerificationDTO dto = new UserVerificationDTO();
            dto.setQuestionId(q.getId());
            dto.setQuestionText(q.getQuestionText());
            dto.setCorrectAnswer(q.getCorrectAnswer());
            dto.setSelectedAnswer(ua.getSelectedAnswer());
            dto.setStatus(Boolean.TRUE.equals(ua.getIsCorrect()) ? "Correct" : "Incorrect");
            dto.setMarksAwarded(Boolean.TRUE.equals(ua.getIsCorrect()) ? q.getMarks() : 0);

            return dto;
        }).collect(Collectors.toList());
    }

}
