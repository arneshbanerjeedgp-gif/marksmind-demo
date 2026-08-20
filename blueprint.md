# Project Blueprint: MarksMind AI

## Overview
MarksMind AI is a professional utility suite for CBSE students, featuring SEO-inspired content optimization tools to align descriptive answers with official NCERT marking schemes. Built with **Astro.js**, it prioritizes performance through a server-first architecture and interactive TypeScript "islands".

## Implemented Features

### 1. CBSE Subjective NCERT Keyword Optimizer
*   **Dynamic Routing:** Utilizes `[slug].astro` to generate optimized analysis pages for various curriculum concepts.
*   **Interactive Analysis:** A client-side TypeScript engine that performs real-time keyword matching against user input.
*   **Visual Feedback:** Dynamic UI updates (opacity transitions, color shifts) to indicate keyword alignment.
*   **Strict Type Safety:** Implementation uses explicit interfaces and strict DOM casting (`HTMLTextAreaElement`, `HTMLButtonElement`, etc.) for robust error prevention.

### 2. CBSE Curriculum Database (`src/data/cbse_curriculum.ts`)
*   **Type-Safe Schema:** Defined via `CurriculumItem` and `Keyword` interfaces.
*   **Class 10 Concepts:** Currently covers 5 high-impact concepts across Science, Physics, Chemistry, Social Science, and Economics.
*   **Keyword Matrix:** Each concept includes mandatory terminology and definitions as per board standards.

### 3. AI Command Center Dashboard
*   Dashboard with stats (Overall Accuracy, Syllabus Mastery, Active Streak)
*   Subject Performance bars (Biology, Physics, Chemistry)
*   AI Priority Action Feed with resolve/revise actions

### 4. Smart Revision Engine
*   Memory health tracking per topic
*   AI-recommended revision intervals
*   Integration with flashcard launcher

### 5. Personal Mistake Database
*   Personal mistakes with frequency tracking and resolution
*   Common student mistakes with subject filtering (Biology, Physics, AI, IKS, Chemistry)
*   Remedial quiz generation from mistake patterns

### 6. NCERT Answer Evaluator (4 Sandbox Questions)
*   Sandbox question selector (Q1: Mitochondria, Q2: Acceleration, Q3: RAG, Q4: Fractional Distillation)
*   Topic boxes in a single horizontal row (flex, no-wrap, scrollable, compact padding)
*   Per-question evaluation with benchmark highlighting (green=matched, red=missing)
*   Per-question scoring (Chemistry: 1.5/3, others: 2/3)
*   Missing keyword analysis

### 7. Quiz Generator (5 Topics)
*   Topic selection: Mitochondria, Acceleration, RAG AI, IKS Sustainability, Fractional Distillation
*   20 MCQ questions per topic
*   Configurable quiz length (5/10/15/20)
*   Full-screen generation simulation with progress animation
*   Interactive answer grading with visual feedback

### 8. Flashcard Generator (5 Topics)
*   Topic selection: Mitochondria, Acceleration, RAG AI, IKS Sustainability, Fractional Distillation
*   20 flashcards per topic (dedicated data for IKS and Chemistry; quiz data fallback for others)
*   Flip-card UI with 3D transform animation
*   Progress bar and Got It / Still Learning grading

### 9. Mind Map Generator (5 Topics)
*   Topic selection: Mitochondria, Acceleration, RAG AI, IKS Sustainability, Fractional Distillation
*   SVG-based interactive mind map with pan and zoom
*   4 branches per topic with 7 leaf nodes each
*   5 color themes (purple, sky, emerald, amber, rose)
*   Animated node rendering with glow filters

## Project Structure
*   `src/data/cbse_curriculum.ts`: Central source of truth for curriculum data.
*   `src/config/constants.ts`: Onboarding questions and diagnostic prompts (includes Chemistry).
*   `src/pages/tools/keyword-optimizer/index.astro`: Main application page with all views and inline JS data.
*   `src/styles/global.css`: Tailwind CSS configuration and global styles.

## Technical Standards
*   **Framework:** Astro 4.x
*   **Styling:** Tailwind CSS (Modern syntax)
*   **Language:** TypeScript (Strict mode)
*   **Icons/Aesthetics:** Custom gradients, "Plus Jakarta Sans" typography, and high-contrast dark mode design.
