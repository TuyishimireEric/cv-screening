"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Loader2 } from "lucide-react";
import { ResumeReview } from "@/components/resume-review";
import { ResumeUploadForm } from "@/components/resume-upload-form";
import { JobDescriptionInput } from "@/components/job-description-input";
import { type ReviewResponse } from "@/types/resume";

export function ResumeUploader() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    // Reset review data and error when a new file is selected
    setReviewData(null);
    setError(null);
  };

  const handleJobDescriptionChange = (text: string) => {
    setJobDescription(text);
  };

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 100);
    return interval;
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF resume to upload",
        variant: "destructive",
      });
      return;
    }

    // Reset any previous errors
    setError(null);

    try {
      setIsUploading(true);
      const progressInterval = simulateProgress();

      // Create form data
      const formData = new FormData();
      formData.append("resume", file);
      
      if (jobDescription.trim()) {
        formData.append("jobDescription", jobDescription);
      }

      // Upload the file
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || "Failed to upload resume");
      }

      const uploadData = await uploadResponse.json();
      
      if (!uploadData.fileId) {
        throw new Error("No file ID returned from upload");
      }
      
      // Start analysis
      setIsUploading(false);
      setIsAnalyzing(true);

      const analysisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          fileId: uploadData.fileId,
          jobDescription: jobDescription.trim() || undefined
        }),
      });

      if (!analysisResponse.ok) {
        const errorData = await analysisResponse.json();
        throw new Error(errorData.error || "Failed to analyze resume");
      }

      const reviewData = await analysisResponse.json();
      
      if (!reviewData || typeof reviewData !== 'object') {
        throw new Error("Invalid response from analysis");
      }
      
      setReviewData(reviewData);
      
      toast({
        title: "Analysis complete",
        description: "Your resume has been analyzed successfully",
      });
    } catch (error) {
      console.error("Error processing resume:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to process resume";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setIsAnalyzing(false);
      setUploadProgress(0);
    }
  };

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Upload Your Resume</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <Card className="border border-border h-full">
              <CardContent className="pt-6">
                <ResumeUploadForm 
                  file={file} 
                  onFileChange={handleFileChange} 
                />
                
                <div className="mt-6">
                  <JobDescriptionInput
                    value={jobDescription}
                    onChange={handleJobDescriptionChange}
                  />
                </div>

                {(isUploading || uploadProgress > 0) && (
                  <div className="mt-4">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Uploading: {Math.round(uploadProgress)}%
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <div className="mt-6">
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!file || isUploading || isAnalyzing}
                    className="w-full"
                  >
                    {isUploading ? (
                      <>
                        <Upload className="mr-2 h-4 w-4" /> Uploading...
                      </>
                    ) : isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" /> Analyze Resume
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <ResumeReview reviewData={reviewData} />
          </div>
        </div>
      </div>
    </section>
  );
}