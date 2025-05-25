import pdfParse from 'pdf-parse';

/**
 * Extracts text content from a PDF file.
 * @param pdfBuffer The PDF file content as a Buffer.
 * @returns A Promise that resolves to the extracted text.
 * @throws If there's an error during PDF parsing.
 */
export async function extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
  try {
    const result = await pdfParse(pdfBuffer);
    return result.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF.'); // Re-throw a more generic error for the client
  }
}