export interface ReviewResponse {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  atsCompatibility: number;
  keywordMatch?: number;
  detailedFeedback: string;
}

export interface UploadResponse {
  fileId: string;
  filename: string;
  success: boolean;
}

export interface AnalyzeRequest {
  fileId: string;
  jobDescription?: string;
}