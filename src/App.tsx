import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import './App.scss';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const storedList = localStorage.getItem('todoList');
    return storedList ? JSON.parse(storedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

export default App;