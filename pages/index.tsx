import { useState, useEffect } from 'react';
import TodoCard from '@/components/TodoCard';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';

export default function Home() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/todo', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Todo verilerini alamadım');
      }
      setTodos(data);

    } catch (error) {
      console.error(error);
      toast.error('Todo verilerini alırken bir hata oluştu');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Layout>
      <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {todos?.map(todo => (
          <TodoCard
            todo={todo}
            onUpdate={fetchTodos}
          />
        ))}
      </div>
    </Layout>
  );
}