import React from 'react';
import { ArrowLeft, FilePlus2 } from 'lucide-react';

interface CreateNewTestContainerProps {
  onBack: () => void;
  children?: React.ReactNode;
}

/**
 * Minimal Phase 1 mount container for the upcoming Create New Test builder workflow.
 */
export default function CreateNewTestContainer({
  onBack,
  children,
}: CreateNewTestContainerProps) {
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
          Create New Test
        </h2>
        <p className="text-slate-400 mt-2">
          Configure curriculum parameters and build a new assessment.
        </p>
      </div>

      {children ?? (
        <div className="bg-[#161618] border border-white/10 rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-8">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <FilePlus2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              Test Builder Workspace
            </h3>
            <p className="text-sm text-neutral-400 font-medium mt-2 leading-relaxed">
              This modular workspace is ready for syllabus selection and test configuration.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
