import { useState } from "react";
import "./App.scss";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love Easy Frontend!" },
    { id: 2, title: "We love Easy Frontend!" },
    { id: 3, title: "They love Easy Frontend!" },
  ]);

  function handleTodoClick(todo) {
    const updatedTodoList = todoList.filter((item) => item.id !== todo.id);
    setTodoList(updatedTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    formValues && alert("Form submitted successfully!");
    const updatedTodoList = [...todoList];
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    updatedTodoList.push(newTodo);
    setTodoList(updatedTodoList);
  }

  return (
    <div className="App">
      <h1>React hooks - TodoList</h1>

      <TodoList todos={todoList} onTodoClick={handleTodoClick} />

      <TodoForm onSubmit={handleTodoFormSubmit} />
    </div>
  );
}

export default App;
