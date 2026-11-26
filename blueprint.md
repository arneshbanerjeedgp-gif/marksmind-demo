# Project Blueprint: MarksMind AI

## 1. Overview & Core Mission
**MarksMind AI** is a specialized academic diagnostic, evaluation, and revision platform built specifically for Indian curriculum (CBSE/NCERT) students (Classes 8–12). Its core motto is **"Grade the science, not the grammar"**—ending the subjective grading black box by stripping away grammatical, syntactical, and language-mixing biases and evaluating pure conceptual accuracy against official NCERT board rubrics.

### Core Value Propositions:
* **CEDA Protocol (Concept Extraction & Defect Analysis):** Proprietary heuristic/NLP framework that analyzes natural student phrasing (including Hinglish and English + Bengali code-mixing), extracts underlying scientific principles, and matches them to official NCERT marking benchmarks without deducting marks for language style.
* **Micro-Diagnostic Step Marking:** Evaluates student answers with granular feedback: pinpointing awarded marks for verified concepts (`+Marks`) vs. deductions for missing keywords, formulas, or apparatus specifications (`-Marks`).
* **Predictive Memory Decay Engine:** Monitors student retention on high-yield topics, calculates forgetting curve risks, and proactively schedules high-impact micro-revisions.
* **Dual Mistake Architecture:** Bridges individual student recurring pitfalls (Personal Mistake Database) with cohort-wide statistical data across thousands of students (Common Student Mistakes).
* **Multi-Modal Interactive Study Suite:** Dynamic quiz generator with distractor analysis, 3D flip-card flashcard system, and interactive radial mind mapping with pan-and-zoom exploration.

---

## 2. Comprehensive System Architecture & Technical Stack

### Runtime & Infrastructure
* **Framework:** Astro 4.11.5 (configured in static build mode with React island hydration).
* **UI & Islands:** React 18.3.1 (`@astrojs/react`), Framer Motion 11.2.10 (fluid animations, 3D tilt hero, persona transitions), Lucide Icons (`lucide-astro`, `lucide-react`).
* **Styling & Design Tokens:** Tailwind CSS 3.4.6 (`@astrojs/tailwind`), `@fontsource/plus-jakarta-sans`.
  * **Color Palette:** Obsidian Dark (`#0b0b0c`, `#0e0e10`, `#121212`), Surface Cards (`#161618`, `#1c1c1c`), Accent Purples (`#8b5cf6`, `#7c3aed`, `#a78bfa`), Semantic Accents (Emerald `#10b981`, Amber `#f59e0b`, Crimson `#ef4444`, Sky `#0ea5e9`, Rose `#f43f5e`).
* **Data & AI Backend:**
  * Supabase Client (`@supabase/supabase-js` 2.49.4) for user authentication (OAuth & Email/Password).
  * FastAPI on Render (`https://marksmind-api.onrender.com/score`) for backend AI rubric evaluation.
  * Google GenAI SDK (`@google/genai` 2.11.0) & PostgreSQL (`pg` 8.22.0) pre-installed in `package.json`.
* **Developer Environment:** Firebase Studio / Project IDX configuration defined in `.idx/dev.nix` (Node.js 22, Astro VSCode extension, automated port forwarding).

---

## 3. Detailed Inventory of Existing Features & Implementation State

