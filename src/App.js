import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from './components/TodoList';

function App() {
  //State
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filtered, setFiltered] = useState([]);
  //Run once when the app start
  useEffect(() => {
    getLocalTodos();
  },[]);
  //Use Effect
  useEffect(() => {
    filterHandler();
    saveTodos();
  }, [todos, status]);
  //Functions
  const filterHandler = () => {
    switch(status){
      case "completed":
        setFiltered(todos.filter(todo => todo.completed === true))
        break;
      case "uncompleted": 
        setFiltered(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFiltered(todos);
        break;
    }
  };
  //Save to local
  const saveTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
  return (
    <div className="App">
      <header>
        <h1>-Todo List-</h1>
      </header>
      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus={setStatus}
        />
      <TodoList filtered={filtered} setTodos={setTodos} todos={todos}/>
    </div>
  );
}

export default App;
