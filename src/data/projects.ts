export type ProjectSlug =
  | 'stepsight' | 'analytics' | 'rag' | 'zod'
  | 'simclass' | 'eduparish' | 'bayoul' | 'medicalbill' | 'hsrp';

export type IconKey =
  | 'mri' | 'chart' | 'chat' | 'braces'
  | 'users' | 'book' | 'home' | 'doc' | 'plate';

export interface Project {
  slug: ProjectSlug;
  grad: string;
  icon: IconKey;
  title: string;
  summary: string;
  about: string[];
  features: string[];
  info: { icon: 'calendar' | 'pulse' | 'link'; label: string; href?: string }[];
  tech: { name: string; dot: string }[];
}

export const PROJECTS: Record<ProjectSlug, Project> = {
  stepsight: {
    slug: 'stepsight',
    grad: 'g-amber',
    icon: 'mri',
    title: 'StepSight AI',
    summary: 'Clinical-grade ACL injury risk assessment without expensive hardware.',
    about: [
      'StepSight AI is a dual-portal web platform that combines clinical intake scoring, computer-vision MRI analysis, and phone-camera motion tracking to estimate ACL injury risk.',
      'It targets orthopedic clinics, physical therapists, and athletes who need injury-risk screening without $200–300 wearable sensor kits — using only a browser and a phone camera.',
    ],
    features: ['Clinical Risk Assessment', 'MRI Image Analysis', 'Motion & Biomechanics Tracking', 'Dual Portal System', 'Visual Reporting'],
    info: [{ icon: 'calendar', label: '2024' }, { icon: 'pulse', label: 'Demo, Educational' }, { icon: 'link', label: 'StepSight AI', href: '#' }],
    tech: [{ name: 'Python', dot: '#3776ab' }, { name: 'FastAPI', dot: '#059669' }, { name: 'React', dot: '#61dafb' }, { name: 'TensorFlow', dot: '#ff8f00' }],
  },
  analytics: {
    slug: 'analytics',
    grad: 'g-violet',
    icon: 'chart',
    title: 'Data Analytics Portfolio',
    summary: 'Interactive dashboards and visualizations showcasing data analysis skills, AWS-hosted dashboards and ETL automation.',
    about: [
      'A growing collection of data analytics work — interactive dashboards, visualizations, and automated data pipelines that turn raw datasets into clear, decision-ready insights.',
      'Projects include AWS-hosted analytics dashboards and end-to-end ETL workflows, demonstrating both the analytical and the engineering side of working with data.',
    ],
    features: ['Interactive dashboards and data visualizations', 'AWS-hosted analytics infrastructure', 'Automated ETL workflows for data ingestion and cleaning', 'SQL-driven analysis on real-world datasets'],
    info: [{ icon: 'calendar', label: '2025' }, { icon: 'pulse', label: 'Continuously updated' }, { icon: 'link', label: 'View portfolio', href: '#' }],
    tech: [{ name: 'Python', dot: '#3776ab' }, { name: 'SQL', dot: '#e38c00' }, { name: 'AWS', dot: '#ff9900' }, { name: 'ETL', dot: '#8b5cf6' }],
  },
  rag: {
    slug: 'rag',
    grad: 'g-forest',
    icon: 'chat',
    title: 'RAG Chatbot Architecture',
    summary: 'Retrieval-Augmented Generation chatbot answering questions from custom documents using semantic search and LLMs.',
    about: [
      'A Retrieval-Augmented Generation (RAG) cost-guarded chatbot that turns any uploaded PDF into a queryable knowledge base.',
      'It combines Amazon Titan embeddings with Meta Llama 3 to ground every answer in the source document, while a built-in analytics dashboard tracks retrieval quality and user feedback over time.',
    ],
    features: ['PDF-to-Chat Pipeline', 'Grounded Q&A', 'Hard Cost Guardrails', 'Split-Screen Review UX'],
    info: [{ icon: 'calendar', label: '2024' }, { icon: 'pulse', label: 'Working prototype' }, { icon: 'link', label: 'AWS RAG', href: '#' }],
    tech: [{ name: 'Python', dot: '#3776ab' }, { name: 'FAISS', dot: '#0ea5e9' }, { name: 'Embeddings', dot: '#34d399' }, { name: 'Cloud AI', dot: '#a78bfa' }],
  },
  zod: {
    slug: 'zod',
    grad: 'g-coral',
    icon: 'braces',
    title: 'Zod & JSON Schema Builder',
    summary: 'Build your schema visually and get both JSON Schema and Zod validation code.',
    about: [
      'A visual schema editor: design your data structure by clicking, and get clean, ready-to-use Zod validators and JSON Schema exported side by side.',
      'Built for developers who want correct validation code without hand-writing two parallel schema definitions.',
    ],
    features: ['Visual, click-to-build schema editing', 'Simultaneous JSON Schema and Zod code export', 'Monaco-powered code preview with syntax highlighting'],
    info: [{ icon: 'calendar', label: '2024' }, { icon: 'pulse', label: 'Live' }, { icon: 'link', label: 'Open the builder', href: '#' }],
    tech: [{ name: 'TypeScript', dot: '#3178c6' }, { name: 'Zod', dot: '#274d82' }, { name: 'Monaco', dot: '#e34f9c' }],
  },
  simclass: {
    slug: 'simclass',
    grad: 'g-cyan',
    icon: 'users',
    title: 'Simclass',
    summary: 'Simulate a semester of teaching before you ever step into the classroom.',
    about: [
      'Simclass is a classroom management platform designed to make teaching and learning more efficient. It centralises attendance tracking, student engagement, and course delivery into one clean interface.',
      'Built for educators who want less admin and more time teaching — whether in a traditional classroom or a hybrid environment.',
    ],
    features: ['Multi-Scenario Simulation', 'Agent-Based Student Modeling', 'Automated Cluster Analysis', 'Dynamic Classroom Events'],
    info: [{ icon: 'calendar', label: '2026' }, { icon: 'pulse', label: 'Research paper' }, { icon: 'link', label: 'View project', href: '#' }],
    tech: [
      { name: 'Python', dot: '#3776ab' }, { name: 'TypeScript', dot: '#3178c6' }, { name: 'React 19', dot: '#61dafb' },
      { name: 'Vite', dot: '#646cff' }, { name: 'Tailwind CSS', dot: '#06b6d4' }, { name: 'FastAPI', dot: '#059669' },
      { name: 'Framer Motion', dot: '#ff4d4d' }, { name: 'Vercel', dot: '#000000' },
    ],
  },
  eduparish: {
    slug: 'eduparish',
    grad: 'g-lime',
    icon: 'book',
    title: 'EduParish',
    summary: 'A community-driven education platform connecting parishes with learners through structured programs and resources.',
    about: [
      'EduParish AI is a decision-support platform that scores all 64 Louisiana parishes across need, performance, capacity, and system strength, then simulates three policy interventions to recommend which action yields the greatest projected improvement.',
      'Built for a hackathon, it replaces black-box ML with a fully transparent, hand-verifiable scoring and simulation engine so education stakeholders can trust and audit every recommendation.',
    ],
    features: ['Parish Scoring Engine', 'Context Aware Simulation', 'Ranked Recommendations', 'Interactive Map & Comparison UI'],
    info: [{ icon: 'calendar', label: '2025' }, { icon: 'pulse', label: 'Prototype' }, { icon: 'link', label: 'EduParish', href: 'https://edu-parish.vercel.app/' }],
    tech: [{ name: 'Web App', dot: '#65a30d' }, { name: 'Community', dot: '#a3e635' }, { name: 'Education', dot: '#84cc16' }],
  },
  bayoul: {
    slug: 'bayoul',
    grad: 'g-rose',
    icon: 'home',
    title: 'Bayoul',
    summary: 'A modern platform built to connect communities, streamline local services, and empower neighbourhoods with digital tools.',
    about: [
      'Bayoul is a community-first digital platform designed to bring neighbourhoods together. It provides tools for local service discovery, community announcements, and resident engagement.',
      'The goal is to reduce friction in everyday community interactions — from finding local services to staying informed about what\'s happening nearby.',
    ],
    features: ['Local service discovery and directory', 'Community announcements and event boards', 'Resident profiles and engagement tools', 'Clean, mobile-first interface'],
    info: [{ icon: 'calendar', label: '2026' }, { icon: 'pulse', label: 'In development' }, { icon: 'link', label: 'View project', href: '#' }],
    tech: [{ name: 'React', dot: '#61dafb' }, { name: 'Node.js', dot: '#68a063' }, { name: 'Web App', dot: '#db2777' }],
  },
  medicalbill: {
    slug: 'medicalbill',
    grad: 'g-indigo',
    icon: 'doc',
    title: 'Medical Bill Explainer',
    summary: 'An AI-powered tool that breaks down complex medical bills into plain language, helping patients understand what they owe and why.',
    about: [
      'Medical bills are notoriously confusing. Medical Bill Explainer uses AI to parse itemised bills and translate the jargon into plain, human-readable summaries — line by line.',
      'Patients can upload a bill, get an instant breakdown, and understand exactly what each charge is for, helping them spot errors and make informed decisions.',
    ],
    features: ['AI-powered bill parsing and plain-language translation', 'Line-by-line charge explanation', 'Error and overcharge detection hints', 'Simple upload interface for scanned or PDF bills'],
    info: [{ icon: 'calendar', label: '2026' }, { icon: 'pulse', label: 'In development' }, { icon: 'link', label: 'View project', href: '#' }],
    tech: [{ name: 'Python', dot: '#3776ab' }, { name: 'AI/ML', dot: '#4f46e5' }, { name: 'Healthcare', dot: '#818cf8' }],
  },
  hsrp: {
    slug: 'hsrp',
    grad: 'g-orange',
    icon: 'plate',
    title: 'HSRP',
    summary: 'Simulating enterprise-grade redundancy so a router failure never takes down the LAN.',
    about: [
      'HSRP (High Security Registration Plate) is a government-grade platform for managing the full lifecycle of vehicle plate registrations — from issuance to verification and compliance.',
      'It is built for reliability and auditability, with secure workflows that reduce fraud and streamline the registration process for both citizens and administrators.',
    ],
    features: ['VLAN Segmentation', 'Router-on-a-Stick Routing', 'HSRP Failover', 'CLI-Verified Design'],
    info: [{ icon: 'calendar', label: '2024' }, { icon: 'pulse', label: 'Networking Project' }, { icon: 'link', label: 'View project', href: 'https://github.com/Nytester/hsrp-multi-vlan-network' }],
    tech: [{ name: 'Node.js', dot: '#68a063' }, { name: 'Security', dot: '#ea580c' }, { name: 'Government Tech', dot: '#fb923c' }],
  },
};

export const PROJECT_ORDER: ProjectSlug[] = [
  'stepsight', 'analytics', 'rag', 'zod', 'simclass', 'eduparish', 'bayoul', 'medicalbill', 'hsrp',
];
