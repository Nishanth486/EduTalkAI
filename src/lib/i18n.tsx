import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type UILang = "English" | "Tamil";

// ── All UI string keys ──────────────────────────────────────────────
export interface Translations {
  // Nav
  navWorkbench: string;
  navFeatures: string;
  navHowItWorks: string;
  navTryWorkbench: string;
  // Hero
  heroBadge: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroSubtitle: string;
  heroCta1: string;
  heroCta2: string;
  heroPill1: string;
  heroPill2: string;
  heroPill3: string;
  heroPreviewLabel: string;
  heroFieldNoun: string;
  heroFieldVerb: string;
  heroFieldSentence: string;
  heroGrammarFeedback: string;
  heroToneNote: string;
  // Features section
  featCapabilities: string;
  featHeadline: string;
  feat1Title: string;
  feat1Body: string;
  feat2Title: string;
  feat2Body: string;
  feat3Title: string;
  feat3Body: string;
  feat4Title: string;
  feat4Body: string;
  feat5Title: string;
  feat5Body: string;
  feat6Title: string;
  feat6Body: string;
  // Visual Learning
  vlBadge: string;
  vlHeadline: string;
  vlSubtitle: string;
  vlStudents: string;
  vlClassroom: string;
  vlDevice: string;
  vlSentenceOption: string;
  vlUpload: string;
  // How It Works
  howBadge: string;
  howHeadline: string;
  howStep1Title: string;
  howStep1Body: string;
  howStep2Title: string;
  howStep2Body: string;
  howStep3Title: string;
  howStep3Body: string;
  // Use Cases
  useCase1Tag: string;
  useCase1Title: string;
  useCase1Body: string;
  useCase2Tag: string;
  useCase2Title: string;
  useCase2Body: string;
  useCase3Tag: string;
  useCase3Title: string;
  useCase3Body: string;
  // CTA
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaButton: string;
  // Footer
  footerCopy: string;
  // Workbench general
  wbBadge: string;
  wbHeadline: string;
  wbSubtitle: string;
  wbTabSentence: string;
  wbTabDialogue: string;
  wbTabImage: string;
  // Sentence module
  smNoun: string;
  smVerb: string;
  smTense: string;
  smGender: string;
  smTopic: string;
  smComplexity: string;
  smLanguage: string;
  smGenerate: string;
  smGenerating: string;
  smSpeak: string;
  smCopy: string;
  smCopied: string;
  smGrammarScore: string;
  smTone: string;
  smNote: string;
  smAlternatives: string;
  // Dialogue module
  dmTopic: string;
  dmPersonaA: string;
  dmPersonaB: string;
  dmTurns: string;
  dmLevel: string;
  dmLanguage: string;
  dmGenerate: string;
  dmGenerating: string;
  dmVocabulary: string;
  dmGrammarFocus: string;
  dmSpeak: string;
  // Image module
  imUploadPrompt: string;
  imUploadSub: string;
  imTense: string;
  imLanguage: string;
  imGenerate: string;
  imGenerating: string;
  imScene: string;
  imObjects: string;
  imSentences: string;
  imDialogue: string;
  imSpeak: string;
  imCopy: string;
  imCopied: string;
  // Language toggle
  langToggleLabel: string;
}

