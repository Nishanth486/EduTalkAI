import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { z } from "zod";
import {
  Image as ImageIcon,
  MessageSquareText,
  Sparkles,
  Upload,
  Wand2,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { SiteNav, SiteFooter } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  generateSentence,
  generateDialogue,
  describeImage,
} from "@/lib/edutalk.functions";
import { useI18n } from "@/lib/i18n";

const searchSchema = z.object({
  tab: z.enum(["sentence", "dialogue", "image"]).optional(),
});

export const Route = createFileRoute("/workbench")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Workbench - EduTalk AI" },
      {
        name: "description",
        content:
          "Generate sentences, dialogues, and image descriptions in the EduTalk AI Workbench.",
      },
    ],
  }),
  component: Workbench,
});

function Workbench() {
  const { tab } = Route.useSearch();
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav />
      <section className="px-6 py-12 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold uppercase tracking-widest mb-4">
              <Sparkles className="size-3" /> {t.wbBadge}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading break-words">
              {t.wbHeadline}
            </h1>
            <p className="mt-3 text-body max-w-2xl text-sm sm:text-base">
              {t.wbSubtitle}
            </p>
          </div>

          <Tabs defaultValue={tab ?? "sentence"} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl min-h-12 h-auto p-1 bg-surface border border-border rounded-xl">
              <TabsTrigger
                value="sentence"
                className="gap-1 sm:gap-2 rounded-lg data-[state=active]:bg-brand data-[state=active]:text-brand-foreground py-2 h-auto text-xs sm:text-sm leading-tight"
              >
                <Wand2 className="size-3 sm:size-4 shrink-0" />
                <span className="break-words text-center leading-tight">{t.wbTabSentence}</span>
              </TabsTrigger>
              <TabsTrigger
                value="dialogue"
                className="gap-1 sm:gap-2 rounded-lg data-[state=active]:bg-brand data-[state=active]:text-brand-foreground py-2 h-auto text-xs sm:text-sm leading-tight"
              >
                <MessageSquareText className="size-3 sm:size-4 shrink-0" />
                <span className="break-words text-center leading-tight">{t.wbTabDialogue}</span>
              </TabsTrigger>
              <TabsTrigger
                value="image"
                className="gap-1 sm:gap-2 rounded-lg data-[state=active]:bg-brand data-[state=active]:text-brand-foreground py-2 h-auto text-xs sm:text-sm leading-tight"
              >
                <ImageIcon className="size-3 sm:size-4 shrink-0" />
                <span className="break-words text-center leading-tight">{t.wbTabImage}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sentence">
              <SentenceModule />
            </TabsContent>
            <TabsContent value="dialogue">
              <DialogueModule />
            </TabsContent>
            <TabsContent value="image">
              <ImageModule />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

/* ============================================================
   SENTENCE
============================================================ */
function SentenceModule() {
  const fn = useServerFn(generateSentence);
  const { t } = useI18n();
  const [noun, setNoun] = useState("");
  const [verb, setVerb] = useState("");
  const [tense, setTense] = useState<
    | "Present Simple"
    | "Present Continuous"
    | "Present Perfect"
    | "Past Simple"
    | "Past Continuous"
    | "Past Perfect"
    | "Future Simple"
    | "Future Continuous"
  >("Past Continuous");
  const [gender, setGender] = useState<"Neutral" | "Masculine" | "Feminine">(
    "Neutral",
  );
  const [topic, setTopic] = useState("");
  const [complexity, setComplexity] = useState<
    "Foundational" | "Intermediate" | "Academic"
  >("Intermediate");

  const [language, setLanguage] =
  useState("English");
  const m = useMutation({
    mutationFn: () =>
      fn({ data: { noun, verb, tense, gender, topic, complexity, language, }, }),
    onError: (e: Error) => toast.error(e.message),
  });
  function speakText(text: string) {

  const speech =
    new SpeechSynthesisUtterance(text);

  const langMap = {
    English: "en-US",
    Tamil: "ta-IN",
  };

  speech.lang =
    langMap[
      language as keyof typeof langMap
    ] || "en-US";

  window.speechSynthesis.cancel();

  window.speechSynthesis.speak(speech);
}

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 bg-surface border border-border rounded-3xl p-6 space-y-5">
        <h2 className="font-display font-bold text-heading">{t.smNoun}</h2>
        <div className="grid grid-cols-2 gap-4">
          <FieldInput
            label={t.smNoun.split("(")[0].trim()}
            value={noun}
            onChange={setNoun}
            placeholder={t.phNoun}
          />
          <FieldInput
            label={t.smVerb.split("(")[0].trim()}
            value={verb}
            onChange={setVerb}
            placeholder={t.phVerb}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              {t.smTense}
            </Label>
            <Select
              value={tense}
              onValueChange={(v) => setTense(v as typeof tense)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {([
                  ["Present Simple", t.tensePresSimple],
                  ["Present Continuous", t.tensePresContinuous],
                  ["Present Perfect", t.tensePresPerf],
                  ["Past Simple", t.tensePastSimple],
                  ["Past Continuous", t.tensePastContinuous],
                  ["Past Perfect", t.tensePastPerf],
                  ["Future Simple", t.tenseFutSimple],
                  ["Future Continuous", t.tenseFutContinuous],
                ] as [string, string][]).map(([val, label]) => (
                  <SelectItem key={val} value={val}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              {t.smGender}
            </Label>
            <Select
              value={gender}
              onValueChange={(v) => setGender(v as typeof gender)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {([
                  ["Neutral", t.genderNeutral],
                  ["Masculine", t.genderMasculine],
                  ["Feminine", t.genderFeminine],
                ] as [string, string][]).map(([val, label]) => (
                  <SelectItem key={val} value={val}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <FieldInput
          label={t.smTopic}
          value={topic}
          onChange={setTopic}
          placeholder={t.phTopic}
        />
        <div className="space-y-3">
          <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.smComplexity}: <span className="text-brand">{complexity === "Foundational" ? t.complexityFoundational : complexity === "Academic" ? t.complexityAcademic : t.complexityIntermediate}</span>
          </Label>
          <Slider
            value={[
              ["Foundational", "Intermediate", "Academic"].indexOf(complexity),
            ]}
            max={2}
            step={1}
            onValueChange={([v]) =>
              setComplexity(
                (["Foundational", "Intermediate", "Academic"] as const)[v],
              )
            }
          />
          <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            <span>{t.complexityFoundational}</span>
            <span>{t.complexityAcademic}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.smLanguage}
          </Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Tamil">Tamil / தமிழ்</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => m.mutate()}
          disabled={
            m.isPending || !noun.trim() || !verb.trim() || !topic.trim()
          }
          className="w-full bg-heading text-surface hover:opacity-90 font-semibold h-12 rounded-xl"
        >
          {m.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Wand2 className="size-4" />
          )}
          {m.isPending ? t.smGenerating : t.smGenerate}
        </Button>
      </div>

      <div className="lg:col-span-3 bg-surface border border-border rounded-3xl p-8 min-h-[400px]">
        {m.isPending && <SkeletonBlock />}
        {!m.data && !m.isPending && (
          <EmptyState
            icon={Wand2}
            title="Your sentence will appear here"
            body="Set the parameters on the left and hit Generate."
          />
        )}
        {m.data && !m.isPending && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Badge color="brand">{tense}</Badge>
                <Badge color="accent">{complexity}</Badge>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {t.smGrammarScore}
                </div>
                <div className="font-display text-3xl font-extrabold text-accent">
                  {m.data.grammarScore}
                </div>
              </div>
            </div>

            <div className="p-6 bg-brand/5 border border-brand/20 rounded-2xl">
              <p className="font-display text-2xl text-heading leading-snug">
                "{highlight(m.data.sentence, m.data.highlightedVerb)}"
              </p>
              <Button
                onClick={() =>
                  speakText(m.data.sentence)
                }
                className="mt-3"
              >
                🔊 Read Aloud
              </Button>
            </div>

            <div className="p-4 bg-muted rounded-xl text-sm">
              <span className="font-bold text-heading">{t.smTone}: </span>
              <span className="text-body">{m.data.tone}</span>
              <p className="text-body mt-2">{m.data.note}</p>
            </div>

            {m.data.alternatives?.length > 0 && (
              <div>
                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  {t.smAlternatives}
                </div>
                <div className="space-y-2">
                  {m.data.alternatives.map((a, i) => (
                    <CopyableLine key={i} text={a} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function highlight(sentence: string, phrase: string) {
  if (!phrase) return sentence;
  const idx = sentence.toLowerCase().indexOf(phrase.toLowerCase());
  if (idx === -1) return sentence;
  return (
    <>
      {sentence.slice(0, idx)}
      <span className="text-brand underline decoration-brand/30 underline-offset-4 font-semibold">
        {sentence.slice(idx, idx + phrase.length)}
      </span>
      {sentence.slice(idx + phrase.length)}
    </>
  );
}

/* ============================================================
   DIALOGUE
============================================================ */
function DialogueModule() {
  const fn = useServerFn(generateDialogue);
  const { t } = useI18n();
  const [topic, setTopic] = useState(
    "",
  );
  const [personaA, setPersonaA] = useState("");
  const [personaB, setPersonaB] = useState("");
  const [turns, setTurns] = useState(6);
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced">(
    "Intermediate",
  );
  const [language, setLanguage] =
  useState("English");
  const m = useMutation({
    mutationFn: () => fn({ data: { topic, personaA, personaB, turns, level, language } }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 bg-surface border border-border rounded-3xl p-6 space-y-5">
        <h2 className="font-display font-bold text-heading">{t.wbTabDialogue}</h2>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.dmTopic}
          </Label>
          <Textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={3}
            maxLength={160}
            placeholder={t.phDialogueTopic}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FieldInput
            label={t.dmPersonaA}
            value={personaA}
            onChange={setPersonaA}
            placeholder={t.phPersonaA}
          />
          <FieldInput
            label={t.dmPersonaB}
            value={personaB}
            onChange={setPersonaB}
            placeholder={t.phPersonaB}
          />
        </div>
        <div className="space-y-3">
          <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.dmTurns}: <span className="text-brand">{turns}</span>
          </Label>
          <Slider
            value={[turns]}
            min={2}
            max={10}
            step={1}
            onValueChange={([v]) => setTurns(v)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.dmLevel}
          </Label>
          <Select
            value={level}
            onValueChange={(v) => setLevel(v as typeof level)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {([
                ["Beginner", t.levelBeginner],
                ["Intermediate", t.levelIntermediate],
                ["Advanced", t.levelAdvanced],
              ] as [string, string][]).map(([val, label]) => (
                <SelectItem key={val} value={val}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{t.dmLanguage}</Label>
          <Select
            value={language}
            onValueChange={setLanguage}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Tamil">Tamil / தமிழ்</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => m.mutate()}
          disabled={m.isPending || !topic.trim()}
          className="w-full bg-heading text-surface hover:opacity-90 font-semibold h-12 rounded-xl"
        >
          {m.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <MessageSquareText className="size-4" />
          )}
          {m.isPending ? t.dmGenerating : t.dmGenerate}
        </Button>
      </div>

      <div className="lg:col-span-3 bg-surface border border-border rounded-3xl p-8 min-h-[400px]">
        {m.isPending && <SkeletonBlock />}
        {!m.data && !m.isPending && (
          <EmptyState
            icon={MessageSquareText}
            title="Your dialogue will appear here"
            body="Describe a topic and pick two personas to start."
          />
        )}
        {m.data && !m.isPending && (
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Dialogue
              </div>
              <h3 className="font-display text-2xl font-bold text-heading">
                {m.data.title}
              </h3>
            </div>
            <div className="space-y-3">
              {m.data.turns.map((t, i) => {
                const isA = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`flex gap-3 ${isA ? "" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`size-9 shrink-0 rounded-full grid place-items-center font-bold text-xs ${isA ? "bg-brand text-brand-foreground" : "bg-accent text-accent-foreground"}`}
                    >
                      {t.speaker.slice(0, 1).toUpperCase()}
                    </div>
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${isA ? "bg-muted text-heading" : "bg-brand/5 border border-brand/20 text-heading"}`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        {t.speaker}
                      </div>
                      <p className="text-sm leading-relaxed">{t.text}</p>
                      <Button
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      speakText(
                        t.text,
                        language
                      )
                    }
                  >
                    🔊
                  </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-xl">
                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  {t.dmGrammarFocus}
                </div>
                <p className="text-sm text-body">{m.data.grammarFocus}</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  {t.dmVocabulary}
                </div>
                <ul className="space-y-1">
                  {m.data.vocabulary.slice(0, 6).map((v, i) => (
                    <li key={i} className="text-sm">
                      <span className="font-semibold text-heading">
                        {v.word}
                      </span>
                      <span className="text-body"> - {v.meaning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   IMAGE
============================================================ */
function ImageModule() {
  const fn = useServerFn(describeImage);
  const { t } = useI18n();
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [tense, setTense] = useState("Present Continuous");
  const fileRef = useRef<HTMLInputElement>(null);
  const [language, setLanguage] =
  useState("English");
  const m = useMutation({
    mutationFn: () => {
      if (!dataUrl) throw new Error("Please upload an image first");
      return fn({ data: { imageDataUrl: dataUrl, tense, language } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function onFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 bg-surface border border-border rounded-3xl p-6 space-y-5">
        <h2 className="font-display font-bold text-heading">{t.wbTabImage}</h2>
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full aspect-video border-2 border-dashed border-border rounded-2xl grid place-items-center bg-muted hover:border-brand transition-colors overflow-hidden"
        >
          {dataUrl ? (
            <img
              src={dataUrl}
              alt="upload"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <Upload className="size-8 text-muted-foreground mx-auto mb-2" />
              <span className="text-sm font-medium text-body">
                {t.imUploadPrompt}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                {t.imUploadSub}
              </p>
            </div>
          )}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        />
        <div className="space-y-2">
          <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.imTense}
          </Label>
          <Select value={tense} onValueChange={setTense}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {([
                ["Present Simple", t.tensePresSimple],
                ["Present Continuous", t.tensePresContinuous],
                ["Past Simple", t.tensePastSimple],
                ["Past Continuous", t.tensePastContinuous],
                ["Future Simple", t.tenseFutSimple],
              ] as [string, string][]).map(([val, label]) => (
                <SelectItem key={val} value={val}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{t.imLanguage}</Label>
          <Select
            value={language}
            onValueChange={setLanguage}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Tamil">Tamil / தமிழ்</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => m.mutate()}
          disabled={m.isPending || !dataUrl}
          className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold h-12 rounded-xl shadow-brand"
        >
          {m.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {m.isPending ? t.imGenerating : t.imGenerate}
        </Button>
      </div>

      <div className="lg:col-span-3 bg-surface border border-border rounded-3xl p-8 min-h-[400px]">
        {m.isPending && <SkeletonBlock />}
        {!m.data && !m.isPending && (
          <EmptyState
            icon={ImageIcon}
            title="Visual analysis output"
            body="Upload an image and EduTalk AI will extract entities, write descriptions, and build a teacher-student dialogue."
          />
        )}
        {m.data && !m.isPending && (
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                {t.imScene}
              </div>
              <p className="text-lg text-heading font-medium">{m.data.scene}</p>
              <Button
                size="sm"
                className="mt-2"
                onClick={() =>
                  speakText(
                    m.data.scene,
                    language
                  )
                }
              >
                🔊 Read Scene
              </Button>
            </div>
            <div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                {t.imObjects}
              </div>
              <div className="flex flex-wrap gap-2">
                {m.data.objects.map((o, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-bold"
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                {t.imSentences}
              </div>
              {m.data.sentences.map((s, i) => (
                <div key={i} className="p-4 bg-muted rounded-xl">
                  <p className="text-heading">{s.text}</p>
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      speakText(
                        s.text,
                        language
                      )
                    }
                  >
                    🔊
                  </Button>
                  <div className="mt-2 flex gap-2">
                    <Badge color="brand">{s.tense}</Badge>
                    <Badge color="accent">{s.style}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                {t.imDialogue}
              </div>
              <div className="space-y-2">
                {m.data.dialogue.map((d, i) => (
                  <div
                    key={i}
                    className="p-3 bg-brand/5 border border-brand/15 rounded-lg text-sm"
                  >
                    <span className="font-bold text-brand">{d.speaker}: </span>
                    <span className="text-heading">{d.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Shared bits
============================================================ */
function FieldInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={120}
      />
    </div>
  );
}

function Badge({
  color,
  children,
}: {
  color: "brand" | "accent";
  children: React.ReactNode;
}) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
        color === "brand"
          ? "bg-brand-light text-brand"
          : "bg-emerald-50 text-accent"
      }`}
    >
      {children}
    </span>
  );
}

function EmptyState({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
}) {
  return (
    <div className="h-full min-h-[300px] grid place-items-center text-center">
      <div className="max-w-sm">
        <div className="size-14 mx-auto rounded-2xl bg-muted grid place-items-center mb-4">
          <Icon className="size-6 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-lg font-bold text-heading mb-2">
          {title}
        </h3>
        <p className="text-sm text-body">{body}</p>
      </div>
    </div>
  );
}

function SkeletonBlock() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 w-1/3 bg-muted rounded" />
      <div className="h-24 bg-muted rounded-2xl" />
      <div className="h-16 bg-muted rounded-xl" />
      <Progress value={66} />
    </div>
  );
}

function CopyableLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="w-full text-left p-3 bg-muted rounded-lg text-sm text-heading hover:bg-muted/70 transition-colors flex items-start gap-3 group"
    >
      <span className="flex-1">{text}</span>
      {copied ? (
        <Check className="size-4 text-accent shrink-0" />
      ) : (
        <Copy className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 shrink-0" />
      )}
    </button>
  );
}

function speakText(
  text: string,
  language: string
) {
  const speech =
    new SpeechSynthesisUtterance(text);

  const langMap = {
    English: "en-US",
    Tamil: "ta-IN",
  };

  speech.lang =
    langMap[
      language as keyof typeof langMap
    ] || "en-US";

  window.speechSynthesis.cancel();

  window.speechSynthesis.speak(speech);
}
