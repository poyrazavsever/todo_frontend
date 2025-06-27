import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoCard from '@/components/TodoCard';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import classNames from 'classnames';

type Todo = {
  _id: string;
  userId: string;
  completed: boolean;
  title: string;
  content: string;
  category: string;
  // Add other fields as needed, e.g. description, etc.
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'completed'
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<{ name: string; userId: string }>(token);
      setUserId(decodedToken.userId);
    }
  }, []);

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

      // Sadece kullanıcıya ait todoları filtrele
      const userTodos = data.filter((todo: { userId: string | null; }) => todo.userId === userId);
      setTodos(userTodos);

    } catch (error) {
      console.error(error);
      toast.error('Todo verilerini alırken bir hata oluştu');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  const filteredTodos = todos.filter(todo =>
    activeTab === 'active' ? !todo.completed : todo.completed
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto py-8">
        {/* Tab Bar */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('active')}
            className={classNames(
              'px-6 py-2 rounded-full font-medium transition-all',
              {
                'bg-pink-600 dark:bg-pink-500 text-white': activeTab === 'active',
                'bg-pink-100 text-pink-600 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-400 dark:hover:bg-pink-800': activeTab !== 'active'
              }
            )}
          >
            Aktif Todolar
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={classNames(
              'px-6 py-2 rounded-full font-medium transition-all',
              {
                'bg-green-600 dark:bg-green-500 text-white': activeTab === 'completed',
                'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-400 dark:hover:bg-green-800': activeTab !== 'completed'
              }
            )}
          >
            Tamamlananlar
          </button>
        </div>

        {/* Todo Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredTodos.map(todo => (
              <motion.div
                key={todo._id}
                variants={itemVariants}
                layout
              >
                <TodoCard
                  todo={todo}
                  onUpdate={fetchTodos}
                />
              </motion.div>
            ))}
            {filteredTodos.length === 0 && (
              <motion.p
                variants={itemVariants}
                className="col-span-2 text-center text-neutral-500 dark:text-neutral-400 py-8"
              >
                {activeTab === 'active'
                  ? 'Aktif todo bulunmuyor'
                  : 'Tamamlanmış todo bulunmuyor'}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Layout>
  );
}