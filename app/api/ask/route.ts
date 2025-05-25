import { NextRequest, NextResponse } from 'next/server';
import { getTitanEmbedding, askClaude } from '@/lib/server/bedrock';
import { queryVector } from '@/lib/server/pinecone';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    const queryEmbedding = await getTitanEmbedding(question);
    const topChunks = await queryVector(queryEmbedding);
  
    const prompt = `Based on the following information:\n${topChunks.join('\n\n')}\n\nAnswer the following question:\n${question}`;
    const answer = await askClaude(prompt);

    return NextResponse.json({ answer,topChunks });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get answer.' }, { status: 500 });
  }
}
