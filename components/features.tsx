import { 
  FileCheck, 
  Sparkles, 
  BarChart4, 
  Lightbulb, 
  Briefcase 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Features() {
  const features = [
    {
      icon: <FileCheck className="h-8 w-8 text-primary" />,
      title: "Resume Analysis",
      description: "Upload your resume and get detailed feedback on its structure, content, and formatting."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "AI-Powered Feedback",
      description: "Receive intelligent suggestions on grammar, clarity, and missing sections from advanced AI."
    },
    {
      icon: <BarChart4 className="h-8 w-8 text-primary" />,
      title: "Resume Scoring",
      description: "Get your resume scored based on ATS-friendliness, readability, and industry standards."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Improvement Suggestions",
      description: "Receive actionable recommendations to enhance your resume's impact and effectiveness."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Job Description Matching",
      description: "Compare your resume with job descriptions to optimize for specific opportunities."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}