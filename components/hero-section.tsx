import { FileText, CheckCircle, Award } from "lucide-react";

export function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-background to-muted py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Resume Reviewer
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Get expert AI-powered feedback on your resume to stand out in the job market
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
          <div className="flex items-center justify-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-lg">Upload PDF</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            <span className="text-lg">Get AI Analysis</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <span className="text-lg">Improve Your Resume</span>
          </div>
        </div>
      </div>
    </div>
  );
}