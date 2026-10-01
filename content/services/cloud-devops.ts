import type { ServiceDetail } from "@/types/content";

export const cloudDevops: ServiceDetail = {
  slug: "cloud-devops",
  title: "Cloud & DevOps",
  shortTitle: "Cloud & DevOps",
  summary:
    "Infrastructure as code, CI/CD pipelines, observability and cost-aware cloud architecture you can operate with confidence.",
  icon: "cloud",
  seo: {
    title: "Cloud & DevOps Services",
    description:
      "Cloud architecture, infrastructure as code, CI/CD, containers, observability and cost optimisation on AWS, Google Cloud and Azure by Syntram Technologies.",
  },
  hero: {
    headline: "Cloud infrastructure you can understand, trust and afford",
    intro:
      "We design, automate and operate cloud environments so your team can ship frequently and safely — with infrastructure defined in code, pipelines that catch problems early and monitoring that tells you what's happening.",
  },
  problem: {
    title: "Common infrastructure pain",
    body: "Infrastructure often grows one manual change at a time until nobody is sure how it's configured, deployments are nerve-wracking and the cloud bill keeps surprising people.",
    points: [
      "Manual, undocumented infrastructure that only one person understands",
      "Deployments that require downtime or late-night heroics",
      "Outages discovered by customers rather than monitoring",
      "Cloud costs rising without clear ownership or visibility",
      "Security settings and access that haven't been reviewed",
    ],
  },
  solution: {
    title: "How we approach cloud & DevOps",
    body: "We make infrastructure reproducible, deployments routine and systems observable — and we keep the setup as simple as your workload allows.",
    points: [
      "Infrastructure as code, reviewed and versioned like application code",
      "CI/CD pipelines with automated tests, security checks and safe rollouts",
      "Centralised logging, metrics, tracing and actionable alerts",
      "Least-privilege access, secrets management and backup strategies",
      "Right-sized resources and cost reporting by service or team",
    ],
  },
  capabilities: [
    { title: "Cloud architecture", description: "Well-structured environments on AWS, Google Cloud or Azure, sized for your workload.", icon: "cloud" },
    { title: "Infrastructure as code", description: "Repeatable environments defined in code, with review and change history.", icon: "code" },
    { title: "CI/CD pipelines", description: "Automated build, test and deployment with preview environments and rollbacks.", icon: "git-branch" },
    { title: "Containers & orchestration", description: "Docker-based workloads on managed container platforms or Kubernetes where justified.", icon: "container" },
    { title: "Observability", description: "Logs, metrics, traces, dashboards and alerting tied to user-facing reliability.", icon: "activity" },
    { title: "Security & cost reviews", description: "Access, network and configuration reviews, plus practical cost optimisation.", icon: "shield" },
  ],
  useCases: [
    { title: "Migration to the cloud", description: "Moving applications from on-premise or legacy hosting to a managed cloud setup with minimal disruption." },
    { title: "Deployment automation", description: "Replacing manual releases with pipelines that test, deploy and roll back automatically." },
    { title: "Real-time voice infrastructure", description: "Low-latency, region-aware infrastructure for voice and streaming workloads." },
    { title: "Cost and reliability review", description: "An audit of an existing environment with prioritised fixes for spend, security and uptime." },
  ],
  technology: ["cloud", "backend", "data"],
  faqs: [
    {
      question: "Which cloud providers do you work with?",
      answer: "We work with AWS, Google Cloud and Azure. We'll usually recommend staying with the provider you already use unless there's a strong reason to change.",
    },
    {
      question: "Do we need Kubernetes?",
      answer:
        "Often not. Kubernetes is powerful but adds operational overhead. Many workloads run well on managed container or serverless platforms. We recommend it when scale, portability or workload complexity justify it.",
    },
    {
      question: "Can you manage our infrastructure on an ongoing basis?",
      answer: "Yes. We can provide ongoing operations support, or set things up and hand over to your team with documentation and training.",
    },
    {
      question: "How do you reduce cloud costs?",
      answer:
        "We start by making spend visible by service, then right-size resources, remove idle ones, use appropriate pricing models and fix architectural inefficiencies. Savings vary widely by environment, so we report findings before recommending changes.",
    },
  ],
  related: {
    services: ["api-integration", "qa-testing", "custom-software-development"],
    solutions: ["business-process-automation"],
    industries: ["fintech", "logistics", "ecommerce"],
  },
  cta: {
    title: "Want calmer deployments?",
    description: "Tell us about your current setup. We'll identify the changes that would make the biggest difference to reliability and cost.",
    primaryLabel: "Talk to Our Team",
  },
};
