import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const index = pinecone.Index(process.env.PINECONE_INDEX!);

export async function upsertVectors(vectors: { id: string; values: number[]; metadata?: any }[]) {
  await index.upsert(vectors);
}

export async function queryVector(vector: number[]) {
  const res = await index.query({
    vector,
    topK: 1,
    includeMetadata: true
  });

  return res.matches?.map(m => m.metadata?.text || '') || [];
}