### A. Marketing & Landing Experience (`/` - `src/pages/index.astro`)
* **GlassNav (`GlassNav.tsx`):** Fixed glassmorphism header with MarksMind AI branding and direct navigation to Login/Signup.
* **GodModeHero (`GodModeHero.tsx`):** Interactive 3D perspective tilt card tracking cursor coordinates. Demonstrates real-time grammar stripping (`Evaporate`, `Condense`) and defect tagging (`Missing: Fractionating Column`, `-1 MARK`).
* **TrustMarquee (`TrustMarquee.tsx`):** Continuous marquee highlighting 100% NCERT alignment, zero grammar bias, and micro-diagnostics.
* **TheProblem & TheSolution (`TheProblem.tsx`, `TheSolution.tsx`):** Before-and-after comparison showing arbitrary traditional grading (`4/10: Poor grammar!`) transformed into MarksMind's objective concept breakdown.
* **Feature Deep-Dives (`FeatureCeda.tsx`, `FeatureMemory.tsx`, `FeatureMistakes.tsx`):** Interactive visualization cards showcasing CEDA extraction, circular SVG memory decay risk gauge (85%), and recurring mistake tags across subjects.
* **Live Sandbox (`SubjectSandbox.tsx`):** Interactive tab switcher across Physics, Chemistry, Biology, and Computer Science displaying real-time topic mastery and missing keywords.
* **Manifesto & Persona Split (`Manifesto.tsx`, `PersonaSplit.tsx`):** High-impact typography contrasting *"For the Hustler"* (concept-strong, language-struggling) and *"For the Top 1%"* (perfectionists targeting board rank).
* **BottomCTA & Footer (`BottomCTA.tsx`, `Footer.astro`):** Conversion section leading to onboarding/signup.

### B. Authentication Suite (`/login` - `src/pages/login.astro`)
* **Dual-View Auth Card (`AuthForm.astro`):** Dynamic client-side toggling between Sign-Up and Sign-In views via URL query parameter (`?mode=signin` vs `?mode=signup`).
* **Google OAuth:** Integrated via Supabase client, redirecting to `/tools/keyword-optimizer`.
* **Email & Password Authentication:** Client-side Supabase `signUp` with animated modal feedback and `signInWithPassword` with instant redirect.

### C. 13-Step PLG Diagnostic Onboarding (`/onboarding` - `src/pages/onboarding.astro`)
* **Step 1–8: Comprehensive Student Profiling:**
  * Class level (Classes 8 through 12).
  * Student Name (with input shake validation).
  * Answer Language / Code-mixing pattern (English Only, English + Bengali, English + Hindi).
  * Tuition structure (School Only, Local Tutor, Coaching + School, Self-study).
  * Acquisition channel (Google, YouTube, Peer recommendation, etc.).
  * Upcoming exam timeline urgency (Tomorrow, This Week, Next Week, Later).
  * Weakest subject selector (English, Maths, Science, Social Science, Chemistry).
  * Target score goal (70%, 80%, 90%, Above 95%).
* **Step 9: Typewriter Cinematic Sequence:** Dynamic multi-line personalized narrative acknowledging student name and target score.
* **Step 10: Tailored Diagnostic Prompt:** Dynamically pulls prompt for the selected weak subject from `DIAGNOSTIC_PROMPTS` in `constants.ts`.
* **Step 11: Multi-ring Pulse Loader:** Animated analysis phase.
* **Step 12: Diagnostic Breakdown & Gap Analysis:**
  * Displays baseline score (`2 / 5`).
  * Explicitly highlights **CEDA Language Bias Penalty: 0** (zero marks deducted for phrasing).
  * Dynamic visual gap tracker between baseline (60%) and user target score (e.g. 90% target = 30% gap).
* **Step 13: Premium Conversion & Paywall:**
  * Pricing tiers (Annual ₹99/mo with 24% discount vs Monthly ₹339/mo).
  * "Continue with Free Plan" option with automated onboarding attempt loop-breaker (`localStorage.onboarding_attempts >= 6`).

### D. AI Command Center & Tools Console (`/tools/keyword-optimizer` - `src/pages/tools/keyword-optimizer/index.astro`)
Single-page application housing 7 synchronized views with persistent sidebar navigation:
1. **AI Command Center (`#dashboard-view`):**
   * High-level metrics: Overall Accuracy (82%), Syllabus Mastery (68%), Active Streak (14 Days).
   * Subject progress indicators: Biology (85%), Physics (45%), Chemistry (70%).
   * Priority Action Feed with one-click routing to targeted revision and mistake resolution.
