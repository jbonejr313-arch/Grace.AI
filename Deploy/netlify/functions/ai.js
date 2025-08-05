// netlify/functions/ai.js - UPGRADED VERSION
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function(event, context) {
  // Add CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  try {
    // Handle CORS preflight
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers, body: "" };
    }

    // Only allow POST requests
    if (event.httpMethod !== "POST") {
      return { 
        statusCode: 405, 
        headers,
        body: JSON.stringify({ error: "Method Not Allowed" })
      };
    }

    // Parse the request body to get the user's question
    const requestBody = JSON.parse(event.body);
    const userQuestion = requestBody.message;
    
    if (!userQuestion) {
      return { 
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "No question provided" })
      };
    }

    // Initialize Google Gemini AI with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // UPGRADED TO GEMINI 1.5 PRO with relaxed safety settings
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_ONLY_HIGH",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_ONLY_HIGH",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_ONLY_HIGH",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_ONLY_HIGH",
        },
      ],
    });

    // Enhanced prompt with Reformed theology context
    const prompt = `As Grace.AI, a Reformed theological assistant for young adults, please respond to this question:
    
    "${userQuestion}"
    
    Follow these guidelines in your response:
    - Base your answer on Scripture first and foremost
    - Present a Reformed theological perspective (Calvinistic, emphasizing God's sovereignty)
    - Include 1-3 relevant Bible references when appropriate
    - Be pastoral yet direct in addressing sin, salvation, hell, and eternal consequences
    - Address difficult theological topics with biblical truth and pastoral care
    - Keep your response conversational and accessible for young adults
    - Aim for about 150-300 words unless the question requires more detail
    - Ground all responses in sound Reformed doctrine
    
    Format your response with clear paragraphs and proper spacing.`;

    // Generate the AI response with configuration
    const result = await model.generateContent(prompt, {
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const response = result.response.text();

    // Return a success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: response })
    };

  } catch (error) {
    console.log("Error:", error);
    
    // Better error handling
    if (error.message?.includes('blocked') || error.message?.includes('SAFETY')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: "Response blocked by safety filters",
          message: "Please try rephrasing your theological question in a different way."
        })
      };
    }

    if (error.message?.includes('quota') || error.message?.includes('429')) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ 
          error: "Rate limit exceeded",
          message: "Too many requests. Please wait a moment and try again."
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Failed to generate response",
        message: "AI service temporarily unavailable. Please try asking for a Bible study instead!",
        details: error.message 
      })
    };
  }
};
