import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { parsePdf } from "@/lib/pdf-parser";
import { analyzeResume } from "@/lib/openai";
import { AnalyzeRequest } from "@/types/resume";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { fileId, jobDescription } = body;

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    // Construct the file path
    const filePath = join(process.cwd(), "uploads", `${fileId}.pdf`);

    // Check if file exists before attempting to read it
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found. Please upload the resume again." },
        { status: 404 }
      );
    }

    try {
      // Read the file
      const fileBuffer = await readFile(filePath);
      
      if (fileBuffer.length === 0) {
        return NextResponse.json(
          { error: "The uploaded file is empty" },
          { status: 400 }
        );
      }
      
      // Parse the PDF
      const resumeText = await parsePdf(fileBuffer);
      
      if (!resumeText || resumeText.trim() === "") {
        return NextResponse.json(
          { error: "Could not extract text from the PDF" },
          { status: 400 }
        );
      }
      
      // Analyze the resume with OpenAI
      const analysis = await analyzeResume(resumeText, jobDescription);
      
      return NextResponse.json(analysis);
    } catch (error) {
      console.error("Error reading or processing file:", error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "File could not be processed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to analyze resume" },
      { status: 500 }
    );
  }
}