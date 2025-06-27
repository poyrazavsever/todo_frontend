import TodoCard from '@/components/TodoCard';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="py-8">
        <TodoCard />
      </div>
    </Layout>
  );
}
