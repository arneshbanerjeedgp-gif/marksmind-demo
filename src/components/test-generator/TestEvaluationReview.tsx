import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import type {
  MasterTestTemplate,
  McqOptionKey,
} from './templates/cell20MarkTemplate';
import {
  UploadedNotesPreviewGrid,
  type UploadedNoteFile,
} from '../shared/HandwrittenUploadZone';

interface TestEvaluationReviewProps {
  template: MasterTestTemplate;
  mcqAnswers: Record<string, McqOptionKey | undefined>;
  subjectiveAnswers: Record<string, string>;
  fullSheetFiles: UploadedNoteFile[];
  perQuestionFiles: Record<string, UploadedNoteFile[]>;
  onRetake: () => void;
  onEditConfig: () => void;
  onBackToHub: () => void;
}

interface SubjectiveReviewCardProps {
  title: string;
  prompt: string;
  marks: number;
  studentResponse: string;
  uploadedFiles: UploadedNoteFile[];
  hasFullSheet: boolean;
  benchmarkAnswer: string;
  markingPoints?: string[];
  keywordBadges: string[];
}

function SubjectiveReviewCard({
  title,
  prompt,
  marks,
  studentResponse,
  uploadedFiles,
  hasFullSheet,
  benchmarkAnswer,
  markingPoints,
  keywordBadges,
}: SubjectiveReviewCardProps) {
  const trimmed = studentResponse.trim();
  const normalized = trimmed.toLowerCase();
  const hasPerQuestionFiles = uploadedFiles.length > 0;

  return (
    <div className="bg-[#161618] border border-white/10 rounded-2xl p-6 space-y-5 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            {title}
          </span>
          <p className="text-base font-semibold text-slate-100 leading-relaxed">
            {prompt}
          </p>
        </div>
        <span className="shrink-0 bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-md text-xs font-semibold">
          {marks} {marks === 1 ? 'Mark' : 'Marks'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Student Response (Typed + Handwritten Uploads) */}
        <div className="bg-[#0e0e10] border border-white/[0.06] rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Your Submitted Answer
            </h4>
            {hasPerQuestionFiles && (
              <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] font-semibold text-purple-300">
                {uploadedFiles.length} handwritten{' '}
                {uploadedFiles.length === 1 ? 'file' : 'files'}
              </span>
            )}
          </div>

          {trimmed && (
            <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
              {trimmed}
            </p>
          )}

          {hasPerQuestionFiles && (
            <UploadedNotesPreviewGrid files={uploadedFiles} compact={true} />
          )}

          {!trimmed && !hasPerQuestionFiles && (
            <p className="text-sm text-slate-400 italic">
              {hasFullSheet
                ? 'Covered via your uploaded Full Handwritten Answer Sheet above.'
                : 'No response entered.'}
            </p>
          )}
        </div>

        {/* NCERT Benchmark Answer */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            NCERT Benchmark Answer
          </h4>
          <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
            {benchmarkAnswer}
          </p>

          {markingPoints && markingPoints.length > 0 && (
            <div className="pt-3 border-t border-slate-800 space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Key Marking Points
              </p>
              <ul className="space-y-1 text-xs text-slate-300">
                {markingPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {keywordBadges.length > 0 && (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Key Marking Terminology
              </p>
              <div className="flex flex-wrap gap-2">
                {keywordBadges.map((kw) => {
                  const matched =
                    trimmed.length > 0 &&
                    normalized.includes(kw.toLowerCase());
                  return (
                    <span
                      key={kw}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${
                        matched
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                    >
                      {matched && <CheckCircle2 className="w-3 h-3" />}
                      <span>{kw}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Displays deterministic auto-grading for Section A MCQs and NCERT benchmark rubrics for Sections B–D,
 * including side-by-side zoomable previews of full and per-question handwritten submissions.
 */
export default function TestEvaluationReview({
  template,
  mcqAnswers,
  subjectiveAnswers,
  fullSheetFiles,
  perQuestionFiles,
  onRetake,
  onEditConfig,
  onBackToHub,
}: TestEvaluationReviewProps) {
  const mcqQuestions = template.sectionA.questions;
  const correctCount = mcqQuestions.filter(
    (q) => mcqAnswers[q.id] === q.answerKey,
  ).length;
  const attemptedCount = mcqQuestions.filter((q) =>
    Boolean(mcqAnswers[q.id]),
  ).length;
  const wrongCount = attemptedCount - correctCount;
  const unansweredCount = mcqQuestions.length - attemptedCount;
  const sectionAPercent = Math.round(
    (correctCount / template.sectionA.totalMarks) * 100,
  );
  const hasFullSheet = fullSheetFiles.length > 0;

  return (
    <div className="space-y-8">
      {/* Top Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToHub}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-purple-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Test Generator</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onEditConfig}
            className="px-4 py-2 rounded-lg border border-white/10 bg-[#161618] hover:border-purple-500/50 text-slate-300 hover:text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            ← Edit Configuration
          </button>
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Test</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-2xl text-slate-100 font-bold tracking-tight">
          Evaluation &amp; Answer Key Review
        </h2>
        <p className="text-slate-400 mt-1">{template.title}</p>
      </div>

      {/* Score Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
            Section A Auto-Graded Score
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-emerald-400">
              {correctCount} / {template.sectionA.totalMarks}
            </span>
            <span className="text-sm font-bold text-purple-300">
              ({sectionAPercent}%)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {correctCount} correct • {wrongCount} incorrect • {unansweredCount}{' '}
            unanswered
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
            Subjective &amp; Case-Study Rubrics
          </p>
          <p className="text-3xl font-extrabold text-purple-400">15 Marks</p>
          <p className="text-xs text-slate-400 mt-2">
            Sections B (6M) + C (3M) + D (6M) benchmarked below
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
            Paper Blueprint Total
          </p>
          <p className="text-3xl font-extrabold text-slate-100">
            {template.maxMarks} Marks
          </p>
          <p className="text-xs text-slate-400 mt-2">
            {template.blueprintSummary}
          </p>
        </div>
      </div>

      {/* Section A Answer Key Review */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            {template.sectionA.title} — Graded Results
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
            Score: {correctCount} / {template.sectionA.totalMarks} Marks
          </span>
        </div>

        <div className="space-y-4">
          {mcqQuestions.map((q) => {
            const studentPick = mcqAnswers[q.id];
            const isCorrect = studentPick === q.answerKey;
            const isUnanswered = !studentPick;

            return (
              <div
                key={q.id}
                className="bg-[#161618] border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-base font-semibold text-slate-100 leading-relaxed">
                    <span className="text-purple-400 mr-2">Q{q.number}.</span>
                    {q.question}
                  </p>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold border ${
                      isCorrect
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : isUnanswered
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}
                  >
                    {isCorrect
                      ? '+1 Mark'
                      : isUnanswered
                        ? 'Unanswered (0/1)'
                        : '0 / 1 Mark'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {q.options.map((opt) => {
                    const isAnswerKey = opt.key === q.answerKey;
                    const isStudentWrongPick =
                      studentPick === opt.key && !isAnswerKey;

                    return (
                      <div
                        key={opt.key}
                        className={`w-full rounded-xl p-3.5 border flex items-center justify-between gap-3 text-sm sm:text-base font-medium ${
                          isAnswerKey
                            ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
                            : isStudentWrongPick
                              ? 'border-red-500 bg-red-950/20 text-red-300'
                              : 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                        }`}
                      >
                        <span>
                          <span className="font-bold mr-2.5">{opt.key})</span>
                          {opt.text}
                        </span>
                        {isAnswerKey && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {isStudentWrongPick && (
                          <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-purple-300 mr-1.5">
                    NCERT Explanation (Answer {q.answerKey}):
                  </span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Uploaded Full Handwritten Answer Sheet Gallery */}
      {hasFullSheet && (
        <section className="bg-[#161618] border border-purple-500/30 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Your Uploaded Handwritten Answer Sheet
                </h3>
                <p className="text-xs text-slate-400">
                  Click any image thumbnail to inspect your written answers alongside the rubrics below.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
              {fullSheetFiles.length}{' '}
              {fullSheetFiles.length === 1 ? 'page' : 'pages'}
            </span>
          </div>

          <UploadedNotesPreviewGrid files={fullSheetFiles} />
        </section>
      )}

      {/* Section B Review */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            {template.sectionB.title} — Benchmark Review
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {template.sectionB.subtitle}
          </span>
        </div>

        <div className="space-y-4">
          {template.sectionB.questions.map((q) => (
            <SubjectiveReviewCard
              key={q.id}
              title={`Question ${q.number} • Short Answer`}
              prompt={q.question}
              marks={q.marks}
              studentResponse={subjectiveAnswers[q.id] ?? ''}
              uploadedFiles={perQuestionFiles[q.id] ?? []}
              hasFullSheet={hasFullSheet}
              benchmarkAnswer={q.benchmarkAnswer}
              markingPoints={q.markingPoints}
              keywordBadges={q.keywordBadges}
            />
          ))}
        </div>
      </section>

      {/* Section C Review */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            {template.sectionC.title} — Benchmark Review
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {template.sectionC.subtitle}
          </span>
        </div>

        <div className="space-y-4">
          {template.sectionC.questions.map((q) => (
            <SubjectiveReviewCard
              key={q.id}
              title={`Question ${q.number} • Structured Answer`}
              prompt={q.question}
              marks={q.marks}
              studentResponse={subjectiveAnswers[q.id] ?? ''}
              uploadedFiles={perQuestionFiles[q.id] ?? []}
              hasFullSheet={hasFullSheet}
              benchmarkAnswer={q.benchmarkAnswer}
              markingPoints={q.markingPoints}
              keywordBadges={q.keywordBadges}
            />
          ))}
        </div>
      </section>

      {/* Section D Review */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            {template.sectionD.title} — Benchmark Review
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {template.sectionD.subtitle}
          </span>
        </div>

        <div className="bg-purple-950/15 border border-purple-500/30 border-l-4 border-l-purple-500 rounded-xl p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-2">
            Case Study Passage (Q{template.sectionD.question.number})
          </p>
          <p className="text-sm text-slate-200 italic leading-relaxed">
            {template.sectionD.question.passage}
          </p>
        </div>

        <div className="space-y-4">
          {template.sectionD.question.subParts.map((part) => (
            <SubjectiveReviewCard
              key={part.id}
              title={`Question ${template.sectionD.question.number} • Sub-part ${part.label}`}
              prompt={part.prompt}
              marks={part.marks}
              studentResponse={subjectiveAnswers[part.id] ?? ''}
              uploadedFiles={perQuestionFiles[part.id] ?? []}
              hasFullSheet={hasFullSheet}
              benchmarkAnswer={part.benchmarkAnswer}
              keywordBadges={part.keywordBadges}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
