// src/components/TodoItem.tsx
import React, { useCallback } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onCompletedChange: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<Props> = React.memo(({ todo, onCompletedChange, onDelete }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onCompletedChange(todo.id, e.target.checked),
    [todo.id, onCompletedChange]
  );

  const handleDelete = useCallback(() => onDelete(todo.id), [todo.id, onDelete]);

  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
          className="h-5 w-5 text-blue-500 rounded"
        />
        <span className={todo.completed ? 'line-through text-gray-400' : ''}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-400 hover:text-red-600 font-semibold"
      >
        ลบ
      </button>
    </div>
  );
});

TodoItem.displayName = 'TodoItem';
export default TodoItem;