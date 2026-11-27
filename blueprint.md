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

### 10. Test Generator (Phases 1–4 — Hub, Builder, 20-Mark Cell Exam & CEDA OCR Evaluation)
*   Dedicated route `/tools/keyword-optimizer/test-generator` (`src/pages/tools/keyword-optimizer/test-generator.astro`) sharing the Console sidebar shell (`src/components/ConsoleSidebar.astro`).
*   Two-way sidebar navigation between `/tools/keyword-optimizer` (`?tab=<module>`) and `/tools/keyword-optimizer/test-generator`, including identical responsive mobile drawer support.
*   3-Sandbox Hub (`src/components/test-generator/TestGeneratorHub.tsx`) matching `Quiz Generator` and `Flashcard Generator` visual tokens:
    *   **Create New Test:** Interactive 4-sandbox builder (`Class`, `Subject`, `Chapter` dropdowns + enterable `Total Marks` numeric input) with a 7.5-second circular purple progress ring loader leading into the 20-mark NCERT Class 9 *The Fundamental Unit of Life (Cell)* Master Template (`Section A` 5×1M MCQs, `Section B` 3×2M Short Answers, `Section C` 1×3M Structured Answer, `Section D` 1×6M Case Study with 4 sub-parts). Includes a compact top handwritten upload bar (`CompactHandwrittenUploadBar`, `All Sections (A–D)`) with instant thumbnail preview, zoom lightbox, and direct `Evaluate Sheet` CTA triggering the 6-second CEDA OCR loader and `13 / 20` (`65%`) step-marking report (`HandwrittenCedaEvaluationView.tsx`, `cellHandwrittenEvaluation.ts`), alongside interactive on-screen MCQ/typed/per-question submissions (`TestEvaluationReview.tsx`).
    *   **Create Custom Test:** Active purple visual card (`href="#"` hash link, `PDF Upload`, `YouTube Links`, `Custom Sources`).
    *   **Track Progress:** Interactive sandbox opening `TrackProgressView` with KPI cards, Subject Performance bars, subject filter (`All Subjects`, `Physics`, `Chemistry`, `Mathematics`), and 3 organic test progress reports (`src/components/test-generator/progressReportsData.ts`).

## Project Structure
*   `src/data/cbse_curriculum.ts`: Central source of truth for curriculum data.
*   `src/config/constants.ts`: Onboarding questions and diagnostic prompts (includes Chemistry).
*   `src/components/ConsoleSidebar.astro`: Shared Console sidebar component across `/tools/keyword-optimizer` and `/tools/keyword-optimizer/test-generator`.
*   `src/components/shared/HandwrittenUploadZone.tsx`: Shared drag-and-drop handwritten notebook uploader, `CompactHandwrittenUploadBar`, thumbnail/PDF cards, and click-to-zoom lightbox modal.
*   `src/components/evaluator/EvaluatorHandwrittenPanel.tsx`: Segmented `Type Script` | `Upload Handwritten` switcher and evaluated thumbnail strip for `NCERT Answer Evaluator`.
*   `src/pages/tools/keyword-optimizer/index.astro`: Main application page with the 7 existing console views and inline JS data.
*   `src/pages/tools/keyword-optimizer/test-generator.astro`: Dedicated Test Generator route mounting the shared sidebar and React hub island.
*   `src/components/test-generator/`: Modular Test Generator components (`TestGeneratorHub.tsx`, `CreateNewTestContainer.tsx`, `TestPaperView.tsx`, `TestEvaluationReview.tsx`, `HandwrittenCedaEvaluationView.tsx`, `TrackProgressView.tsx`, `curriculumChapters.ts`, `progressReportsData.ts`, `templates/cell20MarkTemplate.ts`, `templates/cellHandwrittenEvaluation.ts`).
*   `src/styles/global.css`: Tailwind CSS configuration and global styles.

## Current Phase Plan & Steps (Test Generator Phase 4 — Compact Top Upload Bar & CEDA OCR Report)
1.  **Compact Top Upload Bar:** Add `CompactHandwrittenUploadBar` to `src/components/shared/HandwrittenUploadZone.tsx` and move the full-sheet upload above Section A in `TestPaperView.tsx` covering `All Sections (A–D)` with thumbnail zoom and `Evaluate Sheet` CTA.
2.  **CEDA OCR Data & Evaluation View:** Create `templates/cellHandwrittenEvaluation.ts` and `HandwrittenCedaEvaluationView.tsx` implementing the verbatim `13 / 20` (`65%`) transcription, section totals (`3/5`, `4/6`, `2/3`, `4/6`), emerald/amber/crimson CEDA chips, and zoomable sheet reference strip.
3.  **6-Second Loader Integration:** Wire `Evaluate Sheet` / `Submit Test Paper` in `CreateNewTestContainer.tsx` to run the 6000ms CEDA OCR loader when a top-bar sheet is attached while preserving normal on-screen submissions.
4.  **Build & Verification:** Update `blueprint.md` and verify `npm run build` and TypeScript checks pass with zero errors.

## Technical Standards
*   **Framework:** Astro 4.x
*   **Styling:** Tailwind CSS (Modern syntax)
*   **Language:** TypeScript (Strict mode)
*   **Icons/Aesthetics:** Custom gradients, "Plus Jakarta Sans" typography, and high-contrast dark mode design.
