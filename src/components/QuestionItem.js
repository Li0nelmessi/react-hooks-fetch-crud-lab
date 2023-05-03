import React, {useState} from "react";
function QuestionItem({ question, handleDeletedQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [correctAnswer, setCorrectAnswer] = useState("")
  const options = answers.map((answer, index) => (
    <option key={index} value={answer} onClick ={changeCorrectAnswer}>
      {answer}
    </option>
  ));
  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(()=> {
      handleDeletedQuestion(question)
      // window.location.reload()
  })
}
  function changeCorrectAnswer(e){
    const newCorrectAnswer = e.target.value;
    setCorrectAnswer(newCorrectAnswer)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(setCorrectAnswer(correctAnswer))
  })
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;