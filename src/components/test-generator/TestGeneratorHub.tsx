import React, { useState } from 'react';
import {
  BarChart3,
  FilePlus2,
  FileText,
  FolderPlus,
  Layers,
  Youtube,
} from 'lucide-react';
import CreateNewTestContainer from './CreateNewTestContainer';
import TrackProgressView from './TrackProgressView';

type HubView = 'hub' | 'create-new' | 'track-progress';

const CUSTOM_SOURCES = [
  { label: 'PDF Upload', Icon: FileText },
  { label: 'YouTube Links', Icon: Youtube },
  { label: 'Custom Sources', Icon: FolderPlus },
] as const;

/**
 * Three-sandbox hub for Test Generator: Create New Test, Create Custom Test, and Track Progress.
 */
export default function TestGeneratorHub() {
  const [activeView, setActiveView] = useState<HubView>('hub');

  if (activeView === 'create-new') {
    return <CreateNewTestContainer onBack={() => setActiveView('hub')} />;
  }

  if (activeView === 'track-progress') {
    return <TrackProgressView onBack={() => setActiveView('hub')} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-slate-100 font-bold tracking-tight">
          Test Generator
        </h2>
        <p className="text-slate-400 mt-2">
          Build curriculum tests, explore custom-source generation, and track chapter-wise performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full pt-4">
        {/* Sandbox 1: Create New Test */}
        <div
          onClick={() => setActiveView('create-new')}
          className="p-6 rounded-2xl flex flex-col justify-between bg-[#161618] border border-white/10 hover:border-purple-500/80 hover:bg-[#1e1e24] transition-all duration-200 cursor-pointer text-left shadow-lg group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5">
              <FilePlus2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-purple-400 group-hover:text-purple-300">
              Create New Test
            </h3>
            <p className="text-sm text-neutral-400 font-medium mt-2 leading-relaxed">
              Generate curriculum-aligned NCERT assessments tailored by class, subject, chapter, and question format.
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveView('create-new');
            }}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Create New Test
          </button>
        </div>

        {/* Sandbox 2: Create Custom Test (Interactive Visual Card -> # Hash Link Only) */}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="p-6 rounded-2xl flex flex-col justify-between bg-[#161618] border border-white/10 hover:border-purple-500/80 hover:bg-[#1e1e24] active:scale-[0.99] transition-all duration-200 cursor-pointer text-left shadow-lg group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5">
              <Layers className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-purple-400 group-hover:text-purple-300">
              Create Custom Test
            </h3>
            <p className="text-sm text-neutral-400 font-medium mt-2 leading-relaxed">
              Create personalised tests directly from your own study materials—upload PDFs, paste YouTube lecture links, or import custom sources.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {CUSTOM_SOURCES.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-300"
                >
                  <Icon className="w-3.5 h-3.5 text-purple-400" />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>

          <span className="mt-6 w-full bg-purple-600 group-hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center block">
            Create Custom Test
          </span>
        </a>

        {/* Sandbox 3: Track Progress */}
        <div
          onClick={() => setActiveView('track-progress')}
          className="p-6 rounded-2xl flex flex-col justify-between bg-[#161618] border border-white/10 hover:border-purple-500/80 hover:bg-[#1e1e24] transition-all duration-200 cursor-pointer text-left shadow-lg group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-purple-400 group-hover:text-purple-300">
              Track Progress
            </h3>
            <p className="text-sm text-neutral-400 font-medium mt-2 leading-relaxed">
              Review chapter-wise test scores, subject mastery trends, and recurring conceptual mistakes across completed assessments.
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveView('track-progress');
            }}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Track Progress
          </button>
        </div>
      </div>
    </div>
  );
}
