import { getTitanEmbedding } from '@/lib/server/bedrock';
import { upsertVectors } from '@/lib/server/pinecone';
import { extractTextFromPdf } from '@/lib/server/utils';
import { NextRequest, NextResponse } from 'next/server';

// Define a chunk size for text to prevent exceeding embedding model limits
const MAX_EMBEDDING_CHUNK_SIZE = 3000;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Invalid file input' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Extract text from the PDF
    const extractedText = await extractTextFromPdf(buffer);

    // 2. Split text into manageable chunks for embedding
    // For simplicity, let's assume splitting by a few common delimiters like paragraphs or sentences
    // For production, you might need a more sophisticated text splitting strategy (e.g., recursive character text splitter
    // Define desired number of words per chunk
    const WORDS_PER_CHUNK = 200;

    // 1. Extract words from the text
    const words = extractedText.split(/\s+/).filter(word => word.length > 0);

    // 2. Group words into chunks
    const textChunks: string[] = [];

    for (let i = 0; i < words.length; i += WORDS_PER_CHUNK) {
      const chunk = words.slice(i, i + WORDS_PER_CHUNK).join(' ');
      textChunks.push(chunk);
    }

    // Now textChunks contains word-based chunks ready for embedding

    // Filter out empty chunks and trim whitespace
    const filteredChunks = textChunks.map(chunk => chunk.trim()).filter(chunk => chunk.length > 0);

    if (filteredChunks.length === 0) {
      return NextResponse.json({ message: "No meaningful text found in PDF for embedding." }, { status: 200 });
    }


    console.log("filtered chunks : ", filteredChunks);


    const vectorsToUpsert = [];

    for (let index = 0; index < filteredChunks.length; index++) {
      const chunk = filteredChunks[index];
      const chunkForEmbedding = chunk.slice(0, MAX_EMBEDDING_CHUNK_SIZE);

      try {
        const embedding = await getTitanEmbedding(chunkForEmbedding);

        console.log("embeddding ; ",index , embedding);


        vectorsToUpsert.push({
          id: `pdf-chunk-${index}`,
          values: embedding,
          metadata: {
            text: chunk,
            chunk_index: index,
          }
        });
      } catch (err) {
        console.error(`Error embedding chunk ${index}:`, err);
        // Optional: You can skip the chunk or rethrow depending on how critical this is
      }
    }


    console.log("vectors to upsert : ", vectorsToUpsert);

    // 4. Upsert vectors into Pinecone
    await upsertVectors(vectorsToUpsert);

    // 5. Return success response
    return NextResponse.json({ message: 'PDF text extracted, embedded, and indexed successfully!' });

  } catch (err: any) {
    console.error('Error in API route:', err);
    // Provide a more specific error message if available, otherwise a generic one
    return NextResponse.json({ error: err.message || 'An unknown error occurred during PDF processing.' }, { status: 500 });
  }
}