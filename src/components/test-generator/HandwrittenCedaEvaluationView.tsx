import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  RotateCcw,
  Sparkles,
  XCircle,
  ZoomIn,
} from 'lucide-react';
import {
  HandwrittenLightboxModal,
  type UploadedNoteFile,
} from '../shared/HandwrittenUploadZone';
import type {
  EvaluationVerdict,
  HandwrittenCedaEvaluationReport,
  HandwrittenSubjectiveEvaluationItem,
} from './templates/cellHandwrittenEvaluation';

interface HandwrittenCedaEvaluationViewProps {
  report: HandwrittenCedaEvaluationReport;
  uploadedFiles: UploadedNoteFile[];
  onRetake: () => void;
  onEditConfig: () => void;
  onBackToHub: () => void;
}

const VERDICT_STYLES: Record<
  EvaluationVerdict,
  { badge: string; scorePill: string; border: string }
> = {
  Correct: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    scorePill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    border: 'border-white/10 hover:border-emerald-500/40',
  },
  Partial: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
    scorePill: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    border: 'border-amber-500/25 hover:border-amber-500/45',
  },
  Incorrect: {
    badge: 'bg-red-500/10 text-red-400 border-red-500/25',
    scorePill: 'bg-red-500/15 text-red-300 border-red-500/30',
    border: 'border-red-500/25 hover:border-red-500/45',
  },
};

