import Footer from '@app/components/Footer';
import NavBar from '@app/components/NavBar';
import SearchHero from '@app/components/SearchHero';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen max-w-[1080px] mx-auto m-16">
            <NavBar />
            <SearchHero />
            <Footer />
        </div>
    );
}
