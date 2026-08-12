
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    let body = {};

    try {
        // Attempt standard request.json() parsing first.
        try {
            body = await request.json();
        } catch (jsonError) {
            console.warn("Could not parse as JSON, falling back to text.");
            const rawText = await request.text();
            body = rawText ? JSON.parse(rawText) : {}; 
        }

        // Obtain payload and default immediately if missing.
        const question = body.question || "What is Mitochondria?";
        const student_answer = body.student_answer || body.studentAnswer || "";

        // Map properties precisely to the FastAPI Pydantic schema.
        const fastApiPayload = {
            question: question,
            student_answer: student_answer,
            class_num: 10,
            subject: "Science"
        };

        // Perform the server-to-server POST request to Render.
        const renderResponse = await fetch('https://marksmind-api.onrender.com/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fastApiPayload)
        });

        if (!renderResponse.ok) {
            const errorText = await renderResponse.text();
            throw new Error(`FastAPI request failed with status ${renderResponse.status}. Raw Response: ${errorText}`);
        }

        const renderData = await renderResponse.json();
        
        // --- UPDATED REGEX PARSING LOGIC ---
        const rawText = renderData.result || "";
        
        // 1. This regex captures both the student score (Group 1) and total marks (Group 2)
        const scoreMatch = rawText.match(/MARKS:\s*(\d+)(?:\s*out\s*of\s*|\/)(\d+)/i);
        
        const extractedScore = scoreMatch ? scoreMatch[1] : "0";
        const extractedTotal = scoreMatch ? scoreMatch[2] : "3"; // Fallback denominator

        // Keep the extractedAnswer regex the same.
        const answerMatch = rawText.match(/MODEL ANSWER:\s*([\s\S]*?)(?=ADVICE:|$)/i);
        const extractedAnswer = answerMatch ? answerMatch[1].trim() : "Analysis generated, but text could not be parsed.";

        // 2. Update the final JSON return payload to include both variables.
        return new Response(JSON.stringify({
            score: extractedScore,
            max_marks: extractedTotal, // Use max_marks to match the frontend UI
            highlightedBenchmarkAnswer: extractedAnswer
        }), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });

    } catch (error) {
        // Main catch block handles any failure in the pipeline.
        console.error("🔥 API ROUTE CRASH:", error.message);
        return new Response(JSON.stringify({ 
            error: "The API endpoint encountered a fatal error.",
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
