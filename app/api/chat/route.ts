import { convertToModelMessages, streamText } from 'ai';
import { reportAssistantMaxOutputTokens, reportAssistantModel, reportAssistantSystem } from '../../../lib/ai-config';

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object' || !Array.isArray((body as { messages?: unknown }).messages)) return Response.json({ error: 'A messages array is required.' }, { status: 400 });
    const messages = (body as { messages: unknown[] }).messages;
    if (messages.length > 40) return Response.json({ error: 'Conversation is too long. Start a new report.' }, { status: 400 });
    const result = streamText({ model: reportAssistantModel, system: reportAssistantSystem, messages: await convertToModelMessages(messages as Parameters<typeof convertToModelMessages>[0]), maxOutputTokens: reportAssistantMaxOutputTokens });
    return result.toUIMessageStreamResponse();
  } catch { return Response.json({ error: 'Unable to start the report assistant. Please try again.' }, { status: 400 }); }
}
