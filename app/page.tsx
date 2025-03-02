import { ResumeUploader } from '@/components/resume-uploader';
import { HeroSection } from '@/components/hero-section';
import { Features } from '@/components/features';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ResumeUploader />
      <Features />
    </main>
  );
}