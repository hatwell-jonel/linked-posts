import { v4 as uuidv4 } from 'uuid';


export const posts = [
    {
        id: uuidv4(),
        title: "🔨 How to build a library using React 19, Vite, Tsup, and PNPM",
        linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7407791508545888256/",
        description: "This guide details how to scaffold, configure, build, and publish a React 19 component library using TypeScript, Vite, and Tsup.",
        tags: ["react", "typescript", "vite", "tsup", "library"],
        date: "12/19/2025"
    },
    {
        id: uuidv4(),
        title: "🚀 Automating NPM Package Publishing with GitHub Actions",
        linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7409963472979066881/",
        description: "This guide demonstrates how to automate the publishing of an NPM library using GitHub Actions and version-based Git tags. Instead of publishing packages manually, this workflow ensures that every tagged release is automatically built and published to npm in a secure, reliable, and repeatable way.",
        date: "12/25/2025"
    },
    {
        id: uuidv4(),
        title: "🏷️ Mastering Git Tags: Your Version Release Superpower ",
        linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7412308714134614016/",
        description: "Git tags are permanent markers that point to specific commits, making it easy to identify and reference important releases or milestones. They help teams manage versions, document releases, and ensure everyone works with the exact same code state.",
        date: "12/31/2025"
    },
    {
        id: uuidv4(),
        title: "🚀Why I’m a Fan of Monorepos",
        linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7414694505418776576/",
        description: "I’ve been working more with monorepo setups, and the benefits are hard to ignore.A monorepo lets multiple applications and shared packages live in one repository—reducing duplication and keeping everything consistent as projects grow.",
        date: "1/7/2026"
    },
    {
        id: uuidv4(),
        title: "🧩 My Take on Micro Frontends",
        linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7414710699924525056/",
        description: "Micro frontends work because they scale teams, not just code. They allow teams to own specific domains end-to-end, deploy independently, and move faster without blocking others. Ownership becomes clearer, and release cycles become less painful.",
        date: "1/8/2026"
    },
    {
        id: uuidv4(),
        title: "🚀 How to Use Multiple GitHub Accounts on One Machine",
        linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7416118333105737728/",
        description: "Using multiple GitHub accounts on one machine can silently mix up your commit identity if SSH keys and emails aren’t set correctly. This guide shows how to separate work and personal accounts once and for all, so every commit lands exactly where it should.",
        date: "1/11/2026"
    },
    {
        id: uuidv4(),
        title: "🔐 SSH vs HTTPS in GitHub — What’s the Difference and Why It Matters",
        linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7416126957274300416/",
        description: "HTTPS and SSH are two ways GitHub verifies who you are, and choosing the right one can save you from constant login prompts and identity mix-ups. This breakdown helps you understand when to use each so your workflow stays secure, clean, and frustration-free.",
        date: "1/11/2026"
    },
];

// https://trevorfox.com/linkedin-post-date-extractor.html