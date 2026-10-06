export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMCompletionOptions {
  messages: LLMMessage[];
  temperature?: number;
  maxTokens?: number;
}

export async function callLLM(options: LLMCompletionOptions): Promise<string | null> {
  const grokKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  // 1. Grok (xAI) - Fully supported OpenAI-compatible REST endpoint
  if (grokKey) {
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${grokKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "grok-2-latest",
          messages: options.messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 1200,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content?.trim() || null;
      }
    } catch (err) {
      console.error("Grok API call failed, falling back to built-in generator:", err);
    }
  }

  // 2. OpenAI
  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: options.messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 1200,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content?.trim() || null;
      }
    } catch (err) {
      console.error("OpenAI API call failed, falling back to built-in generator:", err);
    }
  }

  // 3. Anthropic
  if (anthropicKey) {
    try {
      const systemMsg = options.messages.find((m) => m.role === "system")?.content || "";
      const userMsgs = options.messages.filter((m) => m.role !== "system");

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          system: systemMsg,
          messages: userMsgs.map((m) => ({ role: m.role, content: m.content })),
          max_tokens: options.maxTokens ?? 1200,
          temperature: options.temperature ?? 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.content?.[0]?.text?.trim() || null;
      }
    } catch (err) {
      console.error("Anthropic API call failed, falling back to built-in generator:", err);
    }
  }

  return null;
}
