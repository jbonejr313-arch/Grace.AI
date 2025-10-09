// netlify/functions/ai.js
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

exports.handler = async function(event, context) {
  console.log("🚀 Function called!", event.httpMethod);
  
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    const requestBody = JSON.parse(event.body || "{}");
    const userQuestion = requestBody.message;
    
    if (!userQuestion) {
      return { 
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "No question provided" })
      };
    }

    console.log("✅ Processing question:", userQuestion);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log("❌ GEMINI_API_KEY is missing");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "API key not configured" })
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    const modelOptions = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-2.5-pro"
    ];

    let modelUsed = "";
    let response = "";

    for (const modelName of modelOptions) {
      try {
        console.log(`🧪 Trying model: ${modelName}`);
        
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
          ],
        });

        const prompt = `As Grace.AI, a Reformed theological assistant for young adults, please respond to this question:
    
"${userQuestion}"

Follow these guidelines:
- Base your answer on Scripture first and foremost
- Present a Reformed theological perspective (emphasizing God's sovereignty)
- Include 1-3 relevant Bible references when appropriate
- Be pastoral yet direct in addressing sensitive topics like salvation, hell, and eternal consequences
- Keep your response conversational and accessible for young adults
- Aim for about 150-300 words unless more detail is needed

Format your response with clear paragraphs.`;

        console.log("🧠 Generating response...");
        const result = await model.generateContent(prompt);
        response = result.response.text();
        modelUsed = modelName;
        
        console.log(`✅ Response generated successfully with ${modelName}`);
        break;

      } catch (error) {
        console.log(`❌ Model ${modelName} failed:`, error.message);
        console.error("Error details:", {
          message: error.message,
          status: error.status,
          statusText: error.statusText
        });
        continue;
      }
    }

    if (!response) {
      throw new Error("All models failed to generate a response");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: response,
        model_used: modelUsed
      })
    };

  } catch (error) {
    console.log("💥 Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Failed to generate response",
        details: error.message 
      })
    };
  }
};
