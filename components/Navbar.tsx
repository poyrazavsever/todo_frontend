import { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FiMoon, FiSun } from 'react-icons/fi';
import Link from 'next/link';
import TodoModal from './TodoModal';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        setIsLoggedIn(!!token && !!user);

        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <>
            <nav className="transition-colors">
                <div className="w-full py-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href='/' className='font-semibold text-lg text-pink-600 dark:text-pink-500'>
                            Birdy<span className='text-neutral-800 dark:text-white'>Birdy</span>
                        </Link>
                        {isLoggedIn ? (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-1 rounded-full bg-pink-600 text-white text-sm hover:bg-pink-700 transition-colors cursor-pointer font-medium dark:bg-pink-500 dark:hover:bg-pink-600"
                            >
                                Todo Ekle
                            </button>
                        ) : (
                            <Link
                                href='/register'
                                className="px-4 py-1 rounded-full bg-pink-600 text-white text-sm hover:bg-pink-700 transition-colors cursor-pointer font-medium dark:bg-pink-500 dark:hover:bg-pink-600"
                            >
                                Kayıt Ol
                            </Link>
                        )}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                            {theme === 'light' ? (
                                <FiMoon className="w-5 h-5 text-pink-600 dark:text-white" />
                            ) : (
                                <FiSun className="w-5 h-5 text-neutral-600 dark:text-pink-400" />
                            )}
                        </button>
                    </div>
                    <div className="w-16 h-16">
                        <DotLottieReact
                            autoplay
                            loop
                            src="https://lottie.host/f18198d9-ae38-46f9-80ba-0ff12edfb760/Xnxcw1ewFY.lottie"
                        />
                    </div>
                </div>
            </nav>

            <TodoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Navbar;