import React, { useState } from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import {
  PROGRESS_KPIS,
  SUBJECT_FILTERS,
  SUBJECT_PERFORMANCE,
  TEST_PROGRESS_REPORTS,
  type MistakeSegment,
  type ReportStatusVariant,
  type SubjectFilter,
} from './progressReportsData';

interface TrackProgressViewProps {
  onBack: () => void;
}

const STATUS_STYLE_MAP: Record<
  ReportStatusVariant,
  { cardBorder: string; badge: string; score: string }
> = {
  top: {
    cardBorder: 'border-emerald-500/30 hover:border-emerald-500/50',
    badge: 'bg-green-500/10 text-green-400 border-green-500/20',
    score: 'text-emerald-400',
  },
  strong: {
    cardBorder: 'border-purple-500/30 hover:border-purple-500/50',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    score: 'text-purple-400',
  },
  'needs-revision': {
    cardBorder: 'border-amber-500/30 hover:border-amber-500/50',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    score: 'text-amber-400',
  },
};

function renderMistakeSegments(segments: MistakeSegment[]) {
  return segments.map((segment, index) => {
    if (typeof segment === 'string') {
      return <React.Fragment key={index}>{segment}</React.Fragment>;
    }
    if ('bold' in segment) {
      return (
        <strong key={index} className="font-semibold text-slate-100">
          {segment.bold}
        </strong>
      );
    }
    return (
      <code
        key={index}
        className="px-1.5 py-0.5 rounded bg-slate-800 text-purple-300 font-mono text-xs"
      >
        {segment.code}
      </code>
    );
  });
}

/**
 * Displays completed test KPIs, subject mastery bars, subject filters, and chapter mistake reports.
 */
export default function TrackProgressView({ onBack }: TrackProgressViewProps) {
  const [selectedSubject, setSelectedSubject] =
    useState<SubjectFilter>('All Subjects');

  const filteredReports =
    selectedSubject === 'All Subjects'
      ? TEST_PROGRESS_REPORTS
      : TEST_PROGRESS_REPORTS.filter(
          (report) => report.subject === selectedSubject,
        );

  return (
    <div className="space-y-6">
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
          Track Progress
        </h2>
        <p className="text-slate-400 mt-2">
          Chapter-wise test performance, subject accuracy, and recurring conceptual mistakes.
        </p>
      </div>

      {/* Top KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROGRESS_KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-700"
          >
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
              {kpi.label}
            </p>
            <p className={`text-3xl font-extrabold ${kpi.valueColorClass}`}>
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Subject Performance Bars */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-slate-200 mb-6">
          Subject Performance
        </h3>
        <div className="space-y-4">
          {SUBJECT_PERFORMANCE.map((item) => (
            <div key={item.subject}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-300">
                  {item.subject}
                </span>
                <span className="text-sm font-bold text-slate-400">
                  {item.percentage}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full">
                <div
                  className={`${item.barClass} h-2 rounded-full`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap gap-3 pt-2">
        {SUBJECT_FILTERS.map((subject) => {
          const isActive = selectedSubject === subject;
          return (
            <button
              key={subject}
              type="button"
              onClick={() => setSelectedSubject(subject)}
              className={
                isActive
                  ? 'px-5 py-2 text-sm font-semibold rounded-full bg-slate-800 text-white border border-slate-700 transition-colors cursor-pointer'
                  : 'px-5 py-2 text-sm font-semibold rounded-full bg-slate-900/50 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer'
              }
            >
              {subject}
            </button>
          );
        })}
      </div>

      {/* Detailed Test Progress Report Cards */}
      <div className="space-y-4">
        {filteredReports.map((report) => {
          const styles = STATUS_STYLE_MAP[report.statusVariant];
          return (
            <article
              key={report.id}
              className={`bg-slate-900/50 border ${styles.cardBorder} rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="bg-slate-800/80 text-slate-200 px-2.5 py-1 rounded text-xs uppercase tracking-wide border border-slate-700 font-semibold">
                      {report.subject} | Chapter: {report.chapter}
                    </span>
                    <span
                      className={`${styles.badge} px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold border`}
                    >
                      {report.statusLabel}
                    </span>
                  </div>
                  <p className="text-slate-200 font-semibold text-base">
                    {report.summaryLine}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 shrink-0 bg-[#161618] border border-white/10 rounded-xl px-4 py-2.5">
                  <span className={`text-xl font-extrabold ${styles.score}`}>
                    {report.marksScored} / {report.maxMarks}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    ({report.percentage}%)
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">
                  Common Mistakes
                </p>
                <ul className="space-y-2.5">
                  {report.commonMistakes.map((mistake, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{renderMistakeSegments(mistake)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
