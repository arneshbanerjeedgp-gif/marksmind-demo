import React, { useEffect, useId, useRef, useState } from 'react';
import {
  AlertCircle,
  Camera,
  FileText,
  Plus,
  Sparkles,
  UploadCloud,
  X,
  ZoomIn,
} from 'lucide-react';

export interface UploadedNoteFile {
  id: string;
  file: File;
  name: string;
  sizeBytes: number;
  formattedSize: string;
  mimeType: string;
  isPdf: boolean;
  previewUrl: string | null;
}

const ACCEPTED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
]);

const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];

const DEFAULT_MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function revokeUploadedNoteFiles(files: UploadedNoteFile[]): void {
  files.forEach((item) => {
    if (item.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }
  });
}

function isSupportedNoteFile(file: File): boolean {
  if (ACCEPTED_MIME_TYPES.has(file.type)) return true;
  const lower = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function isPdfNoteFile(file: File): boolean {
  return (
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  );
}

interface HandwrittenLightboxModalProps {
  image: { url: string; name: string; pageLabel?: string; size?: string } | null;
  onClose: () => void;
}

/**
 * Full-screen image zoom modal for inspecting uploaded handwritten notebook pages.
 */
export function HandwrittenLightboxModal({
  image,
  onClose,
}: HandwrittenLightboxModalProps) {
  useEffect(() => {
    if (!image) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.name}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-[#161618] border border-purple-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-3">
          <div className="flex flex-wrap items-center gap-2.5 min-w-0">
            {image.pageLabel && (
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                {image.pageLabel}
              </span>
            )}
            <span className="text-sm font-semibold text-slate-100 truncate">
              {image.name}
            </span>
            {image.size && (
              <span className="text-xs text-slate-400">{image.size}</span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="p-2 rounded-lg bg-[#0e0e10] border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-center bg-[#09090b] rounded-xl border border-white/[0.06] p-2 overflow-hidden">
          <img
            src={image.url}
            alt={image.name}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

interface UploadedNotesPreviewGridProps {
  files: UploadedNoteFile[];
  onRemove?: (fileId: string) => void;
  compact?: boolean;
}

/**
 * Displays live image thumbnails (with click-to-zoom lightbox) and PDF cards for uploaded files.
 */
export function UploadedNotesPreviewGrid({
  files,
  onRemove,
  compact = false,
}: UploadedNotesPreviewGridProps) {
  const [zoomedFile, setZoomedFile] = useState<UploadedNoteFile | null>(null);
  const [zoomedPageNumber, setZoomedPageNumber] = useState<number>(1);

  if (files.length === 0) return null;

  return (
    <>
      <div
        className={`grid gap-3 ${
          compact
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {files.map((item, idx) => {
          const pageLabel = `Page ${idx + 1}`;
          return (
            <div
              key={item.id}
              className="group relative bg-[#0e0e10] border border-white/[0.08] hover:border-purple-500/40 rounded-xl p-2.5 transition-all flex flex-col gap-2"
            >
              {item.isPdf ? (
                <div
                  className={`flex items-center gap-3 rounded-lg bg-[#161618] border border-white/[0.05] px-3 ${
                    compact ? 'py-3' : 'py-5'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider text-purple-300 mb-1">
                      {pageLabel} • PDF
                    </span>
                    <p className="text-xs font-semibold text-slate-200 truncate">
                      {item.name}
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setZoomedFile(item);
                    setZoomedPageNumber(idx + 1);
                  }}
                  className={`relative w-full overflow-hidden rounded-lg bg-[#161618] border border-white/[0.05] cursor-zoom-in text-left ${
                    compact ? 'h-28' : 'h-36'
                  }`}
                >
                  {item.previewUrl && (
                    <img
                      src={item.previewUrl}
                      alt={`${pageLabel} - ${item.name}`}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                    />
                  )}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/75 border border-purple-500/40 text-[11px] font-semibold text-purple-200 backdrop-blur-sm">
                    {pageLabel}
                  </span>
                  <span className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/70 border border-white/15 text-slate-200 opacity-85 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </span>
                </button>
              )}

              <div className="flex items-center justify-between gap-2 px-0.5">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-200 truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {item.formattedSize}
                  </p>
                </div>

                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="p-1.5 rounded-lg bg-[#161618] border border-white/10 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <HandwrittenLightboxModal
        image={
          zoomedFile?.previewUrl
            ? {
                url: zoomedFile.previewUrl,
                name: zoomedFile.name,
                pageLabel: `Page ${zoomedPageNumber}`,
                size: zoomedFile.formattedSize,
              }
            : null
        }
        onClose={() => setZoomedFile(null)}
      />
    </>
  );
}

interface HandwrittenUploadZoneProps {
  files: UploadedNoteFile[];
  onFilesChange: (nextFiles: UploadedNoteFile[]) => void;
  variant?: 'standard' | 'compact';
  multiple?: boolean;
  maxFiles?: number;
  maxSizeBytes?: number;
  heading?: string;
  subtext?: string;
}

function validateAndCreateNotes(
  fileList: FileList | null,
  existingFiles: UploadedNoteFile[],
  multiple: boolean,
  maxFiles: number,
  maxSizeBytes: number,
): { nextFiles: UploadedNoteFile[] | null; error: string | null } {
  if (!fileList || fileList.length === 0) {
    return { nextFiles: null, error: null };
  }

  const effectiveMaxFiles = multiple ? maxFiles : 1;
  const incoming = Array.from(fileList);
  const errors: string[] = [];
  const accepted: UploadedNoteFile[] = [];

  let remainingSlots = multiple
    ? Math.max(0, effectiveMaxFiles - existingFiles.length)
    : 1;

  for (const file of incoming) {
    if (!isSupportedNoteFile(file)) {
      errors.push(
        `Unsupported format for "${file.name}". Use JPG, PNG, WEBP, or PDF.`,
      );
      continue;
    }
    if (file.size > maxSizeBytes) {
      errors.push(
        `"${file.name}" exceeds the ${formatFileSize(maxSizeBytes)} limit.`,
      );
      continue;
    }
    if (remainingSlots <= 0) {
      errors.push(
        `Maximum of ${effectiveMaxFiles} ${
          effectiveMaxFiles === 1 ? 'page' : 'pages'
        } allowed.`,
      );
      break;
    }

    const isPdf = isPdfNoteFile(file);
    accepted.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      file,
      name: file.name,
      sizeBytes: file.size,
      formattedSize: formatFileSize(file.size),
      mimeType: file.type || (isPdf ? 'application/pdf' : 'image/jpeg'),
      isPdf,
      previewUrl: isPdf ? null : URL.createObjectURL(file),
    });
    remainingSlots--;
  }

  if (accepted.length === 0) {
    return { nextFiles: null, error: errors[0] ?? null };
  }

  if (!multiple) {
    revokeUploadedNoteFiles(existingFiles);
    return { nextFiles: accepted.slice(0, 1), error: errors[0] ?? null };
  }

  return {
    nextFiles: [...existingFiles, ...accepted],
    error: errors[0] ?? null,
  };
}

/**
 * Shared drag-and-drop and click-to-upload handwritten notebook zone with instant thumbnails,
 * PDF cards, inline validation, and click-to-zoom lightbox support.
 */
export default function HandwrittenUploadZone({
  files,
  onFilesChange,
  variant = 'standard',
  multiple = true,
  maxFiles = 5,
  maxSizeBytes = DEFAULT_MAX_BYTES,
  heading,
  subtext,
}: HandwrittenUploadZoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const effectiveMaxFiles = multiple ? maxFiles : 1;
  const isCompact = variant === 'compact';

  const processIncomingFiles = (fileList: FileList | null) => {
    const { nextFiles, error } = validateAndCreateNotes(
      fileList,
      files,
      multiple,
      maxFiles,
      maxSizeBytes,
    );
    setErrorMessage(error);
    if (nextFiles) {
      onFilesChange(nextFiles);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    const target = files.find((f) => f.id === fileId);
    if (target?.previewUrl) {
      URL.revokeObjectURL(target.previewUrl);
    }
    setErrorMessage(null);
    onFilesChange(files.filter((f) => f.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processIncomingFiles(e.dataTransfer.files);
  };

  const triggerFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      {(heading || subtext) && (
        <div className="space-y-1">
          {heading && (
            <h4 className="text-sm font-semibold text-slate-100">{heading}</h4>
          )}
          {subtext && <p className="text-xs text-slate-400">{subtext}</p>}
        </div>
      )}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        multiple={multiple}
        onChange={(e) => {
          processIncomingFiles(e.target.files);
          e.target.value = '';
        }}
        className="hidden"
      />

      {files.length === 0 ? (
        <div
          role="button"
          tabIndex={0}
          onClick={triggerFilePicker}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              triggerFilePicker();
            }
          }}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full rounded-xl border border-dashed transition-all duration-200 cursor-pointer flex ${
            isDragging
              ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(139,92,246,0.2)]'
              : 'border-[#2e2e3a] hover:border-purple-500/60 bg-[#0e0e10] hover:bg-[#131318]'
          } ${
            isCompact
              ? 'flex-row items-center justify-between gap-4 px-4 py-3.5'
              : 'flex-col items-center justify-center text-center px-6 py-10 min-h-[220px]'
          }`}
        >
          <div
            className={`flex items-center ${
              isCompact ? 'gap-3 text-left' : 'flex-col gap-3'
            }`}
          >
            <div
              className={`rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 ${
                isCompact ? 'w-9 h-9' : 'w-12 h-12'
              }`}
            >
              {isCompact ? (
                <Camera className="w-4 h-4" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>
            <div>
              <p
                className={`font-semibold text-slate-200 ${
                  isCompact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
                }`}
              >
                Drop handwritten notes here or click to upload
              </p>
              <p className="text-xs text-slate-400 mt-1">
                JPG, PNG, WEBP, PDF • Up to {formatFileSize(maxSizeBytes)}
                {multiple ? ` • Max ${effectiveMaxFiles} pages` : ''}
              </p>
            </div>
          </div>

          {isCompact && (
            <span className="shrink-0 px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/30 text-xs font-semibold text-purple-300">
              Browse
            </span>
          )}
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`space-y-3 rounded-xl transition-colors ${
            isDragging ? 'ring-2 ring-purple-500/60 bg-purple-500/5 p-2' : ''
          }`}
        >
          <UploadedNotesPreviewGrid
            files={files}
            onRemove={handleRemoveFile}
            compact={isCompact}
          />

          {multiple && files.length < effectiveMaxFiles && (
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={triggerFilePicker}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0e0e10] border border-white/10 hover:border-purple-500/60 text-xs font-semibold text-purple-300 hover:text-purple-200 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Page</span>
              </button>
              <span className="text-xs text-slate-400">
                {files.length} / {effectiveMaxFiles} pages attached
              </span>
            </div>
          )}
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="flex items-center justify-between gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 text-xs text-red-400"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            aria-label="Dismiss error"
            className="text-red-400/80 hover:text-red-300 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

interface CompactHandwrittenUploadBarProps {
  files: UploadedNoteFile[];
  onFilesChange: (nextFiles: UploadedNoteFile[]) => void;
  onEvaluateSheet: () => void;
  title?: string;
  coverageBadge?: string;
  subtitle?: string;
  maxFiles?: number;
  maxSizeBytes?: number;
}

/**
 * Sleek compact top horizontal upload bar (~64-84px tall on desktop) covering all exam sections
 * with instant thumbnail preview, zoom lightbox, and direct Evaluate Sheet CTA.
 */
export function CompactHandwrittenUploadBar({
  files,
  onFilesChange,
  onEvaluateSheet,
  title = 'Upload Handwritten Answer Sheet',
  coverageBadge = 'All Sections (A–D)',
  subtitle = 'Wrote all answers on paper? Upload your sheet for instant CEDA OCR evaluation.',
  maxFiles = 8,
  maxSizeBytes = DEFAULT_MAX_BYTES,
}: CompactHandwrittenUploadBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [zoomedFile, setZoomedFile] = useState<UploadedNoteFile | null>(null);
  const [zoomedPage, setZoomedPage] = useState<number>(1);

  const processIncomingFiles = (fileList: FileList | null) => {
    const { nextFiles, error } = validateAndCreateNotes(
      fileList,
      files,
      true,
      maxFiles,
      maxSizeBytes,
    );
    setErrorMessage(error);
    if (nextFiles) {
      onFilesChange(nextFiles);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    const target = files.find((f) => f.id === fileId);
    if (target?.previewUrl) {
      URL.revokeObjectURL(target.previewUrl);
    }
    setErrorMessage(null);
    onFilesChange(files.filter((f) => f.id !== fileId));
  };

  const primaryFile = files[0];

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        multiple={true}
        onChange={(e) => {
          processIncomingFiles(e.target.files);
          e.target.value = '';
        }}
        className="hidden"
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!isDragging) setIsDragging(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
          processIncomingFiles(e.dataTransfer.files);
        }}
        className={`rounded-2xl border px-4 sm:px-5 py-3 transition-all duration-200 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${
          isDragging
            ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(139,92,246,0.2)]'
            : 'bg-[#161618] border-purple-500/30 hover:border-purple-500/50'
        }`}
      >
        {files.length === 0 ? (
          <>
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-100">{title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[11px] font-semibold text-purple-300">
                    {coverageBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 truncate">
                  {subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-dashed border-purple-500/50 hover:border-purple-400 bg-[#0e0e10] hover:bg-purple-500/10 text-xs sm:text-sm font-semibold text-purple-300 hover:text-purple-200 transition-all cursor-pointer shrink-0"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Image / PDF</span>
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex items-center gap-2 shrink-0">
                {files.slice(0, 3).map((item, idx) =>
                  item.isPdf ? (
                    <div
                      key={item.id}
                      className="relative w-12 h-12 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300"
                      title={item.name}
                    >
                      <FileText className="w-5 h-5" />
                    </div>
                  ) : (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setZoomedFile(item);
                        setZoomedPage(idx + 1);
                      }}
                      title="Click to inspect full image"
                      className="relative w-12 h-12 rounded-lg overflow-hidden border border-purple-500/40 bg-[#0e0e10] cursor-zoom-in group"
                    >
                      {item.previewUrl && (
                        <img
                          src={item.previewUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                      <span className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-3.5 h-3.5 text-white" />
                      </span>
                    </button>
                  ),
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] font-semibold text-purple-300">
                    {coverageBadge}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">
                    {files.length} {files.length === 1 ? 'file' : 'files'}{' '}
                    ready
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                  {primaryFile.name}
                  <span className="text-slate-400 font-normal ml-1.5">
                    ({primaryFile.formattedSize})
                  </span>
                  {files.length > 1 && (
                    <span className="text-purple-300 ml-1.5">
                      +{files.length - 1} more
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              {files.length < maxFiles && (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  title="Add another page"
                  className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg bg-[#0e0e10] border border-white/10 hover:border-purple-500/50 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  revokeUploadedNoteFiles(files);
                  setErrorMessage(null);
                  onFilesChange([]);
                }}
                aria-label="Remove uploaded sheet"
                title="Remove uploaded sheet"
                className="p-2 rounded-lg bg-[#0e0e10] border border-white/10 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onEvaluateSheet}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Evaluate Sheet</span>
              </button>
            </div>
          </>
        )}
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="flex items-center justify-between gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3.5 py-2 text-xs text-red-400"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            aria-label="Dismiss error"
            className="text-red-400/80 hover:text-red-300 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <HandwrittenLightboxModal
        image={
          zoomedFile?.previewUrl
            ? {
                url: zoomedFile.previewUrl,
                name: zoomedFile.name,
                pageLabel: `Page ${zoomedPage}`,
                size: zoomedFile.formattedSize,
              }
            : null
        }
        onClose={() => setZoomedFile(null)}
      />
    </div>
  );
}
