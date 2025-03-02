/**
 * This module handles interactions with the OpenAI API.
 */
import OpenAI from "openai";

import { ReviewResponse } from "@/types/resume";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined in environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeResume(
  resumeText: string,
  jobDescription?: string
): Promise<ReviewResponse> {
  try {
    // Validate input
    if (!resumeText || resumeText.trim() === "") {
      throw new Error("No resume text provided for analysis");
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume reviewer. Analyze the resume and provide detailed feedback. provide overall score, strengths, weaknesses, suggestions, ats compatibility, keyword match, and detailed feedback.",
        },
        {
          role: "user",
          content: `Resume: ${resumeText}\n\n${
            jobDescription ? `Job Description: ${jobDescription}` : ""
          }`,
        },
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const result = response.choices[0]?.message.content?.trim() || "";

      return formatResumeReviewResponse(result);
  } catch (error) {
    console.error("Error analyzing resume with OpenAI:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to analyze resume"
    );
  }
}

function formatResumeReviewResponse(responseText: string): ReviewResponse {
  const normalizedText = responseText.replace(/\r?\n|\r/g, '\n'); // Ensure consistent line breaks
  const sections = normalizedText.split(/\n{2,}/);  // Split by two or more newlines

  if (sections.length < 2) {
    console.error('Error: Response format is incorrect. Not enough sections found.');
    return {
      overallScore: 0,
      strengths: ['No strengths information available.'],
      weaknesses: ['No weaknesses information available.'],
      suggestions: ['No suggestions available.'],
      atsCompatibility: 50,
      detailedFeedback: 'The resume review could not be processed due to missing or incorrect sections.',
    };
  }

  // Extract Overall Score
  const overallScoreMatch = sections[0].match(/\*\*Overall Score: (\d+\.?\d*)\/10\*\*/);
  const overallScore = overallScoreMatch ? parseFloat(overallScoreMatch[1]) : 0;

  // Extract ATS Compatibility (assuming it's part of the response)
  const atsCompatibilityMatch = sections[0].match(/ATS Compatibility: (\d+)/);
  const atsCompatibility = atsCompatibilityMatch ? parseInt(atsCompatibilityMatch[1], 10) : 50;

  // Extract Strengths Section
  let strengths = [];
  const strengthsSection = sections.find(section => section.includes('Strengths'));
  if (strengthsSection) {
    strengths = strengthsSection
      .split('\n')
      .filter(line => line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.") || line.startsWith("4.") || line.startsWith("5."))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());
  } else {
    console.warn('Warning: No strengths section found.');
    strengths.push('No strengths information available.');
  }

  // Extract Weaknesses Section
  let weaknesses = [];
  const weaknessesSection = sections.find(section => section.includes('Weaknesses'));
  if (weaknessesSection) {
    weaknesses = weaknessesSection
      .split('\n')
      .filter(line => line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3."))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());
  } else {
    console.warn('Warning: No weaknesses section found.');
    weaknesses.push('No weaknesses information available.');
  }

  // Default suggestions if not found
  const suggestions = ["Quantify achievements", "Improve keyword match"];

  // Extract Detailed Feedback (summary, feedback, and any additional insights)
  const detailedFeedback = sections.join('\n').trim();

  return {
    overallScore,
    strengths,
    weaknesses,
    suggestions,
    atsCompatibility,
    detailedFeedback,
  };
}
