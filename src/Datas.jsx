function Datas(){
    const Questions=[
        // 🟢 Basic Questions
        {
            id: 1,
            question: "What is the correct command to create a new React app?",
            option1: "npx create-react-app myApp",
            option2: "npm create-react-app",
            option3: "npx create-react myApp",
            option4: "npm start react-app",
            correctAnswer: 1
          },
          {
            id: 2,
            question: "In React, components must return ________?",
            option1: "A single HTML element",
            option2: "Multiple elements",
            option3: "A string",
            option4: "An object",
            correctAnswer: 1
          },
          {
            id: 3,
            question: "Which of the following is used to pass data to a React component?",
            option1: "state",
            option2: "props",
            option3: "setState",
            option4: "render",
            correctAnswer: 2
          },
          {
            id: 4,
            question: "What hook is used to manage state in a functional component?",
            option1: "useEffect",
            option2: "useState",
            option3: "useContext",
            option4: "useReducer",
            correctAnswer: 2
          },
        
          // 🟡 Average Questions
          {
            id: 5,
            question: "What does the `useEffect` hook mainly handle?",
            option1: "Handling CSS styling",
            option2: "Fetching data and side effects",
            option3: "Managing state",
            option4: "Rendering components",
            correctAnswer: 2
          },
          {
            id: 6,
            question: "Which keyword is used to create a class-based component in React?",
            option1: "function",
            option2: "class",
            option3: "component",
            option4: "object",
            correctAnswer: 2
          },
          {
            id: 7,
            question: "Which of these lifecycle methods is called after a component is rendered in class components?",
            option1: "componentDidMount",
            option2: "componentWillMount",
            option3: "render",
            option4: "constructor",
            correctAnswer: 1
          },
        
          // 🔴 Hard Questions
          {
            id: 8,
            question: "What is the purpose of React.memo()?",
            option1: "To prevent re-rendering of a component if its props have not changed",
            option2: "To memoize API calls",
            option3: "To handle routing in React apps",
            option4: "To create higher-order components",
            correctAnswer: 1
          },
          {
            id: 9,
            question: "In the context of React, what is 'lifting state up'?",
            option1: "Moving state from a child component to a parent component",
            option2: "Creating global variables",
            option3: "Passing state between unrelated components",
            option4: "Using Redux for state management",
            correctAnswer: 1
          },
          {
            id: 10,
            question: "What is the correct way to lazy load a React component?",
            option1: "import { Component } from './Component';",
            option2: "const Component = lazy(() => import('./Component'));",
            option3: "useEffect(() => import('./Component'));",
            option4: "import('./Component').then(Component);",
            correctAnswer: 2
          }
    ];
    return Questions;
}

export default Datas;