2. **Smart Revision Engine (`#smart-revision-view`):**
   * Real-time memory decay tracking for Class 9 Biology (Mitochondria at 58% health, urgent priority) and Class 9 Physics (Acceleration at 94% health, mastered).
   * One-click "Launch Targeted Revision" triggering a 5-card custom flashcard session on weakest concepts.
3. **Personal & Common Mistake Database (`#mistake-database-view`):**
   * **My Personal Mistakes:** Cumulative stats (142 tracked errors, 28 resolved), priority-coded error cards (Missing ATP keyword repeated 6x, Cristae vs. outer membrane confusion repeated 3x), subject filtering dropdown, and "Generate Remedial Quiz" launcher.
   * **Common Student Mistakes:** Cross-subject crowd analysis across Biology, Physics, AI, IKS, and Chemistry with category pill filters and individual remedial quiz triggers.
4. **NCERT Subjective Answer Evaluator (`#answer-evaluator-view`):**
   * 4 Sandbox diagnostic scenarios: Cellular Powerhouse (Biology), Velocity & Acceleration (Physics), RAG AI (CS), and Fractional Distillation (Chemistry).
   * Editable user answer script textarea and configurable Max Marks input.
   * Step-marking score display with color-coded benchmark highlighting (Green = verified concepts, Red = critical omissions) and missing scientific parameters list.
5. **Adaptive Quiz Generator (`#quiz-generator-view`):**
   * 5 curriculum topics: Mitochondria, Acceleration, RAG AI, IKS Sustainability, and Fractional Distillation.
   * 100 comprehensive MCQs (20 questions per topic) stored in `quizDatabase`.
   * Length selectors (5, 10, 15, 20 questions).
   * Full-screen circular SVG progress simulation during quiz generation.
   * Instant visual feedback (green/red border, badge icons) and results scorecard.
6. **Self-Paced Flashcard Generator (`#flashcard-generator-view`):**
   * Dedicated 20-card flashcard decks for IKS and Fractional Distillation, with automatic fallback mapping to quiz questions for Mitochondria, Acceleration, and RAG.
   * 3D card flip animation (`transform-style: preserve-3d`, `rotateY(180deg)`).
   * "Got It!" vs. "Still Learning" grading system and progress bar tracking.
7. **Interactive Mind Map Generator (`#mindmap-generator-view`):**
   * 5 comprehensive topic graphs (Mitochondria, Acceleration, RAG AI, IKS Sustainability, Fractional Distillation) totaling 165 nodes.
   * SVG canvas with full mouse drag panning and cursor-centered wheel zooming (0.3x to 3x).
   * Multi-stage generation simulation with custom SVG glow filters.
   * 4 main color-coded branch nodes with 7 expandable/hoverable leaf nodes each.

### E. Backend Proxy Route (`/api/evaluate.json` - `src/pages/api/evaluate.json.ts`)
* Astro API route accepting POST requests containing `question` and `student_answer`.
* Formats payload into FastAPI Pydantic schema (`question`, `student_answer`, `class_num: 10`, `subject: "Science"`).
* Dispatches request to `https://marksmind-api.onrender.com/score`.
* Parses response via regex patterns for marks extraction (`MARKS: X out of Y`) and model answer extraction (`MODEL ANSWER: ... ADVICE:`).

---

## 4. Current Codebase Audit, Gaps & Architectural Inconsistencies

Through a line-by-line inspection of the repository, the following critical discrepancies and technical debts have been identified:

