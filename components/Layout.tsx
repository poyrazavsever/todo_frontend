import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="max-w-4xl mx-auto min-h-screen flex flex-col font-nunito">
            <Navbar />
            <main className="flex-grow  w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
