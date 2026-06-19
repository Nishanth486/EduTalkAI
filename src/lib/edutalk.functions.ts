import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const DEFAULT_GEMINI_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.0-flash",
];

type TextMessage = {
  role: "system" | "user";
  content: string;
};

type ImageMessage = {
  role: "user";
  content: Array<
    | { type: "text"; text: string }
    | { type: "image_url"; image_url: { url: string } }
  >;
};

// ── Round-robin key index (persists per process, resets on restart) ──
let _keyIndex = 0;

async function callGemini(
  model: string,
  key: string,
  payload: Record<string, unknown>,
) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const res = await fetch(`${endpoint}?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    const message = `${model}: ${text.slice(0, 200)}`;
    if (res.status === 429) {
      return { ok: false, rateLimited: true, message };
    }
    return { ok: false, rateLimited: false, message: `AI error: ${message}` };
  }

  const json = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const content = json.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("");

  return { ok: true, rateLimited: false, content };
}

function getApiKeys() {
  return [
    ...(process.env.GEMINI_API_KEY ? [process.env.GEMINI_API_KEY] : []),
    ...(process.env.GEMINI_API_KEYS?.split(",") ?? []),
  ]
    .map((key) => key.trim())
    .filter(Boolean);
}

function getModels() {
  return (process.env.GEMINI_MODELS ?? process.env.GEMINI_MODEL ?? "")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean)
    .concat(DEFAULT_GEMINI_MODELS)
    .filter((model, index, models) => models.indexOf(model) === index);
}

async function callAI({
  messages,
  temperature,
}: {
  messages: Array<TextMessage | ImageMessage>;
  temperature: number;
}) {
  const keys = getApiKeys();
  if (keys.length === 0) {
    throw new Error("No Gemini API keys configured. Set GEMINI_API_KEY or GEMINI_API_KEYS in .env");
  }

  const models = getModels();

  // Build Gemini payload from messages
  // Extract system instruction from first system message if present
  const systemMsg = messages.find((m) => m.role === "system");
  const userMessages = messages.filter((m) => m.role !== "system");

  const contents = userMessages.map((m) => ({
    role: "user" as const,
    parts: toGeminiParts(m),
  }));

  const payload: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature,
    },
  };

  if (systemMsg) {
    payload.systemInstruction = {
      parts: [{ text: typeof systemMsg.content === "string" ? systemMsg.content : "" }],
    };
  }

  // Try each key (round-robin start) × each model until one succeeds
  const startIndex = _keyIndex % keys.length;
  const rotatedKeys = [
    ...keys.slice(startIndex),
    ...keys.slice(0, startIndex),
  ];
  _keyIndex = (_keyIndex + 1) % keys.length;

  const errors: string[] = [];

  for (const key of rotatedKeys) {
    for (const model of models) {
      const result = await callGemini(model, key, payload);
      if (result.ok) {
        return result.content as string;
      }
      errors.push(result.message ?? "unknown error");
      // If rate limited, try next key; if hard error, try next model
      if (!result.rateLimited) continue;
      break; // rate limited on this key → try next key
    }
  }

  throw new Error(`All Gemini API keys/models exhausted. Last errors: ${errors.slice(-3).join(" | ")}`);
}

function toGeminiParts(message: TextMessage | ImageMessage) {
  if (typeof message.content === "string") {
    return [{ text: message.content }];
  }

  return message.content.map((part) => {
    if (part.type === "text") return { text: part.text };

    const image = parseDataImageUrl(part.image_url.url);
    return {
      inline_data: {
        mime_type: image.mimeType,
        data: image.base64,
      },
    };
  });
}

function parseDataImageUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) throw new Error("Invalid image data");
  return {
    mimeType: match[1],
    base64: match[2],
  };
}

function extractJson<T>(content: string): T {
  const match =
    content.match(/```json\s*([\s\S]*?)\s*```/) ??
    content.match(/```\s*([\s\S]*?)\s*```/);
  const raw = match ? match[1] : content;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Invalid AI response");
  return JSON.parse(raw.slice(start, end + 1)) as T;
}

/* ---------- Sentence Generator ---------- */

export const generateSentence = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      noun: z.string().trim().min(1).max(60),
      verb: z.string().trim().min(1).max(60),
      tense: z.enum([
        "Present Simple",
        "Present Continuous",
        "Present Perfect",
        "Past Simple",
        "Past Continuous",
        "Past Perfect",
        "Future Simple",
        "Future Continuous",
      ]),
      gender: z.enum(["Neutral", "Masculine", "Feminine"]),
      topic: z.string().trim().min(1).max(120),
      complexity: z.enum(["Foundational", "Intermediate", "Academic"]),
      language: z.enum(["English", "Tamil"]).default("English"),
    }),
  )
  .handler(async ({ data }) => {
    const sys = `You are EduTalk AI, an educational NLP engine that produces grammatically perfect example sentences for language learners. Always respond with a JSON object only.`;
    const user = `Generate ONE example sentence using the parameters below, then evaluate it.

Parameters:
- Subject (noun): ${data.noun}
- Action (verb): ${data.verb}
- Tense: ${data.tense}
- Gender: ${data.gender}
- Topic: ${data.topic}
- Complexity: ${data.complexity}

Output Language: ${data.language}

Note: The input parameters above may be written in English or Tamil. Understand them regardless of script, then generate ALL output in ${data.language}.

Respond as JSON with this shape:
{
  "sentence": "the generated sentence",
  "highlightedVerb": "the conjugated verb phrase as it appears in sentence",
  "grammarScore": 0-100 integer,
  "tone": "short tone label e.g. Professional / Casual / Academic",
  "note": "one sentence pedagogical note about the structure",
  "alternatives": ["one alternative phrasing", "another alternative phrasing"]
}`;

    const content = await callAI({
      messages: [
        { role: "system", content: sys },
        { role: "user", content: user },
      ],
      temperature: 0.7,
    });
    return extractJson<{
      sentence: string;
      highlightedVerb: string;
      grammarScore: number;
      tone: string;
      note: string;
      alternatives: string[];
    }>(content);
  });

/* ---------- Dialogue Generator ---------- */

export const generateDialogue = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      topic: z.string().trim().min(1).max(160),
      personaA: z.string().trim().min(1).max(60),
      personaB: z.string().trim().min(1).max(60),
      turns: z.number().int().min(2).max(10),
      level: z.enum(["Beginner", "Intermediate", "Advanced"]),
      language: z.enum(["English", "Tamil"]).default("English"),
    }),
  )
  .handler(async ({ data }) => {
    const sys = `You are EduTalk AI, an educational dialogue generator. Produce natural, grammatically correct dialogues suited to the learner's level. Respond with JSON only.`;
    const user = `
Create a ${data.turns}-turn dialogue between
"${data.personaA}" and "${data.personaB}"

Topic:
${data.topic}

Output Language: ${data.language}

Note: The topic and persona names above may be written in English or Tamil. Understand them regardless of script, then generate the ENTIRE dialogue and all vocabulary meanings in ${data.language}.

Return JSON:
{
  "title": "short dialogue title",
  "turns": [
    {
      "speaker": "name",
      "text": "dialogue"
    }
  ],
  "vocabulary": [
    {
      "word":"...",
      "meaning":"..."
    }
  ],
  "grammarFocus":"..."
}
`;

    const content = await callAI({
      messages: [
        { role: "system", content: sys },
        { role: "user", content: user },
      ],
      temperature: 0.8,
    });
    return extractJson<{
      title: string;
      turns: { speaker: string; text: string }[];
      vocabulary: { word: string; meaning: string }[];
      grammarFocus: string;
    }>(content);
  });