| Area | Current Reality | Required Architecture | Impact |
| :--- | :--- | :--- | :--- |
| **Dependencies & Build** | `node_modules` is not installed; PowerShell execution policy blocks `npm.ps1`. | Dependencies must be installed via `cmd /c "npm install"`, and build verified with `cmd /c "npm run build"`. | High: Commands must use `cmd /c` wrapper on this Windows environment. |
| **Environment Variables** | No `.env` file exists. | `.env` needed with `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`. | High: Supabase client in `AuthForm.astro` fails with `undefined` credentials. |
| **Astro SSR Mode** | `astro.config.mjs` uses default static output mode (`output: 'static'`). | To use `/api/evaluate.json`, Astro requires an adapter (e.g. `@astrojs/node`) and `output: 'hybrid'` or `output: 'server'`. | High: In static mode, POST API routes cannot execute at runtime in production. |
| **Live AI vs. Mock Logic** | Evaluator and Onboarding run `setTimeout` mocks with hardcoded strings instead of calling `/api/evaluate.json` or Gemini. | Wire the frontend client to call `/api/evaluate.json` or direct Gemini API with graceful offline fallbacks. | High: Core AI capability is currently purely cosmetic. |
| **Mind Map CSS Hook Bug** | Mind Map sandbox cards on lines 1513–1608 lack the `.mm-sandbox-card` class queried on line 3410. | Add `mm-sandbox-card` class to all 5 mind map buttons so active card highlighting works. | Medium: Visual state does not highlight currently active mind map card. |
| **Evaluator Max Marks Bug** | `#maxMarksInput` value is never synced to the score denominator; the score display hardcodes `-- / 3`. | Connect input listener to update denominator dynamically. | Medium: User cannot customize maximum marks. |
| **Orphaned Curriculum Data** | `src/data/cbse_curriculum.ts` defines 5 Class 10 concepts but is never imported anywhere in the project. | Integrate into curriculum display or dynamic question generation. | Medium: Dead code / blueprint drift. |
| **Missing Static Assets** | `public/favicon.png`, `public/favicon.svg`, `public/apple-touch-icon.png`, and `public/og-image.png` are referenced in layouts but missing from `public/` (only `favicon.ico` exists). | Provide SVG/PNG assets in `public/` to prevent browser 404s. | Low: Browser console 404 warnings. |
| **Legacy Astro Files** | `src/components/Welcome.astro` and `src/layouts/Layout.astro` are default Astro starter artifacts not used in the active UI. | Clean up or refactor into proper layouts. | Low: Code clutter. |

---

## 5. Master Roadmap & Actionable Implementation Plan

To evolve MarksMind AI from its current high-fidelity prototype into a production-grade, AI-connected application, the implementation roadmap is structured into 4 distinct phases:

### Phase 1: Environment Stabilization & Foundation Fixes
1. **Dependency Installation:** Run `cmd /c "npm install"` to establish `node_modules` and unlock local Astro compilation.
2. **Environment Configuration:** Generate `.env` with placeholder/configured Supabase and Gemini keys to prevent runtime client crashes.
3. **Asset & Cleanup:** Add missing favicon/OG image assets in `public/` and retire dead starter files (`Welcome.astro`, `Layout.astro`).
4. **CSS & Event Fixes:** Fix the `.mm-sandbox-card` selector bug, bind the Evaluator's `#maxMarksInput` dynamically, and wire up the Mistake Database keyword search and filter controls.

### Phase 2: Live AI Integration (CEDA Engine & Gemini Connectivity)
1. **SSR Adapter Setup:** Update `astro.config.mjs` to support API routes via `@astrojs/node` in hybrid mode.
2. **Real AI Verification Flow:** Connect the NCERT Answer Evaluator in `keyword-optimizer/index.astro` to call `/api/evaluate.json` with a robust fallback to local heuristics if the Render API is cold-starting.
3. **Gemini SDK Integration:** Utilize `@google/genai` to enable direct, low-latency evaluation of subjective answers when external proxies are unavailable.
4. **Onboarding Diagnostic Wiring:** Connect Step 11 (`runMockAnalysis`) to real diagnostic scoring, passing the student's answer and weak subject to generate tailored feedback.

