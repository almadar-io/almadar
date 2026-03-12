import React, { useState, useCallback, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Spinner,
  Badge,
  Card,
  CardContent,
  Input,
} from "@almadar/ui";
import { X } from "lucide-react";
import styles from "./AIChatWidget.module.css";

// ─── Types ────────────────────────────────────────────────────────────────

interface ChatMsg {
  id: string;
  role: "user" | "assistant" | "status" | "error";
  content: string;
  schema?: string;
  threadId?: string;
}

interface SSEEvent {
  type: string;
  data: Record<string, unknown>;
}

// ─── Constants ────────────────────────────────────────────────────────────

const API_BASE = "https://studio.almadar.io/api/agent/deepagent";
const SKILL = "kflow-lean-orbitals";

const SUGGESTIONS = [
  "A todo app with categories and due dates",
  "An e-commerce cart with checkout",
  "A project management board",
];

// ─── SSE Stream Parser ───────────────────────────────────────────────────

async function* parseSSEStream(
  response: Response,
  signal: AbortSignal
): AsyncGenerator<SSEEvent> {
  const reader = response.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (!signal.aborted) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data: ")) continue;
        try {
          yield JSON.parse(trimmed.slice(6));
        } catch {
          // skip malformed events
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

// ─── Chat Widget ─────────────────────────────────────────────────────────

export default function AIChatWidget(): ReactNode {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMsg = useCallback((msg: ChatMsg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const updateLastAssistant = useCallback((content: string) => {
    setMessages((prev) => {
      const copy = [...prev];
      for (let i = copy.length - 1; i >= 0; i--) {
        if (copy[i].role === "assistant") {
          copy[i] = { ...copy[i], content };
          return copy;
        }
      }
      return prev;
    });
  }, []);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      addMsg({ id: `u-${Date.now()}`, role: "user", content: text.trim() });
      setInput("");
      setIsStreaming(true);

      addMsg({
        id: `s-${Date.now()}`,
        role: "status",
        content: translate({ id: "chat.thinking", message: "Generating your application..." }),
      });

      const abort = new AbortController();
      abortRef.current = abort;

      try {
        const res = await fetch(`${API_BASE}/skill/generate-stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            skill: SKILL,
            message: text.trim(),
            noInterrupt: true,
            ...(threadId ? { threadId } : {}),
          }),
          signal: abort.signal,
        });

        if (!res.ok) throw new Error(`Server returned ${res.status}`);

        let assistantText = "";
        let hasAssistantMsg = false;
        let currentThreadId = threadId;
        let schemaJson: string | null = null;

        // Clear status messages before streaming
        setMessages((prev) => prev.filter((m) => m.role !== "status"));

        for await (const event of parseSSEStream(res, abort.signal)) {
          switch (event.type) {
            case "start":
              currentThreadId = event.data.threadId as string;
              setThreadId(currentThreadId);
              break;

            case "message":
              if (event.data.role === "assistant" && event.data.content) {
                assistantText += event.data.content as string;
                if (!hasAssistantMsg) {
                  addMsg({ id: `a-${Date.now()}`, role: "assistant", content: assistantText });
                  hasAssistantMsg = true;
                } else {
                  updateLastAssistant(assistantText);
                }
              }
              break;

            case "tool-call":
              if (event.data.toolName === "write_file" || event.data.toolName === "writeFile") {
                setMessages((prev) => prev.filter((m) => m.role !== "status"));
                addMsg({
                  id: `s-${Date.now()}`,
                  role: "status",
                  content: translate({ id: "chat.writing", message: "Writing .orb schema..." }),
                });
              }
              break;

            case "complete":
              if (event.data.schema) {
                schemaJson = JSON.stringify(event.data.schema, null, 2);
              }
              break;

            case "error":
              addMsg({
                id: `e-${Date.now()}`,
                role: "error",
                content: (event.data.error as string) || "Something went wrong.",
              });
              break;
          }
        }

        // Clean up status messages
        setMessages((prev) => prev.filter((m) => m.role !== "status"));

        if (schemaJson) {
          addMsg({
            id: `schema-${Date.now()}`,
            role: "assistant",
            content: translate({
              id: "chat.schemaReady",
              message: "Your application schema is ready:",
            }),
            schema: schemaJson,
            threadId: currentThreadId ?? undefined,
          });
        } else if (!hasAssistantMsg) {
          addMsg({
            id: `a-${Date.now()}`,
            role: "assistant",
            content: translate({
              id: "chat.done",
              message: "Done! Open Almadar Studio to see your generated application.",
            }),
            threadId: currentThreadId ?? undefined,
          });
        }
      } catch (err: unknown) {
        if ((err as Error).name === "AbortError") return;
        setMessages((prev) => prev.filter((m) => m.role !== "status"));
        addMsg({
          id: `e-${Date.now()}`,
          role: "error",
          content: (err as Error).message || "Failed to connect. Please try again.",
        });
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [isStreaming, threadId, addMsg, updateLastAssistant]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send(input);
      }
    },
    [input, send]
  );

  const handleClose = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    setOpen(false);
  }, []);

  // ─── Closed state: floating button ───────────────────────────────────

  if (!open) {
    return (
      <button
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label={translate({ id: "chat.triggerLabel", message: "Ask AI to build something" })}
        title={translate({ id: "chat.triggerTitle", message: "Build with AI" })}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    );
  }

  // ─── Open state: chat panel ──────────────────────────────────────────

  return (
    <div className={`${styles.panel} ${styles.widgetRoot}`}>
      <Card className="h-full overflow-hidden border border-[#334155]">
        <VStack gap="none" className="h-full">
          {/* Header */}
          <HStack gap="sm" align="center" justify="between" className="p-3 bg-[#1e293b] border-b border-[#334155]">
            <HStack gap="sm" align="center">
              <Box className="w-2 h-2 rounded-full bg-[#14b8a6] shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
              <Typography variant="body2" className="font-bold text-[#f8fafc]">
                <Translate id="chat.title">Almadar AI</Translate>
              </Typography>
              <Badge variant="secondary" className="text-[0.65rem]">Beta</Badge>
            </HStack>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              aria-label="Close"
              className="text-[#64748b] hover:text-[#f8fafc]"
            >
              <X size={16} strokeWidth={2} />
            </Button>
          </HStack>

          {/* Messages */}
          <VStack gap="sm" padding="md" className={styles.messages}>
            {messages.length === 0 && (
              <VStack gap="sm" align="center" className="py-6 text-center">
                <Typography variant="body2" className="font-bold text-[#f8fafc]">
                  <Translate id="chat.welcome.title">
                    Describe the app you want to build
                  </Translate>
                </Typography>
                <Typography variant="caption" className="text-[#94a3b8]">
                  <Translate id="chat.welcome.text">
                    Our AI agent will generate a complete .orb application schema for you.
                  </Translate>
                </Typography>
                <Box className="mt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      className={styles.suggestion}
                      onClick={() => { setInput(s); send(s); }}
                    >
                      {s}
                    </button>
                  ))}
                </Box>
              </VStack>
            )}

            {messages.map((msg) => {
              if (msg.role === "user") {
                return (
                  <Box
                    key={msg.id}
                    padding="sm"
                    rounded="lg"
                    className="self-end max-w-[85%] bg-[rgba(201,162,39,0.12)] border border-[rgba(201,162,39,0.2)] rounded-tr-sm"
                  >
                    <Typography variant="body2" className="text-[#fde68a]">
                      {msg.content}
                    </Typography>
                  </Box>
                );
              }

              if (msg.role === "status") {
                return (
                  <HStack key={msg.id} gap="sm" align="center" className="self-start">
                    <Box className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
                    <Typography variant="caption" className="text-[#64748b] italic">
                      {msg.content}
                    </Typography>
                  </HStack>
                );
              }

              if (msg.role === "error") {
                return (
                  <Box
                    key={msg.id}
                    padding="sm"
                    rounded="md"
                    className="self-start bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.15)]"
                  >
                    <Typography variant="body2" className="text-[#fca5a5]">
                      {msg.content}
                    </Typography>
                  </Box>
                );
              }

              // assistant
              return (
                <VStack key={msg.id} gap="sm" className="self-start max-w-[95%]">
                  <Typography variant="body2" className="text-[#e2e8f0]">
                    {msg.content}
                  </Typography>

                  {msg.schema && (
                    <Box rounded="md" className="overflow-hidden border border-[#334155]">
                      <HStack
                        align="center"
                        justify="between"
                        className="px-3 py-1.5 bg-[#334155]"
                      >
                        <Typography variant="caption" className="text-[#94a3b8] uppercase tracking-wider font-semibold text-[0.7rem]">
                          .orb schema
                        </Typography>
                      </HStack>
                      <Box padding="sm" className="bg-[#0f172a]">
                        <pre className={styles.schemaCode}>
                          {msg.schema.length > 2000
                            ? msg.schema.slice(0, 2000) + "\n..."
                            : msg.schema}
                        </pre>
                      </Box>
                    </Box>
                  )}

                  {msg.threadId && (
                    <a
                      href="https://studio.almadar.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#14b8a6] text-white text-[0.82rem] font-semibold no-underline hover:opacity-90"
                    >
                      <Translate id="chat.openStudio">Open in Studio</Translate>
                      {" \u2192"}
                    </a>
                  )}
                </VStack>
              );
            })}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Input */}
          <HStack
            gap="sm"
            align="end"
            padding="sm"
            className="border-t border-[#334155] bg-[#1e293b]"
          >
            <Box className="flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={translate({
                  id: "chat.placeholder",
                  message: "Describe what you want to build...",
                })}
                disabled={isStreaming}
                className="bg-[#0f172a] border-[#334155] text-[#f8fafc] placeholder:text-[#475569]"
              />
            </Box>
            <Button
              variant="primary"
              size="md"
              onClick={() => send(input)}
              disabled={isStreaming || !input.trim()}
              className="shrink-0"
            >
              {isStreaming ? <Spinner size="sm" /> : (
                <Translate id="chat.send">Send</Translate>
              )}
            </Button>
          </HStack>
        </VStack>
      </Card>
    </div>
  );
}
