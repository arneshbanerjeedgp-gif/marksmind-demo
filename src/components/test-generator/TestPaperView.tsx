import React from 'react';
import {
  ArrowLeft,
  BookOpenCheck,
  Camera,
  CheckCircle2,
  PenLine,
  Send,
} from 'lucide-react';
import type {
  MasterTestTemplate,
  McqOptionKey,
} from './templates/cell20MarkTemplate';
import HandwrittenUploadZone, {
  CompactHandwrittenUploadBar,
  type UploadedNoteFile,
} from '../shared/HandwrittenUploadZone';

export type AnswerInputMode = 'type' | 'upload';

interface TestPaperViewProps {
  template: MasterTestTemplate;
  mcqAnswers: Record<string, McqOptionKey | undefined>;
  subjectiveAnswers: Record<string, string>;
  fullSheetFiles: UploadedNoteFile[];
  perQuestionFiles: Record<string, UploadedNoteFile[]>;
  questionModes: Record<string, AnswerInputMode>;
  onSelectMcq: (questionId: string, option: McqOptionKey) => void;
  onChangeSubjective: (questionId: string, value: string) => void;
  onFullSheetFilesChange: (nextFiles: UploadedNoteFile[]) => void;
  onPerQuestionFilesChange: (
    questionId: string,
    nextFiles: UploadedNoteFile[],
  ) => void;
  onChangeQuestionMode: (questionId: string, mode: AnswerInputMode) => void;
  onEditConfig: () => void;
  onSubmit: () => void;
  onBackToHub: () => void;
}

const TEXTAREA_CLASSES =
  'w-full bg-[#0e0e10] border border-white/[0.08] rounded-lg p-4 focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-[#6a6f78] text-[15px] text-[#e3e3e4] font-normal leading-relaxed tracking-[0.01em]';

interface SubjectiveModeToggleProps {
  mode: AnswerInputMode;
  fileCount: number;
  onChangeMode: (mode: AnswerInputMode) => void;
}

function SubjectiveModeToggle({
  mode,
  fileCount,
  onChangeMode,
}: SubjectiveModeToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Question answer input mode"
      className="inline-flex items-center p-0.5 rounded-lg bg-[#0e0e10] border border-white/[0.08]"
    >
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'type'}
        onClick={() => onChangeMode('type')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
          mode === 'type'
            ? 'bg-purple-600 text-white'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <PenLine className="w-3 h-3" />
        <span>Type Answer</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={mode === 'upload'}
        onClick={() => onChangeMode('upload')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
          mode === 'upload'
            ? 'bg-purple-600 text-white'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Camera className="w-3 h-3" />
        <span>Upload Handwritten</span>
        {fileCount > 0 && (
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
              mode === 'upload'
                ? 'bg-white/20 text-white'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {fileCount}
          </span>
        )}
      </button>
    </div>
  );
}

interface SubjectiveQuestionBodyProps {
  questionId: string;
  mode: AnswerInputMode;
  typedValue: string;
  files: UploadedNoteFile[];
  rows: number;
  placeholder: string;
  onChangeTyped: (val: string) => void;
  onFilesChange: (nextFiles: UploadedNoteFile[]) => void;
}

function SubjectiveQuestionBody({
  questionId,
  mode,
  typedValue,
  files,
  rows,
  placeholder,
  onChangeTyped,
  onFilesChange,
}: SubjectiveQuestionBodyProps) {
  if (mode === 'upload') {
    return (
      <HandwrittenUploadZone
        files={files}
        onFilesChange={onFilesChange}
        variant="compact"
        multiple={true}
        maxFiles={3}
      />
    );
  }

  return (
    <textarea
      id={`answer-${questionId}`}
      rows={rows}
      value={typedValue}
      onChange={(e) => onChangeTyped(e.target.value)}
      placeholder={placeholder}
      className={TEXTAREA_CLASSES}
    />
  );
}

/**
 * Interactive 4-section CBSE test paper view with a compact top handwritten upload bar
 * covering all sections (A-D), clickable MCQs, and subjective answer modes.
 */
