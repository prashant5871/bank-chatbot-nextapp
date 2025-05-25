import {
  BedrockRuntimeClient,
  InvokeModelCommand
} from "@aws-sdk/client-bedrock-runtime";

// Explicitly retrieve from environment variables
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION || "us-east-1"; // Default to us-east-1 if not set

// --- Check for required environment variables ---
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set in environment variables.");
}

const bedrock = new BedrockRuntimeClient({
  region: AWS_REGION,
  credentials: { // <--- Explicitly provide credentials here
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  // You can also add a higher timeout for troubleshooting network issues
  // requestTimeout: 30000 // 30 seconds
});

export async function getTitanEmbedding(text: string): Promise<number[]> {
  const input = {
    modelId: 'amazon.titan-embed-text-v2:0',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      inputText: text
    })
  };

  const command = new InvokeModelCommand(input);
  const response = await bedrock.send(command);
  const result = JSON.parse(Buffer.from(response.body).toString());

  return result.embedding;

}

export async function askClaude(prompt: string): Promise<string> {
  const input = {
    modelId: "anthropic.claude-3-haiku-20240307-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31", 
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512
    })
  };
  

  const command = new InvokeModelCommand(input);
  const response = await bedrock.send(command);
  const body = JSON.parse(new TextDecoder().decode(response.body));
  return body.content[0].text;
}