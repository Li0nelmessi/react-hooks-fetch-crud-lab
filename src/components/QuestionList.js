import React, {useState, useEffect}from "react";
import QuestionItem from "./QuestionItem";
  
function QuestionList() {
  const [questions, setQuestions] = useState([])
  useEffect(() => {  
  fetch("http://localhost:4000/questions")
   .then(res => res.json())
   .then(data => setQuestions(data))
  },[])
  function handleDeletedQuestion(deletedQuestion){
   const newQuestions = questions.filter(question => question.id !== deletedQuestion.id)
   setQuestions(newQuestions)
  }
  
   const oneQuestion = questions.map((question, index) => {
      return (
        <>
          <QuestionItem question={question} key={index} handleDeletedQuestion={handleDeletedQuestion}/>
        </>
      )
    })
    
    
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{oneQuestion}</ul>
    </section>
  );
}

export default QuestionList;