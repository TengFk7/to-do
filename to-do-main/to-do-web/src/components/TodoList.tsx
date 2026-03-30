// src/components/TodoList.tsx
import React from 'react';
import type { Todo } from '../types';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  loading?: boolean;
  onDelete: (id: number) => void;
  onCompletedChange: (id: number, completed: boolean) => void;
}

const TodoList: React.FC<Props> = React.memo(({ todos, loading, onDelete, onCompletedChange }) => {
  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (todos.length === 0) {
    return <p className="text-center text-gray-500">ไม่มีงานในรายการ</p>;
  }

  return (
    <div className="border border-gray-200 rounded-md">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onCompletedChange={onCompletedChange} />
      ))}
    </div>
  );
});

TodoList.displayName = 'TodoList';

export default TodoList;