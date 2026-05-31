import BeritaSection from "../components/views/berita";
import ResultSurveySection from "../components/views/hasil";
import HeroSection from "../components/views/hero";
import InfografisSection from "../components/views/infografis";
import SurveySection from "../components/views/survey";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InfografisSection />
      <ResultSurveySection />
      <BeritaSection />
      <SurveySection />
    </>
  );
}
