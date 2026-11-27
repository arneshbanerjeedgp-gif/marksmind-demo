export type McqOptionKey = 'A' | 'B' | 'C' | 'D';

export interface McqOption {
  key: McqOptionKey;
  text: string;
}

export interface McqQuestion {
  id: string;
  number: number;
  marks: 1;
  question: string;
  options: McqOption[];
  answerKey: McqOptionKey;
  explanation: string;
}

export interface SubjectiveQuestion {
  id: string;
  number: number;
  marks: 2 | 3;
  question: string;
  benchmarkAnswer: string;
  markingPoints: string[];
  keywordBadges: string[];
}

export interface CaseStudySubPart {
  id: string;
  label: '(i)' | '(ii)' | '(iii)' | '(iv)';
  marks: 1 | 2;
  prompt: string;
  benchmarkAnswer: string;
  keywordBadges: string[];
}

export interface CaseStudyQuestion {
  id: string;
  number: number;
  totalMarks: 6;
  passage: string;
  subParts: CaseStudySubPart[];
}

export interface MasterTestTemplate {
  id: string;
  title: string;
  boardBadge: string;
  maxMarks: number;
  totalSections: number;
  totalQuestions: number;
  blueprintSummary: string;
  sectionA: {
    title: string;
    subtitle: string;
    totalMarks: number;
    questions: McqQuestion[];
  };
  sectionB: {
    title: string;
    subtitle: string;
    totalMarks: number;
    questions: SubjectiveQuestion[];
  };
  sectionC: {
    title: string;
    subtitle: string;
    totalMarks: number;
    questions: SubjectiveQuestion[];
  };
  sectionD: {
    title: string;
    subtitle: string;
    totalMarks: number;
    question: CaseStudyQuestion;
  };
}