### Phase 3: Monolith Refactoring & Modular Island Architecture
1. **Deconstruct `keyword-optimizer/index.astro` (4,264 lines):**
   * Extract datasets into dedicated modules (`src/data/quiz_database.ts`, `src/data/flashcard_database.ts`, `src/data/mindmap_database.ts`, `src/data/mistakes_database.ts`).
   * Extract distinct views into isolated Astro/React islands (`DashboardView.astro`, `SmartRevisionView.astro`, `MistakeDbView.astro`, `AnswerEvaluatorView.astro`, `QuizGeneratorIsland.tsx`, `FlashcardIsland.tsx`, `MindMapViewer.tsx`).
2. **Connect Curriculum Data:** Wire `src/data/cbse_curriculum.ts` into a curriculum selector to allow students to evaluate answers across Class 10 Science, Physics, Chemistry, Social Science, and Economics.

### Phase 4: Persistence, User State & Study Continuity
1. **Supabase Profile Persistence:** Store user onboarding responses (`state` in `OnboardingFlow.astro`) to Supabase `user_profiles` table upon completion.
2. **Dynamic Mistake Tracking:** Enable "Mark as Resolved" and "View Original Question" to update a local or database-backed mistake register.
3. **Quiz & Flashcard History:** Save quiz scores and flashcard mastery ratings to calculate real memory decay curves instead of hardcoded percentages.

---

## 6. Current Active Task: Fix NCERT Answer Evaluator Inconsistency (Mitochondria)

### Problem Statement
In the NCERT Answer Evaluator (`#answer-evaluator-view`), selecting Q1 (Mitochondria / Cellular Powerhouse) populates the student answer:
> "The mitochondrion is the powerhouse of the cell. It generates most of the cell's ATP, which is used for energy."

When evaluated, the system previously displayed:
* `❌ Adenosine Triphosphate (ATP)` under Missing Scientific Parameters.
* `❌ Energy Currency` under Missing Scientific Parameters.
* Hardcoded red highlight on `Adenosine Triphosphate (ATP)` in the benchmark answer.

This was a major logical inconsistency because the student explicitly wrote that mitochondria generate ATP and that it is used for energy.

### Corrected NCERT Evaluation Principles & Rubric
1. **Powerhouse of the Cell (1.0 Mark):**
   * Recognizes statement that mitochondrion is the powerhouse of the cell.
   * Status: **Covered** (+1.0 Mark).
2. **ATP Production (1.0 Mark):**
   * Recognizes generation/production of ATP (or Adenosine Triphosphate).
   * Status: **Covered** (+1.0 Mark).
   * Must never be marked missing when explicitly present.
3. **Role in Cellular Energy / Respiration (1.0 Mark):**
   * Assesses explanation of energy provision.
   * If student notes it is "used for energy" but omits "energy currency" / "cellular respiration" / specific metabolic or chemical work:
     * Status: **Partially Covered** (+0.5 Mark) with clear explanation of the missing board terminology.
   * If student includes "energy currency" or explains usable cellular activities: **Covered** (+1.0 Mark).
   * If student omits energy role completely: **Missing** (0.0 Marks).
4. **Scientific Misconception Detection:**
   * Flags false claims (e.g. "produce DNA as the main source of energy") with 0 credit for that claim and an explicit misconception alert.
5. **Transparent Evidence & Step-Marking Breakdown:**
   * Each required concept displays its Status (Covered / Partially Covered / Missing / Conceptual Error), Mark Awarded, Evidence quote from student answer, and Rubric Reason.
   * Benchmark answer highlights dynamically adapt (Green = covered, Amber = partial, Red = missing).
   * Score display cleanly matches the evaluated marks and supports `#maxMarksInput`.

