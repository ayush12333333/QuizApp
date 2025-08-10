package com.quiz.backend.service;

import com.quiz.backend.dto.*;
import com.quiz.backend.entity.Question;
import com.quiz.backend.entity.Quiz;
import com.quiz.backend.entity.QuizResult;
import com.quiz.backend.exception.ResourceNotFoundException;
import com.quiz.backend.repository.QuestionRepository;
import com.quiz.backend.repository.QuizRepository;
import com.quiz.backend.repository.QuizResultRepository;
import com.quiz.backend.repository.UserRepository;
import com.quiz.backend.util.QuizMapper;
import lombok.RequiredArgsConstructor;
import com.quiz.backend.entity.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuizMapper quizMapper;
    private final UserRepository userRepository;
    private final QuizResultRepository quizResultRepository;
    private final QuestionRepository questionRepository;

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

    @Override
    public List<UserQuizStatusDTO> getUserQuizzes(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Quiz> allQuizzes =  quizRepository.findAll();

        return allQuizzes.stream()
                .map(quiz -> {
                    boolean submitted = quizResultRepository.existsByUserIdAndQuizId(user.getId(), quiz.getId());
                    return UserQuizStatusDTO.builder()
                            .id(quiz.getId())
                            .title(quiz.getTitle())
                            .category(quiz.getCategory())
                            .difficulty(quiz.getDifficulty())
                            .timer(quiz.getTimer())
                            .status(submitted ? "Submitted" : "Available")
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<QuestionResponseDTO> getQuestionsForUser(Long quizId) {
        //  Quiz ke questions fetch  DB se
        List<Question> questions = questionRepository.findByQuizId(quizId);

        //  Questions ko DTO me map hoga (correctAnswer null  for security)
        List<QuestionResponseDTO> dtoList = questions.stream().map(q ->
                QuestionResponseDTO.builder()
                        .id(q.getId())
                        .questionText(q.getQuestionText())
                        .options(q.getOptions())
                        .correctAnswer(null)  // Hide correct answer
                        .marks(q.getMarks())
                        .build()
        ).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    public QuizResultDTO submitQuiz(String username, Long quizId, QuizAttemptDTO attempt) {

        // 1. User find karo
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Quiz find karo
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        // 3. Questions fetch karo quiz ke
        List<Question> questions = questionRepository.findByQuizId(quizId);

        // 4. Map questions by ID for quick lookup
        Map<Long, Question> questionMap = questions.stream()
                .collect(Collectors.toMap(Question::getId, Function.identity()));

        int totalMarks = questions.stream().mapToInt(Question::getMarks).sum();
        int correctCount = 0;
        int wrongCount = 0;
        int skippedCount = 0;
        int score = 0;

        // 5. Evaluate user answers
        for (UserAnswerDTO userAnswer : attempt.getAnswers()) {
            Question question = questionMap.get(userAnswer.getQuestionId());
            if (question == null) {
                // Question invalid for this quiz, ignore or throw error
                continue;
            }
            String correctAnswer = question.getCorrectAnswer();
            String selected = userAnswer.getSelectedOption();

            if (selected == null || selected.isEmpty()) {
                skippedCount++;
            } else if (selected.equals(correctAnswer)) {
                correctCount++;
                score += question.getMarks();
            } else {
                wrongCount++;
            }
        }

        // 6. Account for any questions user skipped altogether
        int totalQuestions = questions.size();
        List<UserAnswerDTO> answers = attempt.getAnswers();
        int answeredCount = (answers != null) ? answers.size() : 0;

        skippedCount += (totalQuestions - answeredCount);

        // 7. Save result in DB (optional)
        QuizResult quizResult = QuizResult.builder()
                .quiz(quiz)
                .user(user)
                .score(score)
                .totalMarks(totalMarks)
                .correctCount(correctCount)
                .wrongCount(wrongCount)
                .skippedCount(skippedCount)
                .submittedAt(LocalDateTime.now())
                .build();

        quizResultRepository.save(quizResult);

        // 8. Return QuizResultDTO
        return QuizResultDTO.builder()
                .quizTitle(quiz.getTitle())
                .username(user.getEmail())
                .score(score)
                .totalMarks(totalMarks)
                .correctCount(correctCount)
                .wrongCount(wrongCount)
                .skippedCount(skippedCount)
                .submittedAt(quizResult.getSubmittedAt())
                .build();
    }

    @Override
    public List<DetailedQuestionResultDTO> getDetailedExplanation(String username, Long quizId, QuizAttemptDTO attempt) {

        // 1. User validation
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Quiz validation
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        // 3. Fetch all questions of the quiz
        List<Question> questions = questionRepository.findByQuizId(quizId);

        // 4. Map user answers by questionId for quick lookup
        Map<Long, String> userAnswersMap = attempt.getAnswers() != null ?
                attempt.getAnswers().stream()
                        .collect(Collectors.toMap(UserAnswerDTO::getQuestionId, UserAnswerDTO::getSelectedOption))
                : new HashMap<>();

        List<DetailedQuestionResultDTO> detailedResults = new ArrayList<>();

        // 5. Prepare detailed explanation for each question
        for (Question question : questions) {
            String correctAnswer = question.getCorrectAnswer();
            String userAnswer = userAnswersMap.get(question.getId());

            String status;
            int marksAwarded = 0;

            if (userAnswer == null || userAnswer.isEmpty()) {
                status = "Skipped";
            } else if (userAnswer.equals(correctAnswer)) {
                status = "Correct";
                marksAwarded = question.getMarks();
            } else {
                status = "Incorrect";
            }

            detailedResults.add(DetailedQuestionResultDTO.builder()
                    .questionId(question.getId())
                    .questionText(question.getQuestionText())
                    .options(question.getOptions())
                    .correctAnswer(correctAnswer)   // Explanation ke liye correct answer chahiye
                    .userAnswer(userAnswer)
                    .status(status)
                    .marksAwarded(marksAwarded)
                    .build());
        }

        return detailedResults;
    }

    public List<QuizResultHistoryDTO> getUserResultsHistory(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<QuizResult> results = quizResultRepository.findByUser(user);

        return results.stream()
                .map(result -> QuizResultHistoryDTO.builder()
                        .quizTitle(result.getQuiz().getTitle())
                        .score(result.getScore())
                        .submittedAt(result.getSubmittedAt())
                        .build())
                .collect(Collectors.toList());
    }


}