/* ---------- Image to Sentence ---------- */

export const describeImage = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      imageDataUrl: z
        .string()
        .min(20)
        .max(8_000_000)
        .refine(
          (s) => s.startsWith("data:image/"),
          "Must be a data: image URL",
        ),
      tense: z.string().trim().min(1).max(40).default("Present Continuous"),
      language: z.enum(["English", "Tamil"]).default("English"),
    }),
  )
  .handler(async ({ data }) => {
    const sys = `You are EduTalk AI's visual semantics module. You analyze images and produce descriptive sentences suitable for language learners. Respond with JSON only.`;
    const userText = `
Look at this image.

Output Language: ${data.language}

Generate EVERYTHING (scene description, objects, sentences, dialogue) in ${data.language}.


Return JSON:
{
  "scene": "one-sentence neutral description of the scene",
  "objects": ["short labels of 4-6 key entities/objects"],
  "sentences": [
    {"text":"sentence 1","tense":"...","style":"Descriptive/Academic/Casual"},
    {"text":"sentence 2","tense":"...","style":"..."},
    {"text":"sentence 3","tense":"...","style":"..."}
  ],
  "dialogue": [
    {"speaker":"Teacher","text":"..."},
    {"speaker":"Student","text":"..."}
  ]
}`;

    const content = await callAI({
      messages: [
        { role: "system", content: sys },
        {
          role: "user",
          content: [
            { type: "text", text: userText },
            { type: "image_url", image_url: { url: data.imageDataUrl } },
          ],
        },
      ],
      temperature: 0.6,
    });
    return extractJson<{
      scene: string;
      objects: string[];
      sentences: { text: string; tense: string; style: string }[];
      dialogue: { speaker: string; text: string }[];
    }>(content);
  });