### Implementation & Verification Status: COMPLETED
* **File Modified:** `src/pages/tools/keyword-optimizer/index.astro`
* **Test 1 Passed:** Original student answer evaluated to `2.5 / 3` with ATP and Powerhouse recognized as Covered (+1.0 each) and energy role as Partially Covered (+0.5). ATP is never shown as missing.
* **Test 2 Passed:** Synonymous wording ("adenosine triphosphate", "usable energy for cellular activities") recognized without requiring exact textbook match.
* **Test 3 Passed:** Answer lacking ATP awarded only `1 / 3` for Powerhouse, correctly marking ATP and Energy as missing.
* **Test 4 Passed:** Scientifically incorrect claim ("DNA as the main source of energy") flagged as a conceptual misconception with 0 credit awarded.
* **Build Verification:** Clean Astro production build (`dist/`) confirmed with zero compile errors.

---

## 7. Current Active Task: Make Dashboard Metrics Clearly Identifiable as Illustrative Demo Data

### Objective
Ensure full credibility and transparency in the AI Command Center dashboard. Because the prototype is illustrative and not currently connected to live student analytics or real-time AI backend services, all displayed metrics must be explicitly, elegantly, and unambiguously identified as sample demonstration data.

### Planned Modifications
1. **Prominent Demo-Data Indicator:**
   * Add a banner badge at the top of the `#dashboard-view` container, immediately visible without scrolling.
   * Primary Label: `DEMO STUDENT PROFILE · ILLUSTRATIVE DATA`
   * Subtitle: `"These statistics are sample data created to demonstrate the MARKSMIND AI dashboard. They do not represent actual student performance or live analytics."`
   * Styled subtly with dark-theme tokens (`bg-purple-500/5`, `border-purple-500/20`, `text-purple-300`).
2. **Individual Metric Label Clarifications:**
   * "Overall Accuracy — 82%" $\rightarrow$ `"Demo Accuracy — 82%"`
   * "Syllabus Mastery — 68%" $\rightarrow$ `"Demo Syllabus Progress — 68%"`
   * "Active Streak — 14 Days" $\rightarrow$ `"Demo Study Streak — 14 Days"`
   * "Subject Performance" $\rightarrow$ `"Demo Subject Performance"`
     * "Biology — 85%" $\rightarrow$ `"Demo Biology Progress — 85%"`
     * "Physics — 45%" $\rightarrow$ `"Demo Physics Progress — 45%"`
     * "Chemistry — 70%" $\rightarrow$ `"Demo Chemistry Progress — 70%"`
3. **Correcting Misleading AI Wording:**
   * Update header description from `"Your comprehensive academic intelligence overview."` to `"Learning performance dashboard — demonstration data."`
   * In Subject Performance card, add clear note: `"Example insight: Physics has the lowest progress score in this demo profile."`
   * Update `"AI Priority Action Feed"` to `"Demo Priority Action Feed"`
   * Update action items to clarify demo context:
     * `"🔴 Demo Insight: 2 sample critical mistakes flagged in Physics."`
     * `"🟠 Demo Alert: Sample retention dropped below 60% in Mitochondria."`
   * Clarify sidebar user profile from `"Premium Developer Plan"` to `"Illustrative Student Account · Demo Profile"`.




### Implementation & Verification Status: COMPLETED
* **Files Modified:** `src/pages/tools/keyword-optimizer/index.astro`, `blueprint.md`
* **Demo Indicator:** Added a dedicated badge banner at the very top of `#dashboard-view` with primary label `DEMO STUDENT PROFILE · ILLUSTRATIVE DATA` and explanatory subtitle `"These statistics are sample data created to demonstrate the MARKSMIND AI dashboard. They do not represent actual student performance or live analytics."`.
* **Individual Metric Clarifications:** All 7 metrics updated to `Demo Accuracy (82%)`, `Demo Syllabus Progress (68%)`, `Demo Study Streak (14 Days)`, `Demo Biology Progress (85%)`, `Demo Physics Progress (45%)`, `Demo Chemistry Progress (70%)`, and `2 sample critical mistakes flagged`.
* **Misleading AI Language Removed:** Subtitle updated to `"Learning performance dashboard — demonstration data."`, added note `"Example insight: Physics has the lowest progress score in this demo profile."`, and priority action feed relabeled to `"Demo Priority Action Feed"` with sample alerts.
* **Preservation of Design & Functionality:** Dark theme palette, layout, purple accents, and DOM IDs (`btn-resolve-mistakes`, `btn-revise-retention`) fully preserved.
* **Build Verification:** Clean Astro production build (`cmd /c "npm run build"`) succeeded with exit code 0 and zero template/syntax errors.


