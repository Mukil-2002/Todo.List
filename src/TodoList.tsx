import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { ITodo } from './Interfaces';

interface TodoListProps {
  todoList: ITodo[];
  setTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todoList, setTodoList }) => {
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj: ITodo = {
        id: new Date().getTime(),
        title: newTask,
        description: newDescription,
        completed: false,
      };
      setTodoList([...todoList, newTaskObj]);
      setNewTask('');
      setNewDescription('');
    }
  };

  const handleToggleCompleted = (id: number) => {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const filteredTasks = todoList.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="todo-list">
      <div className="todo-input">
        <input
          type="text"
          placeholder="Task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="task">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            todo={task}
            toggleCompleted={handleToggleCompleted}
            removeTodo={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;