import React from 'react';
import { ArrowLeft, BookOpenCheck, CheckCircle2, Send } from 'lucide-react';
import type {
  MasterTestTemplate,
  McqOptionKey,
} from './templates/cell20MarkTemplate';

interface TestPaperViewProps {
  template: MasterTestTemplate;
  mcqAnswers: Record<string, McqOptionKey | undefined>;
  subjectiveAnswers: Record<string, string>;
  onSelectMcq: (questionId: string, option: McqOptionKey) => void;
  onChangeSubjective: (questionId: string, value: string) => void;
  onEditConfig: () => void;
  onSubmit: () => void;
  onBackToHub: () => void;
}

const TEXTAREA_CLASSES =
  'w-full bg-[#0e0e10] border border-white/[0.08] rounded-lg p-4 focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-[#6a6f78] text-[15px] text-[#e3e3e4] font-normal leading-relaxed tracking-[0.01em]';

/**
 * Interactive 4-section CBSE test paper view supporting MCQ selection and subjective answer entry.
 */
export default function TestPaperView({
  template,
  mcqAnswers,
  subjectiveAnswers,
  onSelectMcq,
  onChangeSubjective,
  onEditConfig,
  onSubmit,
  onBackToHub,
}: TestPaperViewProps) {
  return (
    <div className="space-y-8">
      <button
        type="button"
        onClick={onBackToHub}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-purple-300 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Test Generator</span>
      </button>

      {/* Paper Header Card */}
      <div className="bg-[#161618] border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                <BookOpenCheck className="w-3.5 h-3.5" />
                <span>{template.boardBadge}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-semibold">
                Maximum Marks: {template.maxMarks}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold">
                {template.totalSections} Sections
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold">
                {template.totalQuestions} Questions
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
              {template.title}
            </h2>
            <p className="text-sm text-slate-400">
              {template.blueprintSummary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onEditConfig}
              className="px-4 py-2.5 rounded-lg border border-white/10 bg-[#0e0e10] hover:border-purple-500/50 text-slate-300 hover:text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              ← Edit Configuration
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white text-sm font-semibold shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Test Paper</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION A — MCQs */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            {template.sectionA.title}
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {template.sectionA.subtitle}
          </span>
        </div>

        <div className="space-y-4">
          {template.sectionA.questions.map((q) => {
            const selected = mcqAnswers[q.id];
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
                  <span className="shrink-0 bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-md text-xs font-semibold">
                    {q.marks} Mark
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt) => {
                    const isSelected = selected === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => onSelectMcq(q.id, opt.key)}
                        aria-pressed={isSelected}
                        className={`w-full text-left rounded-xl p-4 border transition-all duration-200 flex items-center justify-between gap-3 text-sm sm:text-base font-medium cursor-pointer ${
                          isSelected
                            ? 'border-purple-500 bg-purple-500/15 text-purple-200 shadow-[0_0_15px_rgba(139,92,246,0.18)]'
                            : 'bg-slate-900/60 border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/40 text-slate-300'
                        }`}
                      >
                        <span>
                          <span className="font-bold mr-2.5 text-purple-400">
                            {opt.key})
                          </span>
                          {opt.text}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION B — Short Answer Questions */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            {template.sectionB.title}
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {template.sectionB.subtitle}
          </span>
        </div>

        <div className="space-y-4">
          {template.sectionB.questions.map((q) => (
            <div
              key={q.id}
              className="bg-[#161618] border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <label
                  htmlFor={`answer-${q.id}`}
                  className="text-base font-semibold text-slate-100 leading-relaxed"
                >
                  <span className="text-purple-400 mr-2">Q{q.number}.</span>
                  {q.question}
                </label>
                <span className="shrink-0 bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-md text-xs font-semibold">
                  {q.marks} Marks
                </span>
              </div>

              <textarea
                id={`answer-${q.id}`}
                rows={4}
                value={subjectiveAnswers[q.id] ?? ''}
                onChange={(e) => onChangeSubjective(q.id, e.target.value)}
                placeholder="Write your concise NCERT answer here..."
                className={TEXTAREA_CLASSES}
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C — Structured Answer Question */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            {template.sectionC.title}
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {template.sectionC.subtitle}
          </span>
        </div>

        {template.sectionC.questions.map((q) => (
          <div
            key={q.id}
            className="bg-[#161618] border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <label
                htmlFor={`answer-${q.id}`}
                className="text-base font-semibold text-slate-100 leading-relaxed"
              >
                <span className="text-purple-400 mr-2">Q{q.number}.</span>
                {q.question}
              </label>
              <span className="shrink-0 bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-md text-xs font-semibold">
                {q.marks} Marks
              </span>
            </div>

            <textarea
              id={`answer-${q.id}`}
              rows={6}
              value={subjectiveAnswers[q.id] ?? ''}
              onChange={(e) => onChangeSubjective(q.id, e.target.value)}
              placeholder="Write 3 structured points clearly comparing prokaryotic and eukaryotic cells..."
              className={TEXTAREA_CLASSES}
            />
          </div>
        ))}
      </section>

      {/* SECTION D — Case-Based Study Question */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            {template.sectionD.title}
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {template.sectionD.subtitle}
          </span>
        </div>

        <div className="bg-[#161618] border border-white/10 rounded-2xl p-6 space-y-6 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <span className="text-base font-bold text-slate-100">
              <span className="text-purple-400 mr-2">
                Q{template.sectionD.question.number}.
              </span>
              Case-Based Study
            </span>
            <span className="shrink-0 bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-md text-xs font-semibold">
              {template.sectionD.question.totalMarks} Marks
            </span>
          </div>

          {/* Distinguished Purple-Bordered Callout Passage */}
          <div className="bg-purple-950/15 border border-purple-500/30 border-l-4 border-l-purple-500 rounded-xl p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-2">
              Case Study Passage
            </p>
            <p className="text-sm sm:text-[15px] text-slate-200 italic leading-relaxed">
              {template.sectionD.question.passage}
            </p>
          </div>

          {/* 4 Separated Sub-Parts */}
          <div className="divide-y divide-slate-800/80">
            {template.sectionD.question.subParts.map((part, idx) => (
              <div
                key={part.id}
                className={idx === 0 ? 'pb-6 space-y-3' : 'py-6 last:pb-0 space-y-3'}
              >
                <div className="flex items-start justify-between gap-4">
                  <label
                    htmlFor={`answer-${part.id}`}
                    className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed"
                  >
                    <span className="font-bold text-purple-400 mr-2">
                      {part.label}
                    </span>
                    {part.prompt}
                  </label>
                  <span className="shrink-0 bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                    {part.marks} {part.marks === 1 ? 'Mark' : 'Marks'}
                  </span>
                </div>

                <textarea
                  id={`answer-${part.id}`}
                  rows={part.marks === 1 ? 2 : 3}
                  value={subjectiveAnswers[part.id] ?? ''}
                  onChange={(e) => onChangeSubjective(part.id, e.target.value)}
                  placeholder={`Write your answer for sub-part ${part.label}...`}
                  className={TEXTAREA_CLASSES}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Submit Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#161618] border border-white/10 rounded-2xl p-6">
        <p className="text-sm text-slate-400">
          Review your answers before submitting to view auto-graded Section A results and NCERT marking rubrics.
        </p>
        <button
          type="button"
          onClick={onSubmit}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-semibold shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>Submit Test Paper</span>
        </button>
      </div>
    </div>
  );
}
