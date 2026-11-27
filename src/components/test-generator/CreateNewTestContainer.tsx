import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Award,
  BookOpen,
  ChevronDown,
  GraduationCap,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  CLASS_LEVELS,
  getChaptersFor,
  getSubjectsForClass,
  type ClassLevel,
} from './curriculumChapters';
import {
  CELL_20_MARK_TEMPLATE,
  type McqOptionKey,
} from './templates/cell20MarkTemplate';
import TestPaperView, { type AnswerInputMode } from './TestPaperView';
import TestEvaluationReview from './TestEvaluationReview';
import {
  revokeUploadedNoteFiles,
  type UploadedNoteFile,
} from '../shared/HandwrittenUploadZone';

interface CreateNewTestContainerProps {
  onBack: () => void;
}

type BuilderStep = 'config' | 'loading' | 'submitting' | 'paper' | 'review';

const GENERATION_DURATION_MS = 7500;
const SUBMISSION_TRANSITION_MS = 1400;
const CIRCLE_CIRCUMFERENCE = 565.48;

const SELECT_CLASSES =
  'w-full appearance-none bg-[#0e0e10] border border-white/[0.08] rounded-lg px-4 py-3 pr-10 text-sm font-medium text-[#e3e3e4] focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer';

/**
 * Four-sandbox NCERT test configuration builder with 7.5s signature loader,
 * interactive 20-mark test paper (supporting handwritten uploads), and deterministic review screen.
 */
