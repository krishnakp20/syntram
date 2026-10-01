import type { ProcessStep } from "@/types/content";

/** Default delivery process, shown on service and industry pages unless overridden. */
export const deliveryProcess: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "We map the workflow, users, systems and constraints, and agree on what success looks like before anything is built.",
  },
  {
    title: "Design",
    description:
      "Architecture, data flows, integrations and user experience are designed together — with risks and trade-offs made explicit.",
  },
  {
    title: "Build",
    description:
      "Short iterations with working demos, automated tests and code reviews, so you see progress and can steer it.",
  },
  {
    title: "Launch",
    description:
      "Staged rollout with monitoring, documentation and handover — production readiness is part of the job, not an extra.",
  },
  {
    title: "Improve",
    description:
      "We review real usage, fix what matters, and evolve the system as your needs and the technology change.",
  },
];
