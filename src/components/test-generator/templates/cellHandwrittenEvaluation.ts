export type EvaluationVerdict = 'Correct' | 'Partial' | 'Incorrect';

export interface HandwrittenMcqEvaluationItem {
  id: string;
  number: number;
  question: string;
  marksAwarded: number;
  maxMarks: number;
  verdict: EvaluationVerdict;
  extractedAnswer: string;
  correctAnswer: string;
  cedaFeedback: string;
}

export interface HandwrittenSubjectiveEvaluationItem {
  id: string;
  label: string;
  question: string;
  marksAwarded: number;
  maxMarks: number;
  verdict: EvaluationVerdict;
  extractedAnswer: string;
  conceptsCaptured: string[];
  defectCalloutTitle?: 'Missing Scientific Parameters' | 'Conceptual Defect Flagged';
  defectMessage?: string;
  noMissingMessage?: string;
  benchmarkAnswer: string;
}

export interface HandwrittenCedaEvaluationReport {
  title: string;
  totalMarksAwarded: number;
  maxMarks: number;
  percentage: number;
  sectionTotals: {
    sectionA: { awarded: number; max: number };
    sectionB: { awarded: number; max: number };
    sectionC: { awarded: number; max: number };
    sectionD: { awarded: number; max: number };
  };
  itemBreakdown: {
    fullMarksCount: number;
    partialCreditCount: number;
    incorrectCount: number;
  };
  sectionA: HandwrittenMcqEvaluationItem[];
  sectionB: HandwrittenSubjectiveEvaluationItem[];
  sectionC: HandwrittenSubjectiveEvaluationItem[];
  sectionDPassage: string;
  sectionD: HandwrittenSubjectiveEvaluationItem[];
}

