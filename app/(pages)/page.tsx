import Features from "@/components/features";
import JobsSection from "@/components/Job-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <HeroSection /> */}
      <JobsSection />
      <Features />
    </main>
  );
}
