import { useState, useRef } from "react";
import Datas from "./datas";

function Quiz(){

    let[index, setIndex] = useState(0);
    let[question, setQuestion] = useState(Datas()[index]);
    let[lock, setLock] = useState(false);
    let[score, setScore] = useState(0);
    let[result, SetResult] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let opt_array = [option1,option2,option3,option4]


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

    const next = ()=> {
        if( lock===true){
            if(index===Datas().length-1){
                SetResult(true);
                return 0;
            }

            setIndex(++index);
            setQuestion(Datas()[index]);
            setLock(false);
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
    }

    return(
        <>
            <div class="content">
                <h1>Quiz Time!</h1>
                <hr/>
                {result? <> </>: <>
                
                    <h2>{index+1}.{question.question} </h2>
                <ul>
                    <li ref={option1} onClick={(e)=>{Ans(e,1)}}> {question.option1} </li>
                    <li ref={option2} onClick={(e)=>{Ans(e,2)}}> {question.option2} </li>
                    <li ref={option3} onClick={(e)=>{Ans(e,3)}}> {question.option3} </li>
                    <li ref={option4} onClick={(e)=>{Ans(e,4)}}> {question.option4} </li>
                </ul>
                <button onClick={next}>Next</button>
                <h5>{index+1} of {Datas().length}</h5>

                </> }

                {result? <>
                    <h1> You Scored {score} out of {Datas().length} </h1>
                    <button onClick={reset}> Reset </button>
                </>: <></> }     
                
                
            </div>

        
        </>
    );
}

export default Quiz;