export default function TestPaperView({
  template,
  mcqAnswers,
  subjectiveAnswers,
  fullSheetFiles,
  perQuestionFiles,
  questionModes,
  onSelectMcq,
  onChangeSubjective,
  onFullSheetFilesChange,
  onPerQuestionFilesChange,
  onChangeQuestionMode,
  onEditConfig,
  onSubmit,
  onBackToHub,
}: TestPaperViewProps) {
  const hasFullSheet = fullSheetFiles.length > 0;
  const isSubjectiveAttempted = (id: string) =>
    Boolean(subjectiveAnswers[id]?.trim()) ||
    (perQuestionFiles[id]?.length ?? 0) > 0 ||
    hasFullSheet;

  const attemptedMcqs = hasFullSheet
    ? template.sectionA.questions.length
    : template.sectionA.questions.filter((q) => Boolean(mcqAnswers[q.id]))
        .length;
  const attemptedSectionB = template.sectionB.questions.filter((q) =>
    isSubjectiveAttempted(q.id),
  ).length;
  const attemptedSectionC = template.sectionC.questions.filter((q) =>
    isSubjectiveAttempted(q.id),
  ).length;
  const attemptedSectionD = template.sectionD.question.subParts.some((sp) =>
    isSubjectiveAttempted(sp.id),
  )
    ? 1
    : 0;
  const totalAttemptedQuestions =
    attemptedMcqs + attemptedSectionB + attemptedSectionC + attemptedSectionD;

  const getMode = (id: string): AnswerInputMode => questionModes[id] ?? 'type';

  return (
    <div className="space-y-6">
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
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                Attempted: {totalAttemptedQuestions} / {template.totalQuestions}
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

      {/* Compact Top Handwritten Upload Bar (All Sections A–D) */}
      <CompactHandwrittenUploadBar
        files={fullSheetFiles}
        onFilesChange={onFullSheetFilesChange}
        onEvaluateSheet={onSubmit}
        title="Upload Handwritten Answer Sheet"
        coverageBadge="All Sections (A–D)"
        subtitle="Wrote all answers on paper? Upload your sheet for instant CEDA OCR evaluation."
        maxFiles={8}
      />

      {/* SECTION A — MCQs */}
      <section className="space-y-4 pt-2">
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
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            {template.sectionB.title}
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {template.sectionB.subtitle}
          </span>
        </div>

        <div className="space-y-4">
          {template.sectionB.questions.map((q) => {
            const qFiles = perQuestionFiles[q.id] ?? [];
            const qMode = getMode(q.id);
            return (
              <div
                key={q.id}
                className="bg-[#161618] border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <label
                    htmlFor={`answer-${q.id}`}
                    className="text-base font-semibold text-slate-100 leading-relaxed"
                  >
                    <span className="text-purple-400 mr-2">Q{q.number}.</span>
                    {q.question}
                  </label>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <SubjectiveModeToggle
                      mode={qMode}
                      fileCount={qFiles.length}
                      onChangeMode={(nextMode) =>
                        onChangeQuestionMode(q.id, nextMode)
                      }
                    />
                    <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-md text-xs font-semibold">
                      {q.marks} Marks
                    </span>
                  </div>
                </div>

                <SubjectiveQuestionBody
                  questionId={q.id}
                  mode={qMode}
                  typedValue={subjectiveAnswers[q.id] ?? ''}
                  files={qFiles}
                  rows={4}
                  placeholder="Write your concise NCERT answer here..."
                  onChangeTyped={(val) => onChangeSubjective(q.id, val)}
                  onFilesChange={(nextFiles) =>
                    onPerQuestionFilesChange(q.id, nextFiles)
                  }
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION C — Structured Answer Question */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            {template.sectionC.title}
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {template.sectionC.subtitle}
          </span>
        </div>

        {template.sectionC.questions.map((q) => {
          const qFiles = perQuestionFiles[q.id] ?? [];
          const qMode = getMode(q.id);
          return (
            <div
              key={q.id}
              className="bg-[#161618] border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <label
                  htmlFor={`answer-${q.id}`}
                  className="text-base font-semibold text-slate-100 leading-relaxed"
                >
                  <span className="text-purple-400 mr-2">Q{q.number}.</span>
                  {q.question}
                </label>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <SubjectiveModeToggle
                    mode={qMode}
                    fileCount={qFiles.length}
                    onChangeMode={(nextMode) =>
                      onChangeQuestionMode(q.id, nextMode)
                    }
                  />
                  <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-md text-xs font-semibold">
                    {q.marks} Marks
                  </span>
                </div>
              </div>

              <SubjectiveQuestionBody
                questionId={q.id}
                mode={qMode}
                typedValue={subjectiveAnswers[q.id] ?? ''}
                files={qFiles}
                rows={6}
                placeholder="Write 3 structured points clearly comparing prokaryotic and eukaryotic cells..."
                onChangeTyped={(val) => onChangeSubjective(q.id, val)}
                onFilesChange={(nextFiles) =>
                  onPerQuestionFilesChange(q.id, nextFiles)
                }
              />
            </div>
          );
        })}
      </section>

      {/* SECTION D — Case-Based Study Question */}
      <section className="space-y-4 pt-2">
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
            {template.sectionD.question.subParts.map((part, idx) => {
              const partFiles = perQuestionFiles[part.id] ?? [];
              const partMode = getMode(part.id);
              return (
                <div
                  key={part.id}
                  className={
                    idx === 0 ? 'pb-6 space-y-3' : 'py-6 last:pb-0 space-y-3'
                  }
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <label
                      htmlFor={`answer-${part.id}`}
                      className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed"
                    >
                      <span className="font-bold text-purple-400 mr-2">
                        {part.label}
                      </span>
                      {part.prompt}
                    </label>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <SubjectiveModeToggle
                        mode={partMode}
                        fileCount={partFiles.length}
                        onChangeMode={(nextMode) =>
                          onChangeQuestionMode(part.id, nextMode)
                        }
                      />
                      <span className="bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                        {part.marks} {part.marks === 1 ? 'Mark' : 'Marks'}
                      </span>
                    </div>
                  </div>

                  <SubjectiveQuestionBody
                    questionId={part.id}
                    mode={partMode}
                    typedValue={subjectiveAnswers[part.id] ?? ''}
                    files={partFiles}
                    rows={part.marks === 1 ? 2 : 3}
                    placeholder={`Write your answer for sub-part ${part.label}...`}
                    onChangeTyped={(val) => onChangeSubjective(part.id, val)}
                    onFilesChange={(nextFiles) =>
                      onPerQuestionFilesChange(part.id, nextFiles)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Submit Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#161618] border border-white/10 rounded-2xl p-6">
        <p className="text-sm text-slate-400">
          Review your answers or uploaded handwritten sheet before submitting for CEDA evaluation.
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
