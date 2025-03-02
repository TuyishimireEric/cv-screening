"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Briefcase } from "lucide-react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Briefcase className="h-4 w-4 text-primary" />
        <Label htmlFor="job-description">Job Description (Optional)</Label>
      </div>
      <Textarea
        id="job-description"
        placeholder="Paste the job description here to get tailored feedback..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] resize-y"
      />
      <p className="text-xs text-muted-foreground mt-1">
        Adding a job description helps tailor the analysis to specific requirements
      </p>
    </div>
  );
}