export const CELL_HANDWRITTEN_EVALUATION: HandwrittenCedaEvaluationReport = {
  title: 'Class 9 Science — The Fundamental Unit of Life (Cell)',
  totalMarksAwarded: 13,
  maxMarks: 20,
  percentage: 65,
  sectionTotals: {
    sectionA: { awarded: 3, max: 5 },
    sectionB: { awarded: 4, max: 6 },
    sectionC: { awarded: 2, max: 3 },
    sectionD: { awarded: 4, max: 6 },
  },
  itemBreakdown: {
    fullMarksCount: 6,
    partialCreditCount: 4,
    incorrectCount: 3,
  },
  sectionA: [
    {
      id: 'q1',
      number: 1,
      question:
        'Which cell organelle plays a crucial role in detoxifying many poisons and drugs in the liver cells of vertebrates?',
      marksAwarded: 1,
      maxMarks: 1,
      verdict: 'Correct',
      extractedAnswer: '1. C) Smooth Endoplasmic Reticulum',
      correctAnswer: 'C) Smooth Endoplasmic Reticulum (SER)',
      cedaFeedback:
        'Correctly identified Smooth Endoplasmic Reticulum (SER), which detoxifies poisons and drugs in vertebrate liver cells.',
    },
    {
      id: 'q2',
      number: 2,
      question:
        'Which of the following pairs of cell organelles contain their own DNA and ribosomes, enabling them to synthesise some of their own proteins?',
      marksAwarded: 0,
      maxMarks: 1,
      verdict: 'Incorrect',
      extractedAnswer: '2. C) Vacuoles & Endoplasmic Reticulum',
      correctAnswer: 'A) Mitochondria and Plastids',
      cedaFeedback:
        'Incorrect option selected. Mitochondria and plastids are the semi-autonomous organelles that contain their own circular DNA and ribosomes.',
    },
    {
      id: 'q3',
      number: 3,
      question: 'Plasmolysis in a plant cell is defined as:',
      marksAwarded: 0,
      maxMarks: 1,
      verdict: 'Incorrect',
      extractedAnswer:
        '3. A) Breakdown(lysis) of the plasma membrane in a hypotonic medium.',
      correctAnswer:
        'B) Shrinkage or contraction of the contents of the cell away from the cell wall in a hypertonic medium',
      cedaFeedback:
        'Incorrect definition. Plasmolysis refers to the shrinkage of cell contents away from the rigid cell wall due to water loss in a hypertonic solution.',
    },
    {
      id: 'q4',
      number: 4,
      question:
        'The proteins and lipids essential for building the cell membrane (membrane biogenesis) are manufactured by:',
      marksAwarded: 1,
      maxMarks: 1,
      verdict: 'Correct',
      extractedAnswer: '4. A) Endoplasmic Reticulum',
      correctAnswer: 'A) Endoplasmic Reticulum',
      cedaFeedback:
        'Correctly identified Endoplasmic Reticulum (RER synthesises proteins and SER synthesises lipids for membrane biogenesis).',
    },
    {
      id: 'q5',
      number: 5,
      question:
        'The undefined nuclear region of prokaryotic cells, containing only nucleic acids without a nuclear membrane, is known as:',
      marksAwarded: 1,
      maxMarks: 1,
      verdict: 'Correct',
      extractedAnswer: '5. D) Nucleoid',
      correctAnswer: 'D) Nucleoid',
      cedaFeedback:
        'Correctly identified nucleoid as the undefined nuclear region lacking a nuclear membrane in prokaryotic cells.',
    },
  ],
  sectionB: [
    {
      id: 'q6',
      label: 'Q6',
      question: 'Why is the plasma membrane called a selectively permeable membrane?',
      marksAwarded: 2,
      maxMarks: 2,
      verdict: 'Correct',
      extractedAnswer:
        'Plasma membrane is called selectively permeable because it allows the entry and exit of only selected materials in and out of the cell, and stops other substances from moving through.',
      conceptsCaptured: [
        'Allows entry & exit of selected materials (+1)',
        'Prevents movement of other substances (+1)',
      ],
      noMissingMessage: 'None — full NCERT criteria met.',
      benchmarkAnswer:
        'The plasma membrane is called a selectively permeable membrane because it allows or permits the entry and exit of some materials in and out of the cell, while preventing the movement of other materials.',
    },
    {
      id: 'q7',
      label: 'Q7',
      question: "Why are lysosomes known as the 'suicide bags' of a cell?",
      marksAwarded: 1,
      maxMarks: 2,
      verdict: 'Partial',
      extractedAnswer:
        'Lysosomes have strong digestive enzymes inside them which can burst and digest their own cell, so they are called suicide bags.',
      conceptsCaptured: [
        'Powerful digestive enzymes burst and digest own cell (+1)',
      ],
      defectCalloutTitle: 'Missing Scientific Parameters',
      defectMessage:
        'Missing trigger condition (-1): Did not mention that lysosomes burst "during a disturbance in cellular metabolism / when the cell gets damaged."',
      benchmarkAnswer:
        "During any disturbance in cellular metabolism—for example, when a cell gets damaged—lysosomes may burst and their powerful digestive enzymes digest their own cell. Hence, they are called 'suicide bags'.",
    },
    {
      id: 'q8',
      label: 'Q8',
      question:
        'What would happen to the life of a cell if there was no Golgi apparatus?',
      marksAwarded: 1,
      maxMarks: 2,
      verdict: 'Partial',
      extractedAnswer:
        'Without Golgi apparatus, the storage, modification and packaging of proteins and lipids from ER will stop and they cannot be sent inside or outside the cell.',
      conceptsCaptured: [
        'Halt in storage, modification, packaging & dispatch of ER products (+1)',
      ],
      defectCalloutTitle: 'Missing Scientific Parameters',
      defectMessage:
        'Missing secondary function (-1): Omitted that formation of lysosomes and complex sugars from simple sugars would not occur.',
      benchmarkAnswer:
        'Without the Golgi apparatus, storage, modification, packaging, and dispatch of proteins and lipids synthesised near the ER would stop, and the formation of lysosomes and complex sugars from simple sugars would not take place.',
    },
  ],
  sectionC: [
    {
      id: 'q9',
      label: 'Q9',
      question:
        'State any three structural differences between a prokaryotic cell and a eukaryotic cell.',
      marksAwarded: 2,
      maxMarks: 3,
      verdict: 'Partial',
      extractedAnswer:
        'Prokaryotic vs Eukaryotic:\ni) No nuclear membrane (nucleoid) vs well-defined nucleus with nuclear membrane.\nii) Single chromosome vs more than one chromosome.\niii) Ribosomes are absent in prokaryotic cell vs present in eukaryotic cell.',
      conceptsCaptured: [
        'Nuclear membrane / nucleoid difference (+1)',
        'Single vs. multiple chromosomes (+1)',
      ],
      defectCalloutTitle: 'Conceptual Defect Flagged',
      defectMessage:
        'Point (iii) is scientifically incorrect (-1): Ribosomes ARE present in prokaryotic cells. The correct NCERT distinction is that membrane-bound cell organelles (mitochondria, plastids, ER, Golgi) are absent in prokaryotes and present in eukaryotes.',
      benchmarkAnswer:
        '1. Poorly defined nuclear region (nucleoid) without nuclear membrane vs. well-defined nucleus with nuclear membrane. 2. Single chromosome vs. more than one chromosome. 3. Membrane-bound cell organelles absent vs. present.',
    },
  ],
  sectionDPassage:
    'Rohan conducted a laboratory experiment to investigate the movement of water across a selectively permeable plasma membrane. He removed the hard calcium carbonate shells of two raw eggs by dissolving them in dilute hydrochloric acid, leaving a thin outer membrane enclosing each egg. He placed Egg A in a beaker containing pure water and Egg B in a beaker containing a concentrated salt solution. After 30 minutes, Egg A had visibly swollen, whereas Egg B had shrunk considerably. In a follow-up activity, Rohan soaked dried raisins in plain water for a few hours and subsequently transferred them into a concentrated sugar solution.',
  sectionD: [
    {
      id: 'q10_i',
      label: 'Q10 (i)',
      question:
        'Name the physical process responsible for the movement of water across the egg membrane in both beakers.',
      marksAwarded: 1,
      maxMarks: 1,
      verdict: 'Correct',
      extractedAnswer: 'Osmosis',
      conceptsCaptured: ['Exact physical process identified (+1)'],
      benchmarkAnswer: 'Osmosis (endosmosis in Egg A and exosmosis in Egg B).',
    },
    {
      id: 'q10_ii',
      label: 'Q10 (ii)',
      question:
        'Identify the type of solution (hypotonic, isotonic, or hypertonic) in which Egg A was placed.',
      marksAwarded: 0,
      maxMarks: 1,
      verdict: 'Incorrect',
      extractedAnswer: 'Hypertonic solution',
      conceptsCaptured: [],
      defectCalloutTitle: 'Conceptual Defect Flagged',
      defectMessage:
        'Incorrect tonicity (-1): Egg A was placed in pure water and swelled up by absorbing water, which is a Hypotonic solution—not hypertonic.',
      benchmarkAnswer: 'Hypotonic solution.',
    },
    {
      id: 'q10_iii',
      label: 'Q10 (iii)',
      question:
        'Explain why Egg B shrank when placed in the concentrated salt solution.',
      marksAwarded: 2,
      maxMarks: 2,
      verdict: 'Correct',
      extractedAnswer:
        'Concentrated salt solution is a hypertonic solution with less water concentration than inside the egg, so water moves out of Egg B by osmosis (exosmosis) and it shrinks.',
      conceptsCaptured: [
        'Identified hypertonic medium / lower water concentration (+1)',
        'Explained exosmosis causing shrinkage (+1)',
      ],
      noMissingMessage: 'None — complete causal chain verified.',
      benchmarkAnswer:
        'Concentrated salt solution is hypertonic (lower water concentration than inside the egg), so water moves out of Egg B into the solution by osmosis (exosmosis), causing it to shrink.',
    },
    {
      id: 'q10_iv',
      label: 'Q10 (iv)',
      question:
        'What changes will Rohan observe in the dried raisins first in plain water and then after transferring them into the concentrated sugar solution? Give a brief reason.',
      marksAwarded: 1,
      maxMarks: 2,
      verdict: 'Partial',
      extractedAnswer:
        'In plain water, dried raisins absorb water by osmosis and swell up. When put in concentrated sugar solution, they stay the same size.',
      conceptsCaptured: [
        'Plain water (hypotonic) → absorb water by osmosis & swell (+1)',
      ],
      defectCalloutTitle: 'Conceptual Defect Flagged',
      defectMessage:
        'Second observation incorrect (-1): In concentrated sugar solution (hypertonic medium), raisins do NOT stay the same size—they lose water by osmosis (exosmosis) and shrink again.',
      benchmarkAnswer:
        'In plain water (hypotonic), dried raisins absorb water by osmosis and swell up. When transferred to concentrated sugar solution (hypertonic), they lose water by osmosis and shrink again.',
    },
  ],
};