// ── English strings ─────────────────────────────────────────────────
const en: Translations = {
  navWorkbench: "Workbench",
  navFeatures: "Features",
  navHowItWorks: "How it works",
  navTryWorkbench: "Try Workbench",
  heroBadge: "AI-Powered Language Learning",
  heroHeadline1: "Form Sentences",
  heroHeadline2: "With Confidence.",
  heroSubtitle:
    "EduTalk AI helps students practice sentence formation, dialogue writing, grammar understanding, and image-based descriptions.",
  heroCta1: "Try the Generator",
  heroCta2: "Explore Features",
  heroPill1: "Sentence practice",
  heroPill2: "Dialogue practice",
  heroPill3: "Image descriptions",
  heroPreviewLabel: "Workbench Preview",
  heroFieldNoun: "Subject (Noun)",
  heroFieldVerb: "Action (Verb)",
  heroFieldSentence: "Generated Sentence",
  heroGrammarFeedback: "Grammar feedback",
  heroToneNote: "Tone note",
  featCapabilities: "Capabilities",
  featHeadline: "A focused language practice tool for students.",
  feat1Title: "Sentence Generation",
  feat1Body:
    "Enter a noun, verb, tense, gender, and topic to generate a practice sentence.",
  feat2Title: "Grammar Feedback",
  feat2Body:
    "Review a grammar score, tone label, and a short note explaining the output.",
  feat3Title: "Dialogue Practice",
  feat3Body:
    "Generate a conversation between two roles for a selected topic and learner level.",
  feat4Title: "Image to Sentence",
  feat4Body:
    "Upload an image to generate descriptive sentences, detected objects, and a short dialogue.",
  feat5Title: "Vocabulary Notes",
  feat5Body:
    "Use vocabulary and short explanations from generated content to support communication practice.",
  feat6Title: "Dual Language Support",
  feat6Body:
    "Generate sentences and dialogues in your chosen language and use the built-in speech tool to hear correct pronunciation.",
  vlBadge: "Image-Based Learning",
  vlHeadline: "Turn an image into sentence practice.",
  vlSubtitle:
    "Upload a photo or illustration and generate learner-friendly descriptions, key objects, and a short dialogue.",
  vlStudents: "Students",
  vlClassroom: "Classroom",
  vlDevice: "Device",
  vlSentenceOption: "Sentence Option",
  vlUpload: "Upload Your Image",
  howBadge: "How it works",
  howHeadline: "From input to practice in three steps.",
  howStep1Title: "Set the input",
  howStep1Body:
    "Choose sentence parameters, enter a dialogue topic, or upload an image.",
  howStep2Title: "Generate output",
  howStep2Body:
    "The app creates a sentence, dialogue, or image description from your input.",
  howStep3Title: "Review and practice",
  howStep3Body:
    "Use grammar notes, vocabulary, and alternatives to improve sentence formation.",
  useCase1Tag: "For Students",
  useCase1Title: "Practice sentence formation",
  useCase1Body:
    "Create examples from simple inputs and compare different ways to express an idea.",
  useCase2Tag: "For Educators",
  useCase2Title: "Prepare classroom prompts",
  useCase2Body:
    "Generate sentence examples, dialogue prompts, and image-based writing activities.",
  useCase3Tag: "For Classrooms",
  useCase3Title: "Support interactive activities",
  useCase3Body:
    "Use the workbench during language practice, group work, or communication exercises.",
  ctaHeadline: "Start practicing better sentences today.",
  ctaSubtitle:
    "Completely free to use. Open the Workbench and try the sentence, dialogue, and image-to-sentence tools.",
  ctaButton: "Open the Workbench",
  footerCopy: "Language learning practice tool.",
  wbBadge: "Workbench",
  wbHeadline: "Generate. Analyze. Learn.",
  wbSubtitle:
    "Three intelligent modules powered by EduTalk's NLP engine. Switch tabs to compose sentences, build dialogues, or describe images.",
  wbTabSentence: "Sentence",
  wbTabDialogue: "Dialogue",
  wbTabImage: "Image",
  smNoun: "Subject (Noun)",
  smVerb: "Action (Verb)",
  smTense: "Tense",
  smGender: "Gender",
  smTopic: "Topic",
  smComplexity: "Complexity",
  smLanguage: "Output Language",
  smGenerate: "Generate Sentence",
  smGenerating: "Generating…",
  smSpeak: "Speak",
  smCopy: "Copy",
  smCopied: "Copied",
  smGrammarScore: "Grammar Score",
  smTone: "Tone",
  smNote: "Pedagogical Note",
  smAlternatives: "Alternatives",
  dmTopic: "Topic",
  dmPersonaA: "Speaker A",
  dmPersonaB: "Speaker B",
  dmTurns: "Turns",
  dmLevel: "Level",
  dmLanguage: "Output Language",
  dmGenerate: "Generate Dialogue",
  dmGenerating: "Generating…",
  dmVocabulary: "Vocabulary",
  dmGrammarFocus: "Grammar Focus",
  dmSpeak: "Speak",
  imUploadPrompt: "Click or drag an image here",
  imUploadSub: "PNG, JPG, WEBP — max 5 MB",
  imTense: "Tense",
  imLanguage: "Output Language",
  imGenerate: "Describe Image",
  imGenerating: "Analyzing…",
  imScene: "Scene",
  imObjects: "Objects",
  imSentences: "Sentences",
  imDialogue: "Dialogue",
  imSpeak: "Speak",
  imCopy: "Copy",
  imCopied: "Copied",
  langToggleLabel: "தமிழ்",
};

