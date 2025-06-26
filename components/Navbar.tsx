import { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Navbar = () => {
    return (
        <nav className="bg-white">
            <div className="w-full py-3 flex justify-between items-center">
                <div className="space-x-4">
                    <a href='/register' className="px-4 py-1 rounded-full bg-pink-600 text-white text-sm hover:bg-pink-700 transition-colors cursor-pointer font-medium">
                        Kayıt Ol
                    </a >
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
    );
};

export default Navbar;
