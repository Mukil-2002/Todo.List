import React, { useState } from 'react';
import { ITodo } from './Interfaces';

interface TodoItemProps {
  todo: ITodo;
  toggleCompleted: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, title: string, description?: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleCompleted,
  removeTodo,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');

  const handleToggleCompleted = () => {
    toggleCompleted(todo.id);
  };

  const handleRemoveTodo = () => {
    removeTodo(todo.id);
  };

  const handleEditTodo = () => {
    if (editedTitle.trim()) {
      editTodo(todo.id, editedTitle, editedDescription);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || '');
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </>
        ) : (
          <>
            <span className="title">{todo.title}</span>
            {todo.description && <span className="description">{todo.description}</span>}
          </>
        )}
      </div>
      <div className="task">
        <button onClick={handleToggleCompleted}>
          {todo.completed ? 'Incomplete' : 'Complete'}
        </button>
        {isEditing ? (
          <>
            <button onClick={handleEditTodo}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={handleRemoveTodo}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;