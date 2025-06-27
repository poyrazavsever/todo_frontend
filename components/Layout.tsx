import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="max-w-4xl mx-auto min-h-screen flex flex-col font-nunito text-neutral-900 dark:text-white transition-colors">
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        backgroundColor: '#fce7f3', // Pembe arka plan
                        color: '#9d174d', // Pembe metin rengi
                        borderRadius: '8px', // Hafif yuvarlatılmış köşeler
                        border: '1px solid #f9a8d4', // Pembe kenarlık
                    },
                }}
            />
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