export default function CreateNewTestContainer({
  onBack,
}: CreateNewTestContainerProps) {
  const [step, setStep] = useState<BuilderStep>('config');
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('Class 9');
  const [selectedSubject, setSelectedSubject] = useState<string>('Science');
  const [selectedChapter, setSelectedChapter] = useState<string>(
    'The Fundamental Unit of Life (Cell)',
  );
  const [totalMarksInput, setTotalMarksInput] = useState<string>('20');
  const [progress, setProgress] = useState<number>(0);

  const [mcqAnswers, setMcqAnswers] = useState<
    Record<string, McqOptionKey | undefined>
  >({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<
    Record<string, string>
  >({});
  const [fullSheetFiles, setFullSheetFiles] = useState<UploadedNoteFile[]>([]);
  const [perQuestionFiles, setPerQuestionFiles] = useState<
    Record<string, UploadedNoteFile[]>
  >({});
  const [questionModes, setQuestionModes] = useState<
    Record<string, AnswerInputMode>
  >({});

  const fullSheetRef = useRef<UploadedNoteFile[]>([]);
  const perQuestionRef = useRef<Record<string, UploadedNoteFile[]>>({});
  fullSheetRef.current = fullSheetFiles;
  perQuestionRef.current = perQuestionFiles;

  const revokeAllAttachedFiles = () => {
    revokeUploadedNoteFiles(fullSheetRef.current);
    Object.values(perQuestionRef.current).forEach((list) => {
      revokeUploadedNoteFiles(list);
    });
  };

  useEffect(() => {
    return () => {
      revokeAllAttachedFiles();
    };
  }, []);

  const availableSubjects = getSubjectsForClass(selectedClass);
  const availableChapters = getChaptersFor(selectedClass, selectedSubject);

  const parsedMarks = Number.parseInt(totalMarksInput, 10);
  const effectiveMarks =
    Number.isFinite(parsedMarks) && parsedMarks > 0 ? parsedMarks : 20;

  const resetAttemptState = () => {
    revokeAllAttachedFiles();
    setMcqAnswers({});
    setSubjectiveAnswers({});
    setFullSheetFiles([]);
    setPerQuestionFiles({});
    setQuestionModes({});
  };

  const handleClassChange = (nextClass: ClassLevel) => {
    setSelectedClass(nextClass);
    const nextSubjects = getSubjectsForClass(nextClass);
    const nextSubject = nextSubjects.includes(selectedSubject)
      ? selectedSubject
      : nextSubjects[0];
    setSelectedSubject(nextSubject);
    const nextChapters = getChaptersFor(nextClass, nextSubject);
    setSelectedChapter(nextChapters[0] ?? '');
  };

  const handleSubjectChange = (nextSubject: string) => {
    setSelectedSubject(nextSubject);
    const nextChapters = getChaptersFor(selectedClass, nextSubject);
    setSelectedChapter(nextChapters[0] ?? '');
  };

  const handleGenerate = () => {
    if (
      !totalMarksInput.trim() ||
      !Number.isFinite(parsedMarks) ||
      parsedMarks < 1
    ) {
      setTotalMarksInput('20');
    }
    resetAttemptState();
    setProgress(0);
    setStep('loading');
  };

  useEffect(() => {
    if (step !== 'loading' && step !== 'submitting') return;

    const duration =
      step === 'loading' ? GENERATION_DURATION_MS : SUBMISSION_TRANSITION_MS;
    const nextStep: BuilderStep = step === 'loading' ? 'paper' : 'review';
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      const nextProgress = Math.floor(ratio * 100);
      setProgress(nextProgress);

      if (ratio < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setStep(nextStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [step]);

  const getLoaderStatus = (pct: number): string => {
    const cleanChapter = selectedChapter.replace(/\s*\(Cell\)\s*$/, '');
    if (pct < 25) {
      return `Parsing NCERT ${selectedClass} ${selectedSubject} curriculum context...`;
    }
    if (pct < 55) {
      return `Retrieving chapter questions — ${cleanChapter}...`;
    }
    if (pct < 82) {
      return `Structuring ${effectiveMarks}-mark CBSE blueprint (Sections A, B, C & D)...`;
    }
    return 'Calibrating step-marking rubrics & case-study sub-parts...';
  };

  const handleSelectMcq = (questionId: string, option: McqOptionKey) => {
    setMcqAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleChangeSubjective = (questionId: string, value: string) => {
    setSubjectiveAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handlePerQuestionFilesChange = (
    questionId: string,
    nextFiles: UploadedNoteFile[],
  ) => {
    setPerQuestionFiles((prev) => ({ ...prev, [questionId]: nextFiles }));
  };

  const handleChangeQuestionMode = (
    questionId: string,
    mode: AnswerInputMode,
  ) => {
    setQuestionModes((prev) => ({ ...prev, [questionId]: mode }));
  };

  const handleSubmitPaper = () => {
    const hasHandwrittenAttachments =
      fullSheetFiles.length > 0 ||
      Object.values(perQuestionFiles).some((list) => list.length > 0);

    if (hasHandwrittenAttachments) {
      setProgress(0);
      setStep('submitting');
    } else {
      setStep('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRetake = () => {
    resetAttemptState();
    setStep('paper');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 'loading' || step === 'submitting') {
    const strokeOffset = CIRCLE_CIRCUMFERENCE * (1 - progress / 100);
    const statusText =
      step === 'submitting'
        ? 'Processing handwritten submissions & compiling NCERT answer key...'
        : getLoaderStatus(progress);

    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm px-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#1e293b"
              strokeWidth="10"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="10"
              strokeLinecap="round"
              style={{
                strokeDasharray: CIRCLE_CIRCUMFERENCE,
                strokeDashoffset: strokeOffset,
                transform: 'rotate(-90deg)',
                transformOrigin: 'center',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-purple-300 drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">
            {progress}%
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base tracking-wide mt-6 animate-pulse text-center max-w-md">
          {statusText}
        </p>
      </div>
    );
  }

  if (step === 'paper') {
    return (
      <TestPaperView
        template={CELL_20_MARK_TEMPLATE}
        mcqAnswers={mcqAnswers}
        subjectiveAnswers={subjectiveAnswers}
        fullSheetFiles={fullSheetFiles}
        perQuestionFiles={perQuestionFiles}
        questionModes={questionModes}
        onSelectMcq={handleSelectMcq}
        onChangeSubjective={handleChangeSubjective}
        onFullSheetFilesChange={setFullSheetFiles}
        onPerQuestionFilesChange={handlePerQuestionFilesChange}
        onChangeQuestionMode={handleChangeQuestionMode}
        onEditConfig={() => setStep('config')}
        onSubmit={handleSubmitPaper}
        onBackToHub={onBack}
      />
    );
  }

  if (step === 'review') {
    return (
      <TestEvaluationReview
        template={CELL_20_MARK_TEMPLATE}
        mcqAnswers={mcqAnswers}
        subjectiveAnswers={subjectiveAnswers}
        fullSheetFiles={fullSheetFiles}
        perQuestionFiles={perQuestionFiles}
        onRetake={handleRetake}
        onEditConfig={() => setStep('config')}
        onBackToHub={onBack}
      />
    );
  }

  const blueprintBadgeText =
    effectiveMarks === 20
      ? '5×1M MCQ • 3×2M Short • 1×3M Structured • 1×6M Case Study'
      : `Total: ${effectiveMarks} Marks • Multi-Section CBSE Format`;

  return (
    <div className="space-y-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-purple-300 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Test Generator</span>
      </button>

      <div>
        <h2 className="text-2xl text-slate-100 font-bold tracking-tight">
          Create New Test
        </h2>
        <p className="text-slate-400 mt-2">
          Configure your class, subject, NCERT chapter, and target marks to generate your assessment paper.
        </p>
      </div>

      {/* 4 Configuration Sandboxes (2x2 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sandbox Box 1: Class */}
        <div className="bg-[#161618] border border-white/10 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-200 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <label
                htmlFor="tg-class-select"
                className="text-sm font-bold text-slate-100 block"
              >
                Class
              </label>
              <span className="text-xs text-slate-400">
                Select NCERT grade level
              </span>
            </div>
          </div>

          <div className="relative">
            <select
              id="tg-class-select"
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value as ClassLevel)}
              className={SELECT_CLASSES}
            >
              {CLASS_LEVELS.map((cls) => (
                <option key={cls} value={cls} className="bg-[#0e0e10] text-[#e3e3e4]">
                  {cls}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Sandbox Box 2: Subject */}
        <div className="bg-[#161618] border border-white/10 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-200 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <label
                htmlFor="tg-subject-select"
                className="text-sm font-bold text-slate-100 block"
              >
                Subject
              </label>
              <span className="text-xs text-slate-400">
                Filtered for {selectedClass}
              </span>
            </div>
          </div>

          <div className="relative">
            <select
              id="tg-subject-select"
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className={SELECT_CLASSES}
            >
              {availableSubjects.map((subj) => (
                <option key={subj} value={subj} className="bg-[#0e0e10] text-[#e3e3e4]">
                  {subj}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Sandbox Box 3: Chapter */}
        <div className="bg-[#161618] border border-white/10 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-200 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <label
                htmlFor="tg-chapter-select"
                className="text-sm font-bold text-slate-100 block"
              >
                Chapter
              </label>
              <span className="text-xs text-slate-400">
                {selectedClass} • {selectedSubject} syllabus
              </span>
            </div>
          </div>

          <div className="relative">
            <select
              id="tg-chapter-select"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className={SELECT_CLASSES}
            >
              {availableChapters.map((chap) => (
                <option key={chap} value={chap} className="bg-[#0e0e10] text-[#e3e3e4]">
                  {chap}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Sandbox Box 4: Total Marks (Enterable Numeric Input — NOT a Dropdown) */}
        <div className="bg-[#161618] border border-white/10 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-200 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <label
                htmlFor="tg-total-marks-input"
                className="text-sm font-bold text-slate-100 block"
              >
                Total Marks
              </label>
              <span className="text-xs text-slate-400">
                Enter target marks (e.g. 10–80)
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <input
                id="tg-total-marks-input"
                type="number"
                min={1}
                max={100}
                value={totalMarksInput}
                onChange={(e) => setTotalMarksInput(e.target.value)}
                placeholder="20"
                className="w-full bg-[#0e0e10] border border-white/[0.08] rounded-lg px-4 py-3 pr-16 text-sm font-semibold text-[#e3e3e4] placeholder:text-[#6a6f78] focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
                Marks
              </span>
            </div>

            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-300">
              {blueprintBadgeText}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Generate CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleGenerate}
          className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-3.5 px-8 rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.45)] transition-all cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          <span>Generate Test Paper</span>
        </button>
      </div>
    </div>
  );
}
