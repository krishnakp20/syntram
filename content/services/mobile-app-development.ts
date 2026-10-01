import type { ServiceDetail } from "@/types/content";

export const mobileAppDevelopment: ServiceDetail = {
  slug: "mobile-app-development",
  title: "Mobile App Development",
  shortTitle: "Mobile Apps",
  summary: "iOS and Android apps with clean architecture, offline-aware data and the backend services to support them.",
  icon: "smartphone",
  seo: {
    title: "Mobile App Development — iOS & Android",
    description:
      "Cross-platform and native iOS and Android apps by Syntram Technologies, with secure backends, offline support, push notifications and app store release.",
  },
  hero: {
    headline: "Mobile apps your users keep coming back to",
    intro:
      "We design and build iOS and Android apps — and the backend services behind them — with a focus on reliability, performance on real devices and an experience that fits how people use their phones.",
  },
  problem: {
    title: "Where mobile projects go wrong",
    body: "Mobile apps live on varied devices, unreliable networks and app store rules. Apps that ignore those realities end up with poor reviews, high uninstall rates and expensive rework.",
    points: [
      "Slow, janky screens on mid-range devices",
      "Features that break when connectivity drops",
      "Separate iOS and Android codebases that drift apart",
      "Backends that weren't designed for mobile traffic patterns",
      "Release processes that make every update stressful",
    ],
  },
  solution: {
    title: "How we build mobile apps",
    body: "We choose the right approach for your product — cross-platform for most apps, native where device capabilities demand it — and build the API, auth and notification services alongside the app.",
    points: [
      "Cross-platform frameworks to share code without sacrificing quality",
      "Offline-aware data handling and sync where the use case needs it",
      "Secure authentication and storage of sensitive data on device",
      "Automated builds, testing and staged app store releases",
      "Crash reporting and analytics from the first release",
    ],
  },
  capabilities: [
    { title: "Cross-platform apps", description: "One codebase for iOS and Android using React Native or Flutter.", icon: "smartphone" },
    { title: "Native capabilities", description: "Camera, location, Bluetooth, biometrics and background tasks where required.", icon: "cpu" },
    { title: "Mobile backends & APIs", description: "APIs, authentication, file storage and real-time sync designed for mobile clients.", icon: "server" },
    { title: "Push & in-app messaging", description: "Targeted notifications and messaging that respect user preferences.", icon: "messages" },
    { title: "Voice & AI in apps", description: "In-app voice assistants, smart search and AI features connected to your backend.", icon: "audio-lines" },
    { title: "Release management", description: "CI/CD for mobile, beta programmes, phased rollouts and store compliance.", icon: "git-branch" },
  ],
  useCases: [
    { title: "Field team app", description: "Jobs, checklists, photos and signatures captured on site — even with patchy connectivity — and synced to the office." },
    { title: "Customer app", description: "Booking, ordering, account management and support in one app connected to your existing systems." },
    { title: "Companion app for a SaaS product", description: "Mobile access to the key workflows of a web platform, sharing the same backend and permissions." },
    { title: "Learning or engagement app", description: "Content, progress tracking and reminders that keep users engaged over time." },
  ],
  technology: ["frontend", "backend", "data", "cloud"],
  faqs: [
    {
      question: "Cross-platform or native — which should we choose?",
      answer:
        "For most business apps, a cross-platform framework delivers a high-quality experience on both platforms at lower cost. Native development makes sense for apps that depend heavily on platform-specific features or demanding graphics. We'll recommend based on your requirements.",
    },
    {
      question: "Do you publish apps to the App Store and Google Play?",
      answer: "Yes. We handle build signing, store listings guidance, review requirements and staged rollouts, publishing under your developer accounts.",
    },
    {
      question: "Can you take over an existing app?",
      answer: "Yes. We start with a code and architecture review, stabilise the release process and then plan improvements or new features.",
    },
    {
      question: "How do you keep user data secure on mobile?",
      answer: "We use platform secure storage for credentials and tokens, encrypt sensitive data, avoid storing more than necessary on device and protect APIs with proper authentication and authorisation.",
    },
  ],
  related: {
    services: ["web-development", "api-integration", "qa-testing"],
    solutions: ["business-process-automation"],
    industries: ["logistics", "healthcare", "travel"],
  },
  cta: {
    title: "Thinking about a mobile app?",
    description: "Share your idea or the app you need to improve. We'll help you define a focused first release.",
    primaryLabel: "Discuss Your App",
  },
};
