// src/pages/Home.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../lib/api';
import type { Todo } from '../types';

const Home: React.FC = React.memo(() => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    api.todos.get({}).then(({ data }) => {
      if (data) setTodos(data as unknown as Todo[]);
    });
  }, []);

  const completedCount = useMemo(() => todos.filter(t => t.completed).length, [todos]);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-blue-100 p-4 rounded-lg">
        <p className="text-lg">
          คุณมีงานทั้งหมด: <span className="font-bold">{todos.length}</span> งาน
        </p>
        <p className="text-lg text-green-600">
          เสร็จแล้ว: <span className="font-bold">{completedCount}</span> งาน
        </p>
      </div>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;