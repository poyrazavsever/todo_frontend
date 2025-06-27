import { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';
import TodoModal from './TodoModal';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!token && !!user);
    }, []);

    return (
        <>
            <nav className="bg-white">
                <div className="w-full py-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href='/' className='font-semibold text-lg text-pink-600'>
                            Birdy<span className='text-neutral-800'>Birdy</span>
                        </Link>
                        {isLoggedIn ? (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-1 rounded-full bg-pink-600 text-white text-sm hover:bg-pink-700 transition-colors cursor-pointer font-medium"
                            >
                                Todo Ekle
                            </button>
                        ) : (
                            <Link
                                href='/register'
                                className="px-4 py-1 rounded-full bg-pink-600 text-white text-sm hover:bg-pink-700 transition-colors cursor-pointer font-medium"
                            >
                                Kayıt Ol
                            </Link>
                        )}
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