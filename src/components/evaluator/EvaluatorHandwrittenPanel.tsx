import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Camera, CheckCircle2, PenLine } from 'lucide-react';
import HandwrittenUploadZone, {
  UploadedNotesPreviewGrid,
  revokeUploadedNoteFiles,
  type UploadedNoteFile,
} from '../shared/HandwrittenUploadZone';

type EvaluatorInputMode = 'type' | 'upload';

declare global {
  interface Window {
    __marksmindEvaluatorState?: {
      mode: EvaluatorInputMode;
      files: UploadedNoteFile[];
    };
  }
}

/**
 * Integrates the Type Script | Upload Handwritten switcher and shared HandwrittenUploadZone
 * into NCERT Answer Evaluator, plus renders the evaluated handwritten thumbnail strip via portal.
 */
export default function EvaluatorHandwrittenPanel() {
  const [mode, setMode] = useState<EvaluatorInputMode>('type');
  const [files, setFiles] = useState<UploadedNoteFile[]>([]);
  const [evaluatedFromHandwritten, setEvaluatedFromHandwritten] =
    useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [resultPortalEl, setResultPortalEl] = useState<HTMLElement | null>(
    null,
  );
  const filesRef = useRef<UploadedNoteFile[]>([]);
  filesRef.current = files;

  useEffect(() => {
    setResultPortalEl(
      document.getElementById('evaluator-handwritten-result-slot'),
    );

    const handleEvalResult = (event: Event) => {
      const customEvent = event as CustomEvent<{
        evaluatedFromHandwritten?: boolean;
      }>;
      setEvaluatedFromHandwritten(
        Boolean(customEvent.detail?.evaluatedFromHandwritten),
      );
      setValidationError(null);
    };

    const handleValidationMessage = (event: Event) => {
      const customEvent = event as CustomEvent<{ message?: string | null }>;
      setValidationError(customEvent.detail?.message ?? null);
    };

    window.addEventListener('marksmind:evaluator-result', handleEvalResult);
    window.addEventListener(
      'marksmind:evaluator-validation',
      handleValidationMessage,
    );

    return () => {
      window.removeEventListener(
        'marksmind:evaluator-result',
        handleEvalResult,
      );
      window.removeEventListener(
        'marksmind:evaluator-validation',
        handleValidationMessage,
      );
      revokeUploadedNoteFiles(filesRef.current);
    };
  }, []);

  useEffect(() => {
    window.__marksmindEvaluatorState = { mode, files };

    const textarea = document.getElementById('answerInput');
    if (textarea) {
      textarea.classList.toggle('hidden', mode === 'upload');
    }

    if (files.length === 0) {
      setEvaluatedFromHandwritten(false);
    } else {
      setValidationError(null);
    }
  }, [mode, files]);

  const handleFilesChange = (nextFiles: UploadedNoteFile[]) => {
    setFiles(nextFiles);
    setValidationError(null);
  };

  return (
    <div className="space-y-4">
      {/* Header Row with Segmented Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label
          htmlFor="answerInput"
          className="text-sm font-medium text-[#c4c7c5]"
        >
          Your Answer Script
        </label>

        <div
          role="tablist"
          aria-label="Answer input mode"
          className="inline-flex items-center p-1 rounded-xl bg-[#0e0e10] border border-white/[0.08]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'type'}
            onClick={() => {
              setMode('type');
              setValidationError(null);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'type'
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Type Script</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={mode === 'upload'}
            onClick={() => {
              setMode('upload');
              setValidationError(null);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'upload'
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Upload Handwritten</span>
            {files.length > 0 && (
              <span
                className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  mode === 'upload'
                    ? 'bg-white/20 text-white'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}
              >
                {files.length} {files.length === 1 ? 'file' : 'files'}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Handwritten Upload Workspace */}
      {mode === 'upload' && (
        <HandwrittenUploadZone
          files={files}
          onFilesChange={handleFilesChange}
          variant="standard"
          multiple={true}
          maxFiles={5}
          heading="Upload Handwritten Answer Sheet"
          subtext="Snap a clear photo of your notebook answer or upload a scanned PDF for CEDA step-marking."
        />
      )}

      {validationError && (
        <p className="text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3.5 py-2.5">
          {validationError}
        </p>
      )}

      {/* Right-Hand Evaluation Panel Thumbnail Strip Portal */}
      {resultPortalEl &&
        evaluatedFromHandwritten &&
        files.length > 0 &&
        createPortal(
          <div className="bg-slate-900 border border-purple-500/30 p-5 rounded-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-semibold text-purple-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Evaluated from Handwritten Script</span>
              </span>
              <span className="text-xs text-slate-400">
                {files.length} {files.length === 1 ? 'page' : 'pages'} attached
              </span>
            </div>

            <UploadedNotesPreviewGrid files={files} compact={true} />
          </div>,
          resultPortalEl,
        )}
    </div>
  );
}
