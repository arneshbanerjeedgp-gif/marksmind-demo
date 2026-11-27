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

### 6. NCERT Answer Evaluator (4 Sandbox Questions + Handwritten Notes Upload)
*   Sandbox question selector (Q1: Mitochondria, Q2: Acceleration, Q3: RAG, Q4: Fractional Distillation)
*   Topic boxes in a single horizontal row (flex, no-wrap, scrollable, compact padding)
*   `Type Script` | `Upload Handwritten` segmented toggle in the `Your Answer Script` card header (`src/components/evaluator/EvaluatorHandwrittenPanel.tsx` + `src/components/shared/HandwrittenUploadZone.tsx`) supporting multi-page image/PDF notebook uploads with drag-and-drop, thumbnails, and zoom lightbox
*   Handwriting-aware CEDA circular loader steps and evaluated handwritten script thumbnail strip in the evaluation panel
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

### 10. Test Generator (Phase 1, 2 & 3 — Hub, Builder, 20-Mark Cell Master Template & Handwritten Upload)
*   Dedicated route `/tools/keyword-optimizer/test-generator` (`src/pages/tools/keyword-optimizer/test-generator.astro`) sharing the Console sidebar shell (`src/components/ConsoleSidebar.astro`).
*   Two-way sidebar navigation between `/tools/keyword-optimizer` (`?tab=<module>`) and `/tools/keyword-optimizer/test-generator`, including identical responsive mobile drawer support.
*   3-Sandbox Hub (`src/components/test-generator/TestGeneratorHub.tsx`) matching `Quiz Generator` and `Flashcard Generator` visual tokens:
    *   **Create New Test:** Interactive 4-sandbox builder (`Class`, `Subject`, `Chapter` dropdowns + enterable `Total Marks` numeric input) with a 7.5-second circular purple progress ring loader leading into the 20-mark NCERT Class 9 *The Fundamental Unit of Life (Cell)* Master Template (`Section A` 5×1M MCQs, `Section B` 3×2M Short Answers, `Section C` 1×3M Structured Answer, `Section D` 1×6M Case Study with 4 sub-parts), Full Answer Sheet multi-page upload banner above Section B, per-question `Type Answer` | `Upload Handwritten` toggles across Q6–Q10(i–iv), and deterministic Submission + NCERT Benchmark Review with zoomable handwritten previews.
    *   **Create Custom Test:** Active purple visual card (`href="#"` hash link, `PDF Upload`, `YouTube Links`, `Custom Sources`).
    *   **Track Progress:** Interactive sandbox opening `TrackProgressView` with KPI cards, Subject Performance bars, subject filter (`All Subjects`, `Physics`, `Chemistry`, `Mathematics`), and 3 organic test progress reports (`src/components/test-generator/progressReportsData.ts`).

## Project Structure
*   `src/data/cbse_curriculum.ts`: Central source of truth for curriculum data.
*   `src/config/constants.ts`: Onboarding questions and diagnostic prompts (includes Chemistry).
*   `src/components/ConsoleSidebar.astro`: Shared Console sidebar component across `/tools/keyword-optimizer` and `/tools/keyword-optimizer/test-generator`.
*   `src/components/shared/HandwrittenUploadZone.tsx`: Shared drag-and-drop handwritten notebook uploader, thumbnail/PDF cards, and click-to-zoom lightbox modal.
*   `src/components/evaluator/EvaluatorHandwrittenPanel.tsx`: Segmented `Type Script` | `Upload Handwritten` switcher and evaluated thumbnail strip for `NCERT Answer Evaluator`.
*   `src/pages/tools/keyword-optimizer/index.astro`: Main application page with the 7 existing console views and inline JS data.
*   `src/pages/tools/keyword-optimizer/test-generator.astro`: Dedicated Test Generator route mounting the shared sidebar and React hub island.
*   `src/components/test-generator/`: Modular Test Generator components (`TestGeneratorHub.tsx`, `CreateNewTestContainer.tsx`, `TestPaperView.tsx`, `TestEvaluationReview.tsx`, `TrackProgressView.tsx`, `curriculumChapters.ts`, `progressReportsData.ts`, `templates/cell20MarkTemplate.ts`).
*   `src/styles/global.css`: Tailwind CSS configuration and global styles.

## Current Phase Plan & Steps (Test Generator Phase 3 — Handwritten Notes Upload)
1.  **Shared Upload Component:** Create `src/components/shared/HandwrittenUploadZone.tsx` supporting image thumbnails, PDF cards, drag-and-drop, inline size/type validation, object URL lifecycle helpers, and a zoom lightbox modal.
2.  **NCERT Answer Evaluator Integration:** Create `src/components/evaluator/EvaluatorHandwrittenPanel.tsx` and integrate it into `src/pages/tools/keyword-optimizer/index.astro` (`Type Script` | `Upload Handwritten` toggle, non-blocking verification with uploaded files, handwriting-aware loader statuses, and evaluated thumbnail strip).
3.  **20-Mark Cell Exam Integration:** Update `TestPaperView.tsx`, `TestEvaluationReview.tsx`, and `CreateNewTestContainer.tsx` with the Full Answer Sheet dropzone above Section B, per-question `Type Answer` | `Upload Handwritten` toggles on Q6–Q10(i–iv), live attempt counting, and review-screen zoomable handwritten previews.
4.  **Build & Verification:** Update `blueprint.md` and run `npm run build` + `npx tsc --noEmit`.

## Technical Standards
*   **Framework:** Astro 4.x
*   **Styling:** Tailwind CSS (Modern syntax)
*   **Language:** TypeScript (Strict mode)
*   **Icons/Aesthetics:** Custom gradients, "Plus Jakarta Sans" typography, and high-contrast dark mode design.
