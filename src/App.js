import { useEffect, useState } from "react";
import QueryString from "qs";
import "./App.scss";
import Pagination from "./components/Pagination";
import PostList from "./components/PostList";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love Easy Frontend!" },
    { id: 2, title: "We love Easy Frontend!" },
    { id: 3, title: "They love Easy Frontend!" },
  ]);

  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = QueryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPostList();
  }, [filters]);

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

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  return (
    <div className="App">
      <h1>React hooks - TodoList</h1>

      <TodoList todos={todoList} onTodoClick={handleTodoClick} />

      <TodoForm onSubmit={handleTodoFormSubmit} />
      <PostList posts={postList} />

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
