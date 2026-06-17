import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Globe,
  GraduationCap,
  Image as ImageIcon,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";

import visualLearningImage from "@/assets/visual-learning.jpg";
import { SiteLayout } from "@/components/site-layout";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "EduTalk AI - Smart Sentence & Dialogue Generator for Learners",
      },
      {
        name: "description",
        content:
          "Generate sentences, dialogues, and image-based descriptions for language learning practice.",
      },
      {
        property: "og:title",
        content: "EduTalk AI - Smart Sentence Generation Assistant",
      },
      {
        property: "og:description",
        content:
          "Sentence, dialogue, grammar, and image-description practice for students.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <SiteLayout>
      <Hero />
      <Features />
      <VisualLearning />
      <HowItWorks />
      <UseCases />
      <CTA />
    </SiteLayout>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <header className="pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
            </span>
            {t.heroBadge}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-heading font-extrabold leading-[1.1] mb-5 sm:mb-6 break-words hyphens-auto">
            {t.heroHeadline1} <br />
            <span className="text-brand">{t.heroHeadline2}</span>
          </h1>
          <p className="text-base sm:text-lg text-body max-w-xl mb-8 sm:mb-10 leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/workbench"
              className="bg-heading text-surface px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
            >
              <Wand2 className="size-4 shrink-0" />
              <span className="break-words">{t.heroCta1}</span>
            </Link>
            <a
              href="#features"
              className="bg-surface border border-border px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-heading hover:bg-muted transition-all inline-flex items-center gap-2 text-sm sm:text-base"
            >
              <span className="break-words">{t.heroCta2}</span>
              <ArrowRight className="size-4 shrink-0" />
            </a>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-2 sm:gap-3">
            <Pill color="bg-brand" label={t.heroPill1} />
            <Pill color="bg-accent" label={t.heroPill2} />
            <Pill color="bg-amber-400" label={t.heroPill3} />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-brand/10 via-accent/5 to-transparent rounded-[2rem] blur-2xl" />
          <div className="relative bg-surface rounded-3xl border border-border shadow-elevated p-5 sm:p-8">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="size-3 rounded-full bg-red-400" />
              <div className="size-3 rounded-full bg-amber-400" />
              <div className="size-3 rounded-full bg-emerald-400" />
              <div className="ml-auto text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {t.heroPreviewLabel}
              </div>
            </div>

            <div className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Field label={t.heroFieldNoun} value="Architect" />
                <Field label={t.heroFieldVerb} value="Designing" />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  {t.heroFieldSentence}
                </label>
                <div className="w-full p-4 sm:p-6 bg-brand/5 border border-brand/20 rounded-xl">
                  <p className="text-base sm:text-lg font-medium text-heading leading-snug">
                    The architect{" "}
                    <span className="text-brand underline decoration-brand/30 underline-offset-4 font-semibold">
                      was designing
                    </span>{" "}
                    a sustainable structure when the client arrived.
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-muted rounded-lg">
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <Pill color="bg-accent" label={t.heroGrammarFeedback} />
                  <Pill color="bg-brand" label={t.heroToneNote} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2 min-w-0">
      <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block truncate">
        {label}
      </label>
      <div className="w-full p-3 bg-muted border border-border rounded-lg text-sm text-heading font-medium truncate">
        {value}
      </div>
    </div>
  );
}

function Pill({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 min-w-0">
      <div className={`size-2 rounded-full shrink-0 ${color}`} />
      <span className="text-[12px] font-medium text-body break-words">{label}</span>
    </div>
  );
}

