import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { MemberDirectory, UpcomingEvents, FeaturedStory, LatestNews } from '../components/HomeComponents';

export const HomePage = () => {
  return (
    <main>
      <SEO 
        title="Home" 
        description="The Libyan British Business Council (LBBC) promotes bilateral trade and investment between the United Kingdom and Libya."
        canonical=""
      />
      <Hero />
      <About />
      <MemberDirectory />
      <UpcomingEvents />
      <FeaturedStory />
      <LatestNews />
    </main>
  );
};

export default HomePage;
