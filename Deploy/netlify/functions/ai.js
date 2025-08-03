// netlify/functions/ai.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function(event, context) {
  try {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Parse the request body to get the user's question
    const requestBody = JSON.parse(event.body);
    const userQuestion = requestBody.message;
    
    if (!userQuestion) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: "No question provided" })
      };
    }

    // Initialize Google Gemini AI with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a prompt with Reformed theology context
    const prompt = `As Grace.AI, a Reformed theological assistant for young adults, please respond to this question:
    
    "${userQuestion}"
    
    Follow these guidelines in your response:
    - Base your answer on Scripture first and foremost
    - Present a Reformed theological perspective (Calvinistic, emphasizing God's sovereignty)
    - Include 1-3 relevant Bible references when appropriate
    - Be pastoral yet direct in addressing sin or error
    - Keep your response conversational and accessible for young adults
    - Aim for about 150-300 words unless the question requires more detail
    
    Format your response with clear paragraphs and proper spacing.`;

    // Generate the AI response
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: response }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

  } catch (error) {
    console.log("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Failed to generate response",
        details: error.message 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};
