import { useState, useRef, useEffect } from "react";
import Datas from "./Datas";

function Quiz(){
    let[index, setIndex] = useState(0);
    let[question, setQuestion] = useState(Datas()[index]);
    let[lock, setLock] = useState(false);
    let[score, setScore] = useState(0);
    let[result, SetResult] = useState(false);
    let[showWelcome, setShowWelcome] = useState(true);
    let[showConfetti, setShowConfetti] = useState(false);
    let[timeLeft, setTimeLeft] = useState(30); // 30 seconds per question

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let opt_array = [option1,option2,option3,option4];

    // Timer effect
    useEffect(() => {
        // Only run timer when quiz is active (not on welcome or result screens)
        if (showWelcome || result || lock) return;
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // Time's up - auto-lock and move to next question
                    setLock(true);
                    
                    // Add a small delay before moving to next question
                    // This gives the user a moment to see which answer was correct
                    setTimeout(() => {
                        // Highlight the correct answer when time's up
                        opt_array[question.correctAnswer-1].current.classList.add("Correct");
                        
                        // Move to next question after a short delay
                        setTimeout(() => next(), 1500);
                    }, 300);
                    
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [timeLeft, showWelcome, result, lock]);

    // Show confetti when result is displayed
    useEffect(() => {
        if (result) {
            setShowConfetti(true);
            // Optional: Hide confetti after some time
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [result]);

    const Ans = (e,ans)=>{
        if(lock===false){
            if(question.correctAnswer===ans){
                e.target.classList.add("Correct");
                setLock(true);
                setScore(prev=>prev+1);
            }
            else{
                e.target.classList.add("Wrong");
                setLock(true);
                opt_array[question.correctAnswer-1].current.classList.add("Correct");
            }
        }
    }

    // Modify the next function to handle the case when it's called automatically
    const next = ()=> {
        if(lock===true){
            if(index===Datas().length-1){
                SetResult(true);
                return 0;
            }

            setIndex(++index);
            setQuestion(Datas()[index]);
            setLock(false);
            setTimeLeft(30); // Reset timer for new question
            opt_array.map((opt)=>{
                opt.current.classList.remove("Wrong");
                opt.current.classList.remove("Correct");
                return null;
            })
        }
    }

    const reset = ()=>{
        setIndex(0);
        setQuestion(Datas()[0]);
        setScore(0);
        setLock(false);
        SetResult(false);
        setShowWelcome(true);
        setShowConfetti(false);
        setTimeLeft(30); // Reset timer
    }

    // Function to start the quiz
    const startQuiz = () => {
        setShowWelcome(false);
        setTimeLeft(30); // Initialize timer
    }

    // Calculate progress percentage
    const progressPercentage = ((index) / (Datas().length - 1)) * 100;

    return(
        <>
            <div className="content">
                {showWelcome ? (
                    // Welcome Screen
                    <div className="welcome-screen">
                        <h1>Welcome to Inquizo!</h1>
                        <p>Test your knowledge with our interactive quiz.</p>
                        <p>You'll be presented with multiple-choice questions.</p>
                        <p>Select the correct answer and click Next to continue.</p>
                        <button onClick={startQuiz} className="start-button">Start Quiz</button>
                    </div>
                ) : (
                    // Quiz Content
                    <>
                        <h1>Inquizo!</h1>
                        <hr/>
                        {result ? (
                            // Results Screen with improved styling
                            <div className="results-container">
                                <h1>Quiz Complete!</h1>
                                
                                {/* Animated score display */}
                                <div className="score-display">
                                    {score} / {Datas().length}
                                </div>
                                
                                {/* Performance message */}
                                <p>
                                    {score === Datas().length ? "Perfect Score! Amazing!" : 
                                     score >= Datas().length * 0.8 ? "Great job!" : 
                                     score >= Datas().length * 0.6 ? "Good effort!" : 
                                     "Keep practicing!"}
                                </p>
                                
                                <button 
                                    onClick={reset} 
                                    className="reset-button"
                                >
                                    Try Again
                                </button>
                                
                                {/* Confetti effect for celebration */}
                                {showConfetti && score > Datas().length / 2 && (
                                    <>
                                        <div className="confetti" style={{left: '10%'}}></div>
                                        <div className="confetti" style={{left: '30%'}}></div>
                                        <div className="confetti" style={{left: '50%'}}></div>
                                        <div className="confetti" style={{left: '70%'}}></div>
                                        <div className="confetti" style={{left: '90%'}}></div>
                                    </>
                                )}
                            </div>
                        ) : (
                            // Quiz questions
                            <>
                                {/* Timer Component */}
                                <div className="timer-container">
                                    <div 
                                        className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}
                                    >
                                        <span className="timer-icon">⏱️</span>
                                        <span className="timer-text">{timeLeft}</span>
                                    </div>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="progress-container">
                                    <div 
                                        className="progress-bar" 
                                        style={{width: `${progressPercentage}%`}}
                                    ></div>
                                </div>
                            
                                <h2>{index+1}.{question.question}</h2>
                                <ul>
                                    <li ref={option1} onClick={(e)=>{Ans(e,1)}}>{question.option1}</li>
                                    <li ref={option2} onClick={(e)=>{Ans(e,2)}}>{question.option2}</li>
                                    <li ref={option3} onClick={(e)=>{Ans(e,3)}}>{question.option3}</li>
                                    <li ref={option4} onClick={(e)=>{Ans(e,4)}}>{question.option4}</li>
                                </ul>
                                <div className="button-container">
                                    <button onClick={next}>Next</button>
                                    <h5>{index+1} of {Datas().length}</h5>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default Quiz;
