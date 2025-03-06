import { ResumeUploader } from '@/components/resume-uploader';
import Features from '@/components/features';
import HeroSection from '@/components/hero-section';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      {/* <ResumeUploader /> */}
      <Features />
    </main>
  );
}