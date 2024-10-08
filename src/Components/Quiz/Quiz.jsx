import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useLocation, useNavigate } from 'react-router-dom';
import Timer from '../Timer/Timer';
import useSound from 'use-sound';
import play from '../../sounds/play.mp3';
import correctSound from '../../sounds/correct.mp3';
import wrongSound from '../../sounds/wrong.mp3';
import './Quiz.css';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our Solar System?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "80°C", "120°C"],
    answer: "100°C",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "Leo Tolstoy", "William Shakespeare", "Mark Twain"],
    answer: "William Shakespeare",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Pb", "Fe"],
    answer: "Au",
  },
];

const scoreMilestones = [5000, 10000, 15000, 20000, 30000];

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, age } = location.state || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  
  const [letsPlay] = useSound(play);
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const correct = questions[currentQuestionIndex].answer;

    if (option === correct) {
      setScore(score + 5000);
      setCorrectAnswer(option);
      playCorrect();

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null);
          setCorrectAnswer(null);
        } else {
          setIsQuizFinished(true);
        }
      }, 1000);
    } else {
      setIsGameLost(true);
      setCorrectAnswer(correct);
      playWrong();

      setTimeout(() => {
        navigate('/'); 
      }, 2000);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizFinished(false);
    setIsGameLost(false);
    setSelectedOption(null);
    setCorrectAnswer(null);
    letsPlay(); 
    navigate('/'); 
  };

  const setTimeOut = () => {
    setIsQuizFinished(true);
  };

  const getQRCodeData = (question, options) => {
    return `${question}\nOptions: ${options.join(', ')}`;
  };

  React.useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  return (
    <div className="App">
      <div className="main">
        <button 
          className="exit-button" 
          onClick={() => navigate('/')}
        >
          Exit
        </button>

        <div className="profile-card">
          <img src="https://img.freepik.com/premium-photo/elevate-your-brand-with-friendly-avatar-that-reflects-professionalism-ideal-sales-managers_1283595-18531.jpg?w=740" alt="User" className="profile-image" />
          <h3>Welcome!</h3>
          <h3>{name}</h3>
          <p>Age: {age}</p>
        </div>

        <Timer setTimeOut={setTimeOut} questionNumber={currentQuestionIndex} />
        
        {isGameLost ? (
          <div className="result">
            <h2 className="lost-message">You Lost!</h2>
            <p className="earned">Your score: {score} won</p>
          </div>
        ) : isQuizFinished ? (
          <div className="result">
            <h2>Quiz Finished!</h2>
            <p className="earned">Your score: {score} won</p>
            <button className="restart-button" onClick={restartQuiz}>Restart Quiz</button>
          </div>
        ) : (
          <div className="quiz">
            <div className="qrCode">
              <QRCodeSVG value={getQRCodeData(questions[currentQuestionIndex].question, questions[currentQuestionIndex].options)} size={128} />
            </div>
            <h2 className="question">{questions[currentQuestionIndex].question}</h2>
            <div className="answers">
              {questions[currentQuestionIndex].options.map((option, index) => {
                const isCorrect = option === questions[currentQuestionIndex].answer;
                const isSelected = option === selectedOption;
                const className = `answer ${isCorrect && isSelected ? 'correct' : ''} ${!isCorrect && isSelected ? 'wrong' : ''} ${isCorrect && option === correctAnswer ? 'correct' : ''}`;
                
                return (
                  <button
                    key={index}
                    className={className}
                    onClick={() => handleAnswer(option)}
                    style={{ color: 'white' }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="score-chart">
              {scoreMilestones.map((milestone) => (
                <div 
                  key={milestone} 
                  className={`score-tab ${score >= milestone ? 'active' : ''}`}
                >
                  {milestone}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
