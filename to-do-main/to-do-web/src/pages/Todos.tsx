// src/pages/Todos.tsx
import React from 'react';
import { useTodos } from '../hooks/useTodos';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import FilterSortBar from '../components/FilterSortBar';

const Todos: React.FC = () => {
  const {
    todos,
    loading,
    addTodo,
    deleteTodo,
    toggleTodo,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useTodos();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">To-Do App</h1>
      <AddTodoForm onSubmit={addTodo} />
      <FilterSortBar
        filter={filter}
        onFilterChange={setFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />
      <TodoList todos={todos} loading={loading} onDelete={deleteTodo} onCompletedChange={toggleTodo} />
    </div>
  );
};

export default Todos;