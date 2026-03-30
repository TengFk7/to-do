// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Todos from './pages/Todos';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
        <nav className="mb-8 space-x-4 bg-white p-4 rounded-lg shadow">
          <Link to="/" className="text-blue-600 font-bold hover:underline">Dashboard</Link>
          <Link to="/todos" className="text-blue-600 font-bold hover:underline">Manage Todos</Link>
        </nav>
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todos />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;