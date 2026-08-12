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

## Project Structure
*   `src/data/cbse_curriculum.ts`: Central source of truth for curriculum data.
*   `src/pages/tools/keyword-optimizer/[slug].astro`: Dynamic route for the optimizer tool.
*   `src/pages/tools/keyword-optimizer/index.astro`: Entry point (redirects to the first concept).
*   `src/styles/global.css`: Tailwind CSS configuration and global styles.

## Technical Standards
*   **Framework:** Astro 4.x
*   **Styling:** Tailwind CSS (Modern syntax)
*   **Language:** TypeScript (Strict mode)
*   **Icons/Aesthetics:** Custom gradients, "Plus Jakarta Sans" typography, and high-contrast dark mode design.
