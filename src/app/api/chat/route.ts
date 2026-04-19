import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key_if_not_set' });

export async function POST(req: NextRequest) {
  let fallbackDensityData: Record<string, number> = {};
  
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);
    const { messages, densityData } = body;
    fallbackDensityData = densityData || {};
    
    // Get latest user prompt
    const userPrompt = messages?.filter((m: any) => m.role === 'user').pop()?.text || 'Hello';
    
    // Prompt Grounding
    const systemInstruction = `
You are the FluxArena AI Assistant.
You must provide concise operational recommendations based ONLY on the provided densityData.
Do NOT invent or hallucinate data.

Current crowd density state (values between 0.0 and 1.0, where 1.0 is extremely congested):
${JSON.stringify(densityData, null, 2)}

You MUST respond strictly in valid JSON format with exactly three fields:
{
  "Recommendation": "Your operational recommendation here (e.g. 'Use Gate B', 'Wait 5 mins')",
  "Reasoning": "Why you recommend this based on the densityData",
  "Confidence": 95
}
`;

    // Timeout Promise (7 seconds)
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('TIMEOUT')), 7000);
    });

    // Gemini Request Promise
    const responsePromise = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemInstruction + '\n\nUser Query: ' + userPrompt }] }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    const response = await Promise.race([responsePromise, timeoutPromise]);
    
    let rawResponse = response.text;
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(rawResponse);
    } catch (e) {
      // Clean up markdown block if present
      rawResponse = rawResponse.replace(/```json\n|\n```/g, '');
      parsedResponse = JSON.parse(rawResponse);
    }

    return NextResponse.json({
      Recommendation: parsedResponse.Recommendation || "Proceed with caution",
      Reasoning: parsedResponse.Reasoning || "System provided a generic state.",
      Confidence: parsedResponse.Confidence || 50
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error.message || error);
    
    // Local Fallback Decision Engine
    let mostCongestedZone = 'Unknown';
    let highestDensity = 0;
    
    Object.entries(fallbackDensityData).forEach(([zone, density]) => {
      if (density > highestDensity) {
        highestDensity = density;
        mostCongestedZone = zone;
      }
    });

    let fallbackRec = "Please monitor local crowd screens.";
    let fallbackReason = "Unable to reach global intelligence network. Falling back to local data.";

    if (highestDensity > 0.6) {
       fallbackRec = `Avoid ${mostCongestedZone} as it is highly congested.`;
       fallbackReason = "Local fallback detected high density in this area.";
    } else if (highestDensity > 0) {
       fallbackRec = "All areas appear to have manageable crowds.";
       fallbackReason = "Local fallback found no critical congestion points.";
    }

    return NextResponse.json({
      Recommendation: fallbackRec,
      Reasoning: fallbackReason,
      Confidence: 60
    }, { status: 200 }); // Status 200 so UI doesn't break
  }
}
