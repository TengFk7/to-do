// src/components/AddTodoForm.tsx
import React, { useState, useCallback } from 'react';

interface Props {
  onSubmit: (title: string) => void;
}

const AddTodoForm: React.FC<Props> = React.memo(({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim());
    setTitle('');
  }, [title, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="เพิ่มงานใหม่..."
        className="flex-1 border p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
      >
        Add
      </button>
    </form>
  );
});

AddTodoForm.displayName = 'AddTodoForm';
export default AddTodoForm;