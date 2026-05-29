import BeritaSection from "../components/views/berita";
import ResultSurveySection from "../components/views/hasil";
import HeroSection from "../components/views/hero";
import SurveySection from "../components/views/survey";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ResultSurveySection />
      <BeritaSection />
      <SurveySection />
    </>
  );
}