function SubjectiveEvaluationCard({
  item,
}: {
  item: HandwrittenSubjectiveEvaluationItem;
}) {
  const styles = VERDICT_STYLES[item.verdict];
  return (
    <div
      className={`bg-[#161618] border ${styles.border} rounded-2xl p-6 space-y-5 shadow-lg transition-colors`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <p className="text-base font-semibold text-slate-100 leading-relaxed">
          <span className="text-purple-400 mr-2">{item.label}.</span>
          {item.question}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles.badge}`}
          >
            {item.verdict}
          </span>
          <span
            className={`px-3 py-1 rounded-md text-xs font-bold border ${styles.scorePill}`}
          >
            {item.marksAwarded} / {item.maxMarks}{' '}
            {item.maxMarks === 1 ? 'Mark' : 'Marks'}
          </span>
        </div>
      </div>

      {/* Extracted Handwritten Response */}
      <div className="bg-[#0e0e10] border border-white/[0.06] rounded-xl p-4 space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Extracted Handwritten Response
        </h4>
        <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed font-mono">
          {item.extractedAnswer}
        </p>
      </div>

      {/* CEDA Step-Marking Analysis */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300">
          CEDA Step-Marking Analysis
        </h4>

        {item.conceptsCaptured.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-400">
              Concepts Captured
            </p>
            <div className="flex flex-wrap gap-2">
              {item.conceptsCaptured.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{chip}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {item.defectMessage && (
          <div
            className={`rounded-lg p-3 border text-xs sm:text-sm leading-relaxed flex items-start gap-2.5 ${
              item.verdict === 'Incorrect'
                ? 'bg-red-950/30 border-red-500/25 text-red-300'
                : 'bg-amber-950/25 border-amber-500/25 text-amber-300'
            }`}
          >
            {item.verdict === 'Incorrect' ? (
              <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block text-xs uppercase tracking-wider mb-0.5">
                {item.defectCalloutTitle ?? 'Missing Scientific Parameters'}
              </span>
              <span>{item.defectMessage}</span>
            </div>
          </div>
        )}

        {!item.defectMessage && item.noMissingMessage && (
          <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>
              Missing Scientific Parameters: {item.noMissingMessage}
            </span>
          </p>
        )}
      </div>

      {/* NCERT Benchmark Answer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          NCERT Benchmark Answer
        </h4>
        <p className="text-sm text-slate-200 leading-relaxed">
          {item.benchmarkAnswer}
        </p>
      </div>
    </div>
  );
}

/**
 * Full CEDA OCR & step-marking evaluation report view for uploaded handwritten exam scripts.
 */
export default function HandwrittenCedaEvaluationView({
  report,
  uploadedFiles,
  onRetake,
  onEditConfig,
  onBackToHub,
}: HandwrittenCedaEvaluationViewProps) {
  const [zoomedImage, setZoomedImage] = useState<{
    url: string;
    name: string;
    pageLabel?: string;
    size?: string;
  } | null>(null);

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

      {/* Top Hero Score Banner */}
      <div className="bg-gradient-to-br from-[#161618] via-[#161618] to-purple-950/20 border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evaluated via Handwritten Script • CEDA OCR</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
              {report.title}
            </h2>
            {/* 4-Pill Section Breakdown */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-[#0e0e10] border border-white/10 text-xs font-semibold text-slate-200">
                Section A: {report.sectionTotals.sectionA.awarded}/
                {report.sectionTotals.sectionA.max}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0e0e10] border border-white/10 text-xs font-semibold text-slate-200">
                Section B: {report.sectionTotals.sectionB.awarded}/
                {report.sectionTotals.sectionB.max}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0e0e10] border border-white/10 text-xs font-semibold text-slate-200">
                Section C: {report.sectionTotals.sectionC.awarded}/
                {report.sectionTotals.sectionC.max}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0e0e10] border border-white/10 text-xs font-semibold text-slate-200">
                Section D: {report.sectionTotals.sectionD.awarded}/
                {report.sectionTotals.sectionD.max}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#0e0e10] border border-purple-500/30 rounded-2xl px-6 py-5 shrink-0">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Total Score
              </p>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl font-extrabold text-slate-100">
                  {report.totalMarksAwarded} / {report.maxMarks}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-sm font-bold text-amber-300">
                  {report.percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Compact Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/[0.06]">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Full Marks
            </span>
            <span className="text-xl font-extrabold text-emerald-400">
              {report.itemBreakdown.fullMarksCount}
            </span>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Partial Credit
            </span>
            <span className="text-xl font-extrabold text-amber-400">
              {report.itemBreakdown.partialCreditCount}
            </span>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-300">
              Incorrect
            </span>
            <span className="text-xl font-extrabold text-red-400">
              {report.itemBreakdown.incorrectCount}
            </span>
          </div>
        </div>
      </div>

      {/* Compact Submitted Sheet Reference Strip */}
      {uploadedFiles.length > 0 && (
        <div className="bg-[#161618] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              {uploadedFiles.map((file, idx) =>
                file.isPdf ? (
                  <div
                    key={file.id}
                    className="w-12 h-12 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300"
                    title={file.name}
                  >
                    <FileText className="w-5 h-5" />
                  </div>
                ) : (
                  <button
                    key={file.id}
                    type="button"
                    onClick={() => {
                      if (file.previewUrl) {
                        setZoomedImage({
                          url: file.previewUrl,
                          name: file.name,
                          pageLabel: `Page ${idx + 1}`,
                          size: file.formattedSize,
                        });
                      }
                    }}
                    className="relative w-14 h-14 rounded-lg overflow-hidden border border-purple-500/40 bg-[#0e0e10] cursor-zoom-in group shrink-0"
                  >
                    {file.previewUrl && (
                      <img
                        src={file.previewUrl}
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                    <span className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </span>
                  </button>
                ),
              )}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-100">
                Submitted Handwritten Answer Sheet — Click to inspect
              </p>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {uploadedFiles.map((f) => `${f.name} (${f.formattedSize})`).join(' • ')}
              </p>
            </div>
          </div>

          {uploadedFiles[0]?.previewUrl && (
            <button
              type="button"
              onClick={() =>
                setZoomedImage({
                  url: uploadedFiles[0].previewUrl!,
                  name: uploadedFiles[0].name,
                  pageLabel: 'Page 1',
                  size: uploadedFiles[0].formattedSize,
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0e0e10] border border-white/10 hover:border-purple-500/50 text-xs font-semibold text-purple-300 hover:text-purple-200 transition-colors cursor-pointer shrink-0 w-fit"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Inspect Sheet</span>
            </button>
          )}
        </div>
      )}

      {/* SECTION A — MCQs */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            SECTION A — Multiple Choice Questions
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {report.sectionTotals.sectionA.awarded} /{' '}
            {report.sectionTotals.sectionA.max} Marks
          </span>
        </div>

        <div className="space-y-4">
          {report.sectionA.map((item) => {
            const styles = VERDICT_STYLES[item.verdict];
            return (
              <div
                key={item.id}
                className={`bg-[#161618] border ${styles.border} rounded-2xl p-6 space-y-4 shadow-lg transition-colors`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <p className="text-base font-semibold text-slate-100 leading-relaxed">
                    <span className="text-purple-400 mr-2">
                      Q{item.number}.
                    </span>
                    {item.question}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles.badge}`}
                    >
                      {item.verdict}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-bold border ${styles.scorePill}`}
                    >
                      {item.marksAwarded} / {item.maxMarks} Mark
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-[#0e0e10] border border-white/[0.06] rounded-xl p-4 space-y-1.5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Extracted Handwritten Response
                    </h4>
                    <p className="text-sm text-slate-200 font-mono">
                      {item.extractedAnswer}
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1.5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      Correct NCERT Answer
                    </h4>
                    <p className="text-sm text-slate-200 font-medium">
                      {item.correctAnswer}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-purple-300 mr-1.5">
                    CEDA Feedback:
                  </span>
                  {item.cedaFeedback}
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
            SECTION B — Short Answer Questions
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {report.sectionTotals.sectionB.awarded} /{' '}
            {report.sectionTotals.sectionB.max} Marks
          </span>
        </div>

        <div className="space-y-4">
          {report.sectionB.map((item) => (
            <SubjectiveEvaluationCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* SECTION C — Structured Answer Question */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            SECTION C — Structured Answer Question
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {report.sectionTotals.sectionC.awarded} /{' '}
            {report.sectionTotals.sectionC.max} Marks
          </span>
        </div>

        <div className="space-y-4">
          {report.sectionC.map((item) => (
            <SubjectiveEvaluationCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* SECTION D — Case-Based Study Question */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            SECTION D — Case-Based Study Question
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
            {report.sectionTotals.sectionD.awarded} /{' '}
            {report.sectionTotals.sectionD.max} Marks
          </span>
        </div>

        <div className="bg-purple-950/15 border border-purple-500/30 border-l-4 border-l-purple-500 rounded-xl p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-2">
            Case Study Passage (Q10)
          </p>
          <p className="text-sm text-slate-200 italic leading-relaxed">
            {report.sectionDPassage}
          </p>
        </div>

        <div className="space-y-4">
          {report.sectionD.map((item) => (
            <SubjectiveEvaluationCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
        <button
          type="button"
          onClick={onBackToHub}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-purple-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Test Generator</span>
        </button>

        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Test</span>
        </button>
      </div>

      <HandwrittenLightboxModal
        image={zoomedImage}
        onClose={() => setZoomedImage(null)}
      />
    </div>
  );
}
