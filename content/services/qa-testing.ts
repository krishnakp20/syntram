import type { ServiceDetail } from "@/types/content";

export const qaTesting: ServiceDetail = {
  slug: "qa-testing",
  title: "QA & Testing",
  shortTitle: "QA & Testing",
  summary:
    "Automated test suites, release quality gates and evaluation pipelines for both conventional software and AI behaviour.",
  icon: "clipboard-check",
  seo: {
    title: "QA, Testing & AI Evaluation Services",
    description:
      "Test automation, API and performance testing, release quality gates and evaluation pipelines for AI and voice agents, by Syntram Technologies.",
  },
  hero: {
    headline: "Quality you can measure — for software and AI",
    intro:
      "We help teams release with confidence through automated testing, clear quality gates and, for AI systems, evaluation pipelines that measure behaviour rather than hoping for the best.",
  },
  problem: {
    title: "Why releases feel risky",
    body: "Without good test coverage, every release is a gamble and bugs are found by customers. AI features add a new problem: their behaviour can change with a prompt tweak or model update, and traditional tests don't catch it.",
    points: [
      "Manual regression testing that slows every release",
      "Bugs reaching production that tests should have caught",
      "Flaky test suites that teams have learned to ignore",
      "No way to tell whether an AI change improved or degraded results",
      "Performance problems discovered only under real load",
    ],
  },
  solution: {
    title: "Our approach to quality",
    body: "We build a testing strategy proportionate to your risk: fast automated checks on every change, deeper tests before release, and continuous evaluation for AI behaviour.",
    points: [
      "Test strategy based on risk, not coverage targets alone",
      "Automated unit, integration and end-to-end tests in CI",
      "API contract and performance testing for critical paths",
      "Evaluation datasets and scoring for LLM and voice agent behaviour",
      "Quality dashboards that make release readiness visible",
    ],
  },
  capabilities: [
    { title: "Test automation", description: "Maintainable automated tests for web, mobile and API layers, running in CI.", icon: "list-checks" },
    { title: "API & integration testing", description: "Contract tests and integration checks that catch breaking changes early.", icon: "plug" },
    { title: "Performance & load testing", description: "Load profiles based on real usage, with bottlenecks identified and fixed.", icon: "timer" },
    { title: "AI evaluation pipelines", description: "Test sets, rubrics and automated scoring for accuracy, safety and tone.", icon: "flask" },
    { title: "Voice agent testing", description: "Simulated calls covering accents, noise, interruptions and edge cases.", icon: "audio-lines" },
    { title: "Accessibility testing", description: "Automated and manual checks against WCAG principles.", icon: "users" },
  ],
  useCases: [
    { title: "Regression automation", description: "Replacing days of manual regression testing with an automated suite that runs on every pull request." },
    { title: "LLM release gate", description: "Every prompt or model change is scored against an evaluation set before it can reach production." },
    { title: "Pre-launch load test", description: "Validating that a new platform handles expected peak traffic before a launch or campaign." },
    { title: "Voice agent QA", description: "Simulated and reviewed test calls to measure task completion and failure modes before go-live." },
  ],
  technology: ["ai", "backend", "frontend", "cloud"],
  faqs: [
    {
      question: "How do you test AI systems whose output varies?",
      answer:
        "We build evaluation sets of realistic inputs with expected outcomes, then score outputs with a mix of programmatic checks, rubric-based grading and human review. The aim is to track quality trends across changes, not to expect identical text every time.",
    },
    {
      question: "Can you add testing to an existing project?",
      answer: "Yes. We usually start with the most business-critical flows, add tests around them, stabilise the pipeline and expand coverage over time.",
    },
    {
      question: "Do you only test software you've built?",
      answer: "No. We can work on your existing products and alongside your development team.",
    },
    {
      question: "Which tools do you use?",
      answer: "We use widely adopted open-source frameworks for unit, end-to-end, API and load testing, chosen to fit your stack so your team can maintain the tests after handover.",
    },
  ],
  related: {
    services: ["ai-development", "voice-ai", "cloud-devops"],
    solutions: ["ai-automation"],
    industries: ["fintech", "healthcare", "ecommerce"],
  },
  cta: {
    title: "Want to release with more confidence?",
    description: "Tell us about your product and release process. We'll recommend where testing will reduce the most risk.",
    primaryLabel: "Talk to Our Team",
  },
};