---

## 8. Priority 3: Improve CEDA — Concept Extraction & Defect Analysis

### Objective
Transform the Answer Evaluator's concept analysis from a mix of structured (Q1) and static/hardcoded (Q2–Q4) evaluation outputs into a consistent, structured CEDA system across all 4 sandbox questions. Each question now receives per-concept breakdown with status badges, evidence quotes, rubric reasoning, NCERT references, and an aggregated gap summary.

### What Changed
1. **CEDA Branding:**
   * UI section header updated from "Concept Analysis & Step-Marking Breakdown" to `"CEDA · Concept Extraction & Defect Analysis"`.
   * All 4 question evaluations now set the breakdown title to `"CEDA · Concept Extraction & Defect Analysis"`.

2. **Q2 — Velocity & Acceleration (Class 9 Physics):**
   * New `evaluateAccelerationAnswer()` function with 3 concept rubrics:
     * Definition of Acceleration (rate of change of velocity)
     * Mathematical Formula (a = (v − u) / t)
     * SI Unit (m/s²)
   * Context-aware regex matching with partial credit for related-but-incomplete answers.
   * NCERT references: Ch. 8 — Motion, Sections 8.1–8.3.

3. **Q3 — What is RAG? (AI/CS):**
   * New `evaluateRAGAnswer()` function with 3 concept rubrics:
     * RAG Definition & Acronym
     * Information Retrieval & Knowledge Base
     * Improves LLM Accuracy / Grounding
   * Partial credit for mentioning RAG without full expansion, or describing retrieval without naming vector DB.

4. **Q4 — Fractional Distillation (Chemistry):**
   * New `evaluateFractionalDistillationAnswer()` function with 3 concept rubrics:
     * Separation of Miscible Liquids
     * Boiling Point Difference Criterion (< 25 K)
     * Fractionating Column Apparatus
   * Misconception detection: flags confusion with simple distillation.
   * NCERT references: Ch. 2 — Is Matter Around Us Pure, Section 2.3.4.

5. **Q1 — Mitochondria (Existing, enhanced):**
   * Added NCERT reference tags (Class 9 Science, Ch. 5 — The Fundamental Unit of Life, Section 5.3).
   * Standardized gap summary header to match Q2–Q4 format.

6. **Consistent CEDA Output Format (all questions):**
   * Per-concept cards with: Status Badge (Covered / Partially Covered / Missing / Misconception), Score Badge (+1.0 / +0.5 / 0.0), Evidence quote, Rubric reasoning, NCERT Reference.
   * Aggregated gap summary listing genuinely missing concepts with correction guidance.
   * Full-marks congratulation message when all rubric criteria are met.

### How Analysis Is Generated
All analysis is performed by **local rule-based evaluation functions** using context-aware regular expression matching with negation detection, synonym recognition, and partial-credit logic. There is **no connected AI API or live backend**. The evaluation is deterministic and reproducible.

### What Still Requires a Real Backend/API
* Dynamic evaluation of arbitrary student answers beyond the 4 predefined topic rubrics.
* Semantic understanding of paraphrased or creative student responses.
* Personalized learning recommendations based on historical performance.
* Cross-question concept graph analysis.

### Implementation & Verification Status: PENDING BUILD VERIFICATION
* **File Modified:** `src/pages/tools/keyword-optimizer/index.astro`
* Build verification in progress.
