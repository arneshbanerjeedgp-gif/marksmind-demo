export type SubjectName = 'Physics' | 'Chemistry' | 'Mathematics';
export type SubjectFilter = 'All Subjects' | SubjectName;

export type ReportStatusVariant = 'top' | 'strong' | 'needs-revision';

export type MistakeSegment =
  | string
  | { bold: string }
  | { code: string };

export interface TestProgressReport {
  id: string;
  subject: SubjectName;
  chapter: string;
  marksScored: number;
  maxMarks: number;
  percentage: number;
  statusLabel: string;
  statusVariant: ReportStatusVariant;
  summaryLine: string;
  commonMistakes: MistakeSegment[][];
}

export interface ProgressKpiItem {
  label: string;
  value: string;
  valueColorClass: string;
}

export interface SubjectPerformanceItem {
  subject: SubjectName;
  percentage: number;
  barClass: string;
}

export const PROGRESS_KPIS: ProgressKpiItem[] = [
  {
    label: 'Tests Completed',
    value: '3',
    valueColorClass: 'text-slate-100',
  },
  {
    label: 'Average Score',
    value: '79%',
    valueColorClass: 'text-purple-400',
  },
  {
    label: 'Highest Score',
    value: '85%',
    valueColorClass: 'text-emerald-400',
  },
  {
    label: 'Common Mistakes Flagged',
    value: '8',
    valueColorClass: 'text-amber-400',
  },
];

export const SUBJECT_PERFORMANCE: SubjectPerformanceItem[] = [
  {
    subject: 'Chemistry',
    percentage: 85,
    barClass: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]',
  },
  {
    subject: 'Physics',
    percentage: 80,
    barClass: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]',
  },
  {
    subject: 'Mathematics',
    percentage: 72,
    barClass: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]',
  },
];

export const SUBJECT_FILTERS: SubjectFilter[] = [
  'All Subjects',
  'Physics',
  'Chemistry',
  'Mathematics',
];

export const TEST_PROGRESS_REPORTS: TestProgressReport[] = [
  {
    id: 'physics-force-laws-of-motion',
    subject: 'Physics',
    chapter: 'Force and Laws of Motion',
    marksScored: 24,
    maxMarks: 30,
    percentage: 80,
    statusLabel: 'Strong Foundation',
    statusVariant: 'strong',
    summaryLine: 'You scored 24/30 in the Physics — Force and Laws of Motion test.',
    commonMistakes: [
      [
        'Omitted ',
        { bold: 'rate of change of momentum' },
        ' when explaining why a fielder pulls hands back while catching a fast cricket ball.',
      ],
      [
        'Confused ',
        { bold: 'inertia of motion' },
        ' with an external unbalanced force in the sudden-braking passenger question.',
      ],
      [
        'Missed converting mass from grams (',
        { code: 'g' },
        ') to SI units (',
        { code: 'kg' },
        ') in a momentum conservation numerical.',
      ],
    ],
  },
  {
    id: 'chemistry-structure-of-the-atom',
    subject: 'Chemistry',
    chapter: 'Structure of the Atom',
    marksScored: 17,
    maxMarks: 20,
    percentage: 85,
    statusLabel: 'Top Performance',
    statusVariant: 'top',
    summaryLine: 'You scored 17/20 in the Chemistry — Structure of the Atom test.',
    commonMistakes: [
      [
        'Swapped the definitions of ',
        { bold: 'isotopes' },
        ' (same atomic number, different mass number) and ',
        { bold: 'isobars' },
        ' (same mass number, different atomic number).',
      ],
      [
        'Forgot to mention that electrons revolving in ',
        { bold: "Bohr's discrete orbits" },
        ' do not radiate energy.',
      ],
    ],
  },
  {
    id: 'mathematics-linear-equations-two-variables',
    subject: 'Mathematics',
    chapter: 'Linear Equations in Two Variables',
    marksScored: 18,
    maxMarks: 25,
    percentage: 72,
    statusLabel: 'Needs Revision',
    statusVariant: 'needs-revision',
    summaryLine: 'You scored 18/25 in the Mathematics — Linear Equations in Two Variables test.',
    commonMistakes: [
      [
        'Sign-flip error while rewriting equations into standard form ',
        { code: 'ax + by + c = 0' },
        ' (dropped the negative sign on constant ',
        { code: 'c' },
        ').',
      ],
      [
        'Plotted only two coordinate points without a third verification point, resulting in a line slope error.',
      ],
      [
        'Treated a single linear equation in two variables as having a unique solution instead of ',
        { bold: 'infinitely many solutions' },
        '.',
      ],
    ],
  },
];
