const Footer = () => {
    return (
        <footer className="bg-white mt-auto">
            <div className="py-6 text-center flex items-center justify-between">
                <p className="text-neutral-600"><a href="https://www.pavsever.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-pink-400">Bu çocuk</a> tarafından oluşturuldu</p>
                <p className="text-neutral-500 text-sm mt-2">© {new Date().getFullYear()} Tüm hakları saklıdır.</p>
            </div>
        </footer>
    );
};

export default Footer;
