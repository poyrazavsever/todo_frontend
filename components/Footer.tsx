const Footer = () => {
    return (
        <footer className="mt-auto">
            <div className="py-6 text-center flex items-center justify-between">
                <p className="text-neutral-600 dark:text-neutral-400">
                    <a
                        href="https://www.pavsever.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-pink-400 hover:text-pink-500 dark:text-pink-500 dark:hover:text-pink-400 hover:underline transition-colors"
                    >
                        Poyraz
                    </a> tarafından oluşturuldu
                </p>

                <a
                    href='/'
                    className='font-semibold text-lg text-pink-600 dark:text-pink-500'
                >
                    Birdy<span className='text-neutral-800 dark:text-white'>Birdy</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