// ── Tamil strings ────────────────────────────────────────────────────
const ta: Translations = {
  navWorkbench: "பணிமேடை",
  navFeatures: "அம்சங்கள்",
  navHowItWorks: "எவ்வாறு செயல்படுகிறது",
  navTryWorkbench: "பணிமேடையை முயற்சிக்கவும்",
  heroBadge: "AI-இயக்கப்பட்ட மொழி கற்றல்",
  heroHeadline1: "வாக்கியங்களை உருவாக்குங்கள்",
  heroHeadline2: "நம்பிக்கையுடன்.",
  heroSubtitle:
    "EduTalk AI மாணவர்களுக்கு வாக்கிய அமைப்பு, உரையாடல் எழுத்து, இலக்கண புரிதல் மற்றும் படம் சார்ந்த விளக்கங்களை பயிற்சி செய்ய உதவுகிறது.",
  heroCta1: "வாக்கிய உருவாக்கியை முயற்சிக்கவும்",
  heroCta2: "அம்சங்களை ஆராயுங்கள்",
  heroPill1: "வாக்கிய பயிற்சி",
  heroPill2: "உரையாடல் பயிற்சி",
  heroPill3: "படம் விளக்கங்கள்",
  heroPreviewLabel: "பணிமேடை முன்னோட்டம்",
  heroFieldNoun: "பொருள் (பெயர்ச்சொல்)",
  heroFieldVerb: "செயல் (வினைச்சொல்)",
  heroFieldSentence: "உருவாக்கப்பட்ட வாக்கியம்",
  heroGrammarFeedback: "இலக்கண கருத்து",
  heroToneNote: "தொனி குறிப்பு",
  featCapabilities: "திறன்கள்",
  featHeadline: "மாணவர்களுக்கான மொழி பயிற்சி கருவி.",
  feat1Title: "வாக்கிய உருவாக்கம்",
  feat1Body:
    "பெயர்ச்சொல், வினைச்சொல், காலம், பால் மற்றும் தலைப்பை உள்ளிட்டு பயிற்சி வாக்கியம் உருவாக்கவும்.",
  feat2Title: "இலக்கண கருத்து",
  feat2Body:
    "இலக்கண மதிப்பெண், தொனி மற்றும் வெளியீட்டை விளக்கும் குறிப்பை பார்க்கவும்.",
  feat3Title: "உரையாடல் பயிற்சி",
  feat3Body:
    "தேர்ந்த தலைப்பு மற்றும் கற்றல் நிலைக்கு இரண்டு பாத்திரங்களுக்கு இடையே உரையாடல் உருவாக்கவும்.",
  feat4Title: "படத்திலிருந்து வாக்கியம்",
  feat4Body:
    "படத்தை பதிவேற்றி விளக்க வாக்கியங்கள், கண்டறிந்த பொருட்கள் மற்றும் குறுகிய உரையாடல் உருவாக்கவும்.",
  feat5Title: "சொல்லகராதி குறிப்புகள்",
  feat5Body:
    "தொடர்பு பயிற்சியை ஆதரிக்க உருவாக்கப்பட்ட உள்ளடக்கத்திலிருந்து சொல்லகராதி பயன்படுத்தவும்.",
  feat6Title: "இரு மொழி ஆதரவு",
  feat6Body:
    "தேர்ந்த மொழியில் வாக்கியங்கள் மற்றும் உரையாடல்களை உருவாக்கி, சரியான உச்சரிப்பை கேட்க உள்ளமைந்த பேச்சு கருவியைப் பயன்படுத்தவும்.",
  vlBadge: "படம் சார்ந்த கற்றல்",
  vlHeadline: "படத்தை வாக்கிய பயிற்சியாக மாற்றுங்கள்.",
  vlSubtitle:
    "ஒரு புகைப்படம் அல்லது படத்தை பதிவேற்றி கற்பவருக்கு ஏற்ற விளக்கங்கள், முக்கிய பொருட்கள் மற்றும் குறுகிய உரையாடல் உருவாக்கவும்.",
  vlStudents: "மாணவர்கள்",
  vlClassroom: "வகுப்பறை",
  vlDevice: "சாதனம்",
  vlSentenceOption: "வாக்கிய விருப்பம்",
  vlUpload: "உங்கள் படத்தை பதிவேற்றவும்",
  howBadge: "எவ்வாறு செயல்படுகிறது",
  howHeadline: "உள்ளீட்டிலிருந்து பயிற்சிக்கு மூன்று படிகளில்.",
  howStep1Title: "உள்ளீட்டை அமைக்கவும்",
  howStep1Body:
    "வாக்கிய அளவுருக்களை தேர்ந்தெடுக்கவும், உரையாடல் தலைப்பை உள்ளிடவும் அல்லது படத்தை பதிவேற்றவும்.",
  howStep2Title: "வெளியீட்டை உருவாக்கவும்",
  howStep2Body:
    "பயன்பாடு உங்கள் உள்ளீட்டிலிருந்து வாக்கியம், உரையாடல் அல்லது படம் விளக்கம் உருவாக்குகிறது.",
  howStep3Title: "மதிப்பாய்வு செய்து பயிற்சி செய்யுங்கள்",
  howStep3Body:
    "வாக்கிய அமைப்பை மேம்படுத்த இலக்கண குறிப்புகள், சொல்லகராதி மற்றும் மாற்று வழிகளை பயன்படுத்தவும்.",
  useCase1Tag: "மாணவர்களுக்கு",
  useCase1Title: "வாக்கிய அமைப்பை பயிற்சி செய்யுங்கள்",
  useCase1Body:
    "எளிய உள்ளீடுகளிலிருந்து எடுத்துக்காட்டுகளை உருவாக்கி ஒரு யோசனையை வெளிப்படுத்த வெவ்வேறு வழிகளை ஒப்பிட்டு பாருங்கள்.",
  useCase2Tag: "ஆசிரியர்களுக்கு",
  useCase2Title: "வகுப்பறை தூண்டுதல்களை தயார் செய்யுங்கள்",
  useCase2Body:
    "வாக்கிய எடுத்துக்காட்டுகள், உரையாடல் தூண்டுதல்கள் மற்றும் படம் சார்ந்த எழுத்து செயல்பாடுகளை உருவாக்கவும்.",
  useCase3Tag: "வகுப்பறைகளுக்கு",
  useCase3Title: "ஊடாடும் செயல்பாடுகளை ஆதரிக்கவும்",
  useCase3Body:
    "மொழி பயிற்சி, குழு வேலை அல்லது தொடர்பு பயிற்சியின் போது பணிமேடையை பயன்படுத்தவும்.",
  ctaHeadline: "இன்றே சிறந்த வாக்கியங்களை பயிற்சி செய்யத் தொடங்குங்கள்.",
  ctaSubtitle:
    "முற்றிலும் இலவசம். பணிமேடையை திறந்து வாக்கியம், உரையாடல் மற்றும் படம்-வாக்கியம் கருவிகளை முயற்சிக்கவும்.",
  ctaButton: "பணிமேடையை திறக்கவும்",
  footerCopy: "மொழி கற்றல் பயிற்சி கருவி.",
  wbBadge: "பணிமேடை",
  wbHeadline: "உருவாக்கு. பகுப்பாய்வு செய். கற்று.",
  wbSubtitle:
    "EduTalk's NLP இயந்திரத்தால் இயக்கப்படும் மூன்று புத்திசாலி தொகுதிகள். வாக்கியங்களை இயற்ற, உரையாடல்களை கட்டமைக்க அல்லது படங்களை விவரிக்க தாவல்களை மாற்றவும்.",
  wbTabSentence: "வாக்கியம்",
  wbTabDialogue: "உரையாடல்",
  wbTabImage: "படம்",
  smNoun: "பொருள் (பெயர்ச்சொல்)",
  smVerb: "செயல் (வினைச்சொல்)",
  smTense: "காலம்",
  smGender: "பால்",
  smTopic: "தலைப்பு",
  smComplexity: "சிக்கலான நிலை",
  smLanguage: "வெளியீட்டு மொழி",
  smGenerate: "வாக்கியம் உருவாக்கு",
  smGenerating: "உருவாக்குகிறது…",
  smSpeak: "பேசு",
  smCopy: "நகலெடு",
  smCopied: "நகலெடுக்கப்பட்டது",
  smGrammarScore: "இலக்கண மதிப்பெண்",
  smTone: "தொனி",
  smNote: "கற்பித்தல் குறிப்பு",
  smAlternatives: "மாற்று வழிகள்",
  dmTopic: "தலைப்பு",
  dmPersonaA: "பேச்சாளர் அ",
  dmPersonaB: "பேச்சாளர் ஆ",
  dmTurns: "திரும்புதல்கள்",
  dmLevel: "நிலை",
  dmLanguage: "வெளியீட்டு மொழி",
  dmGenerate: "உரையாடல் உருவாக்கு",
  dmGenerating: "உருவாக்குகிறது…",
  dmVocabulary: "சொல்லகராதி",
  dmGrammarFocus: "இலக்கண கவனம்",
  dmSpeak: "பேசு",
  imUploadPrompt: "படத்தை இங்கே கிளிக் செய்யவும் அல்லது இழுக்கவும்",
  imUploadSub: "PNG, JPG, WEBP — அதிகபட்சம் 5 MB",
  imTense: "காலம்",
  imLanguage: "வெளியீட்டு மொழி",
  imGenerate: "படத்தை விவரி",
  imGenerating: "பகுப்பாய்வு செய்கிறது…",
  imScene: "காட்சி",
  imObjects: "பொருட்கள்",
  imSentences: "வாக்கியங்கள்",
  imDialogue: "உரையாடல்",
  imSpeak: "பேசு",
  imCopy: "நகலெடு",
  imCopied: "நகலெடுக்கப்பட்டது",
  langToggleLabel: "English",
};

// ── Context ──────────────────────────────────────────────────────────
interface I18nCtx {
  uiLang: UILang;
  t: Translations;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [uiLang, setUiLang] = useState<UILang>("English");

  const toggleLang = useCallback(() => {
    setUiLang((prev) => (prev === "English" ? "Tamil" : "English"));
  }, []);

  const t = uiLang === "English" ? en : ta;

  return (
    <I18nContext.Provider value={{ uiLang, t, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
