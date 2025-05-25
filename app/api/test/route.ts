import { getTitanEmbedding } from '@/lib/server/bedrock';
import { NextResponse } from 'next/server';

export async function GET() {
  const embedding = await getTitanEmbedding("hello world");

  console.log("Embeddings : ",embedding);
  

  return NextResponse.json({
    embedding:embedding,
    message: '✅ Backend is working!',
    timestamp: new Date().toISOString(),
  });
}