function Features() {
  const { t } = useI18n();
  const items = [
    {
      icon: Brain,
      title: t.feat1Title,
      body: t.feat1Body,
      bg: "bg-indigo-50",
      color: "text-brand",
    },
    {
      icon: ShieldCheck,
      title: t.feat2Title,
      body: t.feat2Body,
      bg: "bg-emerald-50",
      color: "text-accent",
    },
    {
      icon: MessageSquareText,
      title: t.feat3Title,
      body: t.feat3Body,
      bg: "bg-slate-100",
      color: "text-heading",
    },
    {
      icon: ImageIcon,
      title: t.feat4Title,
      body: t.feat4Body,
      bg: "bg-indigo-50",
      color: "text-brand",
    },
    {
      icon: BookOpen,
      title: t.feat5Title,
      body: t.feat5Body,
      bg: "bg-slate-100",
      color: "text-heading",
    },
    {
      icon: Globe,
      title: t.feat6Title,
      body: t.feat6Body,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">
            {t.featCapabilities}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-heading font-bold mt-3 break-words">
            {t.featHeadline}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="p-6 sm:p-8 bg-surface rounded-3xl border border-border hover:border-brand/30 hover:shadow-soft transition-all"
            >
              <div
                className={`size-12 ${it.bg} rounded-2xl flex items-center justify-center mb-5 sm:mb-6`}
              >
                <it.icon className={`size-5 ${it.color}`} strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-heading mb-3 break-words">
                {it.title}
              </h3>
              <p className="text-sm leading-relaxed text-body">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisualLearning() {
  const { t } = useI18n();
  return (
    <section className="bg-surface py-16 sm:py-24 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">
            {t.vlBadge}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-heading font-bold mt-3 mb-4 break-words">
            {t.vlHeadline}
          </h2>
          <p className="text-body">{t.vlSubtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-3">
            <div className="w-full aspect-video bg-muted ring-1 ring-border rounded-3xl relative overflow-hidden">
              <img
                src={visualLearningImage}
                alt="Students using EduTalk AI on a tablet in a classroom"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-heading/10 via-transparent to-heading/20" />
              <div className="absolute left-[18%] bottom-[24%] px-3 py-1.5 bg-surface/95 backdrop-blur shadow-soft rounded-lg text-xs font-bold flex items-center gap-2 text-heading">
                <div className="size-2 rounded-full bg-brand" /> {t.vlStudents}
              </div>
              <div className="absolute right-[10%] top-[16%] px-3 py-1.5 bg-surface/95 backdrop-blur shadow-soft rounded-lg text-xs font-bold flex items-center gap-2 text-heading">
                <div className="size-2 rounded-full bg-accent" /> {t.vlClassroom}
              </div>
              <div className="absolute left-[48%] top-[38%] px-3 py-1.5 bg-surface/95 backdrop-blur shadow-soft rounded-lg text-xs font-bold flex items-center gap-2 text-heading">
                <div className="size-2 rounded-full bg-amber-400" /> {t.vlDevice}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <SentenceOption
              n={1}
              text="Several students are looking at a tablet during a classroom activity."
              tags={["PRESENT CONTINUOUS", "DESCRIPTIVE"]}
              label={t.vlSentenceOption}
            />
            <SentenceOption
              n={2}
              text="The group is using digital learning material to practice sentence formation."
              tags={["PRESENT SIMPLE", "OBSERVATION"]}
              label={t.vlSentenceOption}
            />
            <Link
              to="/workbench"
              search={{ tab: "image" }}
              className="w-full py-4 bg-brand text-brand-foreground rounded-xl font-bold shadow-brand inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Upload className="size-4 shrink-0" /> <span className="break-words">{t.vlUpload}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SentenceOption({
  n,
  text,
  tags,
  label,
}: {
  n: number;
  text: string;
  tags: string[];
  label: string;
}) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-muted border border-border hover:border-brand/30 transition-colors">
      <div className="font-display text-sm font-bold text-brand uppercase tracking-wider mb-2">
        {label} {n}
      </div>
      <p className="text-heading leading-relaxed text-sm sm:text-base">"{text}"</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded bg-surface text-[10px] font-bold border border-border text-heading"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    {
      n: "01",
      title: t.howStep1Title,
      body: t.howStep1Body,
    },
    {
      n: "02",
      title: t.howStep2Title,
      body: t.howStep2Body,
    },
    {
      n: "03",
      title: t.howStep3Title,
      body: t.howStep3Body,
    },
  ];

  return (
    <section id="how" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">
            {t.howBadge}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-heading font-bold mt-3 break-words">
            {t.howHeadline}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative p-6 sm:p-8 bg-surface rounded-3xl border border-border"
            >
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-brand/20 mb-4">
                {s.n}
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-heading mb-3 break-words">
                {s.title}
              </h3>
              <p className="text-sm text-body leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const { t } = useI18n();
  const cases = [
    {
      icon: GraduationCap,
      tag: t.useCase1Tag,
      title: t.useCase1Title,
      body: t.useCase1Body,
    },
    {
      icon: BookOpen,
      tag: t.useCase2Tag,
      title: t.useCase2Title,
      body: t.useCase2Body,
    },
    {
      icon: Sparkles,
      tag: t.useCase3Tag,
      title: t.useCase3Title,
      body: t.useCase3Body,
    },
  ];

  return (
    <section className="bg-surface py-16 sm:py-24 px-4 sm:px-6 border-y border-border">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-8">
        {cases.map((c) => (
          <div key={c.tag} className="space-y-4">
            <div className="size-12 bg-brand-light rounded-2xl grid place-items-center">
              <c.icon className="size-5 text-brand" strokeWidth={2} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand block">
              {c.tag}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-heading leading-tight break-words">
              {c.title}
            </h3>
            <p className="text-body leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  const { t } = useI18n();
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto rounded-3xl bg-heading text-surface p-8 sm:p-12 md:p-16 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 size-64 bg-brand/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 size-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-surface leading-tight max-w-2xl break-words hyphens-auto">
            {t.ctaHeadline}
          </h2>
          <p className="mt-4 max-w-xl text-surface/70 text-sm sm:text-base">{t.ctaSubtitle}</p>
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
            <Link
              to="/workbench"
              className="bg-brand text-brand-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold inline-flex items-center gap-2 shadow-brand text-sm sm:text-base"
            >
              <Wand2 className="size-4 shrink-0" />
              <span>{t.ctaButton}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