export const CELL_20_MARK_TEMPLATE: MasterTestTemplate = {
  id: 'ncert-class-9-science-cell-20m',
  title: 'Class 9 Science — The Fundamental Unit of Life (Cell)',
  boardBadge: 'CBSE / NCERT',
  maxMarks: 20,
  totalSections: 4,
  totalQuestions: 10,
  blueprintSummary: '5×1M MCQ • 3×2M Short • 1×3M Structured • 1×6M Case Study',
  sectionA: {
    title: 'SECTION A — Multiple Choice Questions',
    subtitle: '5 Questions × 1 Mark = 5 Marks',
    totalMarks: 5,
    questions: [
      {
        id: 'q1',
        number: 1,
        marks: 1,
        question:
          'Which cell organelle plays a crucial role in detoxifying many poisons and drugs in the liver cells of vertebrates?',
        options: [
          { key: 'A', text: 'Golgi apparatus' },
          { key: 'B', text: 'Lysosomes' },
          { key: 'C', text: 'Smooth Endoplasmic Reticulum (SER)' },
          { key: 'D', text: 'Vacuoles' },
        ],
        answerKey: 'C',
        explanation:
          'In liver cells of vertebrates, Smooth Endoplasmic Reticulum (SER) plays a crucial role in detoxifying poisons and drugs.',
      },
      {
        id: 'q2',
        number: 2,
        marks: 1,
        question:
          'Which of the following pairs of cell organelles contain their own DNA and ribosomes, enabling them to synthesise some of their own proteins?',
        options: [
          { key: 'A', text: 'Mitochondria and Plastids' },
          { key: 'B', text: 'Golgi apparatus and Lysosomes' },
          { key: 'C', text: 'Vacuoles and Endoplasmic Reticulum' },
          { key: 'D', text: 'Lysosomes and Ribosomes' },
        ],
        answerKey: 'A',
        explanation:
          'Both mitochondria and plastids are semi-autonomous organelles possessing their own circular DNA and ribosomes.',
      },
      {
        id: 'q3',
        number: 3,
        marks: 1,
        question: 'Plasmolysis in a plant cell is defined as:',
        options: [
          {
            key: 'A',
            text: 'Breakdown (lysis) of the plasma membrane in a hypotonic medium',
          },
          {
            key: 'B',
            text: 'Shrinkage or contraction of the contents of the cell away from the cell wall in a hypertonic medium',
          },
          {
            key: 'C',
            text: 'Swelling of the nucleoplasm due to endosmosis',
          },
          {
            key: 'D',
            text: 'Dissolution of the cellulose cell wall in distilled water',
          },
        ],
        answerKey: 'B',
        explanation:
          'When a living plant cell loses water through osmosis in a hypertonic solution, its cytoplasm and contents shrink away from the rigid cell wall—a phenomenon called plasmolysis.',
      },
      {
        id: 'q4',
        number: 4,
        marks: 1,
        question:
          'The proteins and lipids essential for building the cell membrane (membrane biogenesis) are manufactured by:',
        options: [
          { key: 'A', text: 'Endoplasmic Reticulum' },
          { key: 'B', text: 'Golgi apparatus' },
          { key: 'C', text: 'Plasma membrane' },
          { key: 'D', text: 'Mitochondria' },
        ],
        answerKey: 'A',
        explanation:
          'Rough ER synthesises proteins (via attached ribosomes) and Smooth ER manufactures fat molecules/lipids; together they help build the cell membrane through membrane biogenesis.',
      },
      {
        id: 'q5',
        number: 5,
        marks: 1,
        question:
          'The undefined nuclear region of prokaryotic cells, containing only nucleic acids without a nuclear membrane, is known as:',
        options: [
          { key: 'A', text: 'Nucleus' },
          { key: 'B', text: 'Nucleolus' },
          { key: 'C', text: 'Chromatin' },
          { key: 'D', text: 'Nucleoid' },
        ],
        answerKey: 'D',
        explanation:
          'Prokaryotes lack a nuclear membrane, so their poorly defined nuclear region containing only nucleic acids is termed a nucleoid.',
      },
    ],
  },
  sectionB: {
    title: 'SECTION B — Short Answer Questions',
    subtitle: '3 Questions × 2 Marks = 6 Marks',
    totalMarks: 6,
    questions: [
      {
        id: 'q6',
        number: 6,
        marks: 2,
        question: 'Why is the plasma membrane called a selectively permeable membrane?',
        benchmarkAnswer:
          'The plasma membrane is called a selectively permeable membrane because it allows or permits the entry and exit of certain selected materials in and out of the cell, while preventing the movement of other materials.',
        markingPoints: [
          'Permits entry/exit of specific materials (1 mark)',
          'Restricts/prevents movement of other substances (1 mark)',
        ],
        keywordBadges: ['selectively permeable', 'entry and exit', 'preventing'],
      },
      {
        id: 'q7',
        number: 7,
        marks: 2,
        question: "Why are lysosomes known as the 'suicide bags' of a cell?",
        benchmarkAnswer:
          "During any disturbance in cellular metabolism—for example, when a cell gets damaged—lysosomes may burst and release their powerful digestive enzymes, which then digest their own cell. Hence, lysosomes are called 'suicide bags' of a cell.",
        markingPoints: [
          'Bursting of lysosomes when cell is damaged / metabolism disturbed (1 mark)',
          'Powerful digestive enzymes digest their own cell (1 mark)',
        ],
        keywordBadges: ['cellular metabolism', 'burst', 'digestive enzymes', 'digest their own cell'],
      },
      {
        id: 'q8',
        number: 8,
        marks: 2,
        question: 'What would happen to the life of a cell if there was no Golgi apparatus?',
        benchmarkAnswer:
          'Without the Golgi apparatus, the storage, modification, and packaging of proteins and lipids synthesised near the endoplasmic reticulum into vesicles would stop, halting their dispatch to targets inside and outside the cell. Additionally, the formation of complex sugars from simple sugars and the formation of lysosomes would not take place.',
        markingPoints: [
          'Failure of storage, modification, packaging, and dispatch of ER products (1 mark)',
          'Failure to form lysosomes / complex sugars (1 mark)',
        ],
        keywordBadges: ['storage', 'modification', 'packaging', 'vesicles', 'lysosomes', 'complex sugars'],
      },
    ],
  },
  sectionC: {
    title: 'SECTION C — Structured Answer Question',
    subtitle: '1 Question × 3 Marks = 3 Marks',
    totalMarks: 3,
    questions: [
      {
        id: 'q9',
        number: 9,
        marks: 3,
        question:
          'State any three structural differences between a prokaryotic cell and a eukaryotic cell.',
        benchmarkAnswer:
          '1. Nuclear Region: Prokaryotic cells have a poorly defined nuclear region lacking a nuclear membrane (called a nucleoid), whereas eukaryotic cells have a well-defined nucleus enclosed by a nuclear membrane.\n2. Chromosomes: Prokaryotic cells possess a single chromosome, whereas eukaryotic cells contain more than one chromosome.\n3. Membrane-Bound Organelles: Membrane-bound cell organelles (such as mitochondria, plastids, ER, and Golgi apparatus) are absent in prokaryotic cells, whereas they are present in eukaryotic cells.',
        markingPoints: [
          'Nuclear membrane / nucleoid distinction (1 mark)',
          'Single vs. multiple chromosomes (1 mark)',
          'Absence vs. presence of membrane-bound organelles (1 mark)',
        ],
        keywordBadges: ['nuclear membrane', 'nucleoid', 'single chromosome', 'membrane-bound'],
      },
    ],
  },
  sectionD: {
    title: 'SECTION D — Case-Based Study Question',
    subtitle: '1 Paragraph + 4 Sub-Parts: 1 + 1 + 2 + 2 = 6 Marks',
    totalMarks: 6,
    question: {
      id: 'q10',
      number: 10,
      totalMarks: 6,
      passage:
        'Rohan conducted a laboratory experiment to investigate the movement of water across a selectively permeable plasma membrane. He removed the hard calcium carbonate shells of two raw eggs by dissolving them in dilute hydrochloric acid, leaving a thin outer membrane enclosing each egg. He placed Egg A in a beaker containing pure water and Egg B in a beaker containing a concentrated salt solution. After 30 minutes, Egg A had visibly swollen, whereas Egg B had shrunk considerably. In a follow-up activity, Rohan soaked dried raisins in plain water for a few hours and subsequently transferred them into a concentrated sugar solution.',
      subParts: [
        {
          id: 'q10_i',
          label: '(i)',
          marks: 1,
          prompt:
            'Name the physical process responsible for the movement of water across the egg membrane in both beakers.',
          benchmarkAnswer: 'Osmosis (endosmosis in Egg A and exosmosis in Egg B).',
          keywordBadges: ['Osmosis', 'endosmosis', 'exosmosis'],
        },
        {
          id: 'q10_ii',
          label: '(ii)',
          marks: 1,
          prompt:
            'Identify the type of solution (hypotonic, isotonic, or hypertonic) in which Egg A was placed.',
          benchmarkAnswer:
            'Hypotonic solution (pure water has a higher water concentration than the interior of the egg).',
          keywordBadges: ['Hypotonic', 'higher water concentration'],
        },
        {
          id: 'q10_iii',
          label: '(iii)',
          marks: 2,
          prompt: 'Explain why Egg B shrank when placed in the concentrated salt solution.',
          benchmarkAnswer:
            'The concentrated salt solution acts as a hypertonic solution because it has a lower concentration of water than the inside of the egg (1 mark). Consequently, water moves out of the egg into the surrounding salt solution through osmosis (exosmosis), causing Egg B to shrink (1 mark).',
          keywordBadges: ['hypertonic solution', 'lower concentration of water', 'exosmosis', 'shrink'],
        },
        {
          id: 'q10_iv',
          label: '(iv)',
          marks: 2,
          prompt:
            'What changes will Rohan observe in the dried raisins first in plain water and then after transferring them into the concentrated sugar solution? Give a brief reason.',
          benchmarkAnswer:
            'In plain water (hypotonic solution), the dried raisins absorb water by osmosis and swell up (1 mark). When moved to the concentrated sugar solution (hypertonic solution), they lose water by osmosis and shrink again (1 mark).',
          keywordBadges: ['hypotonic', 'swell', 'hypertonic', 'shrink', 'osmosis'],
        },
      ],
    },
  },
};
