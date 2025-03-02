"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  AlertCircle,
  BarChart3,
  Lightbulb,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { type ReviewResponse } from "@/types/resume";

export const formatToHtml = (text: string) => {
  console.log("--------------------------");
  console.log(text);

  // Replace headings (###) with <h2> tags
  text = text.replace(/### (.*?)(?=\n|$)/g, "<h2>$1</h2>");

  // Replace bold text (**) with <strong> tags
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  return text;
};

interface ResumeReviewProps {
  reviewData: ReviewResponse | null;
}

export function ResumeReview({ reviewData }: ResumeReviewProps) {
  if (!reviewData) {
    return (
      <Card className="border border-border h-full">
        <CardHeader>
          <CardTitle>Resume Analysis</CardTitle>
          <CardDescription>
            Upload your resume to get AI-powered feedback and suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Your analysis results will appear here after uploading
          </p>
        </CardContent>
      </Card>
    );
  }

  const {
    overallScore,
    strengths,
    weaknesses,
    suggestions,
    atsCompatibility,
    keywordMatch,
    detailedFeedback,
  } = reviewData;

  return (
    <Card className="border border-border h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Resume Analysis
          <Badge
            variant={
              overallScore >= 80
                ? "default"
                : overallScore >= 60
                ? "outline"
                : "secondary"
            }
          >
            Score: {overallScore}/100
          </Badge>
        </CardTitle>
        <CardDescription>AI-powered analysis of your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strengths">Strengths</TabsTrigger>
            <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">ATS Compatibility</span>
                <span className="text-sm">{atsCompatibility}%</span>
              </div>
              <Progress value={atsCompatibility} className="h-2" />
            </div>

            {keywordMatch && (
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Job Keyword Match</span>
                  <span className="text-sm">{keywordMatch}%</span>
                </div>
                <Progress value={keywordMatch} className="h-2" />
              </div>
            )}

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Detailed Feedback</h4>
              <p
                className="text-sm text-muted-foreground whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: formatToHtml(detailedFeedback),
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="strengths">
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: formatToHtml(strength),
                    }}
                  />
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="weaknesses">
            <ul className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: formatToHtml(weakness),
                    }}
                  />
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="suggestions">
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: formatToHtml(suggestion),
                    }}
                  />
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
