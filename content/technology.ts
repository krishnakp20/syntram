import type { IconName } from "@/components/shared/icon";

export interface TechGroup {
  title: string;
  icon: IconName;
  items: string[];
}

/**
 * Technologies Syntram works with. These are tools, not partnerships — do
 * not present any of them as an endorsement or certification.
 * TODO(Syntram): confirm this list matches the team's actual production stack.
 */
export const technologyGroups: TechGroup[] = [
  {
    title: "AI & LLMs",
    icon: "brain",
    items: ["OpenAI API", "Anthropic Claude", "Google Gemini", "Open-weight LLMs", "LangChain", "Vector databases"],
  },
  {
    title: "Voice & Telephony",
    icon: "audio-lines",
    items: ["WebRTC", "SIP", "LiveKit", "Twilio", "Speech-to-text", "Text-to-speech"],
  },
  {
    title: "Frontend & Mobile",
    icon: "code",
    items: ["React", "Next.js", "TypeScript", "React Native", "Flutter", "Tailwind CSS"],
  },
  {
    title: "Backend & APIs",
    icon: "server",
    items: ["Node.js", "Python", "FastAPI", "REST", "GraphQL", "WebSockets"],
  },
  {
    title: "Data",
    icon: "database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "pgvector", "Analytics pipelines"],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "CI/CD"],
  },
];
