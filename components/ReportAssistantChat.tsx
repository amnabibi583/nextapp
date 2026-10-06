'use client';
import { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from 'ai';

const storageKey = 'carealert-report-assistant-messages';
export function ReportAssistantChat() {
  const [savedMessages] = useState<UIMessage[]>(() => { try { const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]'); return Array.isArray(value) ? value as UIMessage[] : []; } catch { return []; } });
  const { messages, sendMessage, status, stop } = useChat({ messages: savedMessages });
  const [text, setText] = useState(''); const scrollRef = useRef<HTMLDivElement>(null); const [nearBottom, setNearBottom] = useState(true); const [hasNewBelow, setHasNewBelow] = useState(false); const isBusy = status === 'submitted' || status === 'streaming';
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(messages)); }, [messages]);
  // Scroll only when the user was already near the bottom; otherwise offer a jump button.
  useEffect(() => { const element = scrollRef.current; if (!element) return; if (nearBottom) element.scrollTop = element.scrollHeight; else if (messages.length) { window.setTimeout(() => setHasNewBelow(true), 0); } }, [messages, nearBottom]);
  const onScroll = () => { const element = scrollRef.current; if (!element) return; const close = element.scrollHeight - element.scrollTop - element.clientHeight < 80; setNearBottom(close); if (close) setHasNewBelow(false); };
  const submit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const value = text.trim(); if (!value || isBusy) return; setText(''); sendMessage({ text: value }); };
  const jumpToLatest = () => { const element = scrollRef.current; if (!element) return; element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' }); setNearBottom(true); setHasNewBelow(false); };
  return <div className="assistant-card"><div className="assistant-safety">For report drafting only — not medical advice or emergency services.</div><div className="chat-log" ref={scrollRef} onScroll={onScroll} aria-live="polite">{messages.length === 0 && <div className="chat-empty"><h2>Start with a rough concern</h2><p>Describe what happened in your own words. I can help organize observable details into a clear report.</p></div>}{messages.map((message) => <Message key={message.id} message={message} />)}{status === 'submitted' && <div className="thinking" aria-label="Assistant is thinking"><span /> <span /> <span /></div>}</div>{hasNewBelow && <button className="jump-button" onClick={jumpToLatest}>Jump to latest</button>}<form className="chat-form" onSubmit={submit}><label className="sr-only" htmlFor="report-message">Describe a care concern</label><textarea id="report-message" value={text} onChange={(event) => setText(event.target.value)} placeholder="Describe what happened..." rows={3} disabled={isBusy} /><div className="chat-actions"><span className="helper">Do not include sensitive personal details.</span>{isBusy ? <button type="button" className="stop-button" onClick={stop}>Stop</button> : <button type="submit" className="send-button" disabled={!text.trim()}>Send</button>}</div></form></div>;
}
function Message({ message }: { message: UIMessage }) { return <div className={`message ${message.role}`}><strong>{message.role === 'user' ? 'You' : 'CareAlert Assistant'}</strong><div>{message.parts.map((part, index) => part.type === 'text' ? <p key={`${message.id}-${index}`}>{part.text}</p> : null)}</div></div>; }
