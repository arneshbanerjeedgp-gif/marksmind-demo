export interface Keyword {
  keyword: string;
  definition: string;
}

export interface CurriculumItem {
  slug: string;
  subject: string;
  chapter: string;
  concept: string;
  keywords: Keyword[];
}

export const curriculumData: CurriculumItem[] = [
  {
    "slug": "life-processes-respiration",
    "subject": "Class 10 Science",
    "chapter": "Life Processes",
    "concept": "Aerobic vs Anaerobic Respiration",
    "keywords": [
      { "keyword": "Mitochondria", "definition": "Site of aerobic cellular respiration pathways" },
      { "keyword": "Pyruvate", "definition": "Conversion phase taking place in cytoplasm" },
      { "keyword": "ATP Yield", "definition": "High energy output unit tracking parameters" },
      { "keyword": "Lactic Acid", "definition": "Anaerobic respiration byproduct in muscle cells" }
    ]
  },
  {
    "slug": "light-reflection-laws",
    "subject": "Class 10 Physics",
    "chapter": "Light - Reflection and Refraction",
    "concept": "Laws of Reflection",
    "keywords": [
      { "keyword": "Incident Ray", "definition": "The ray of light that strikes the reflecting surface" },
      { "keyword": "Normal", "definition": "The perpendicular line drawn to the surface at incidence" },
      { "keyword": "Angle of Incidence", "definition": "Angle between the incident ray and the normal" },
      { "keyword": "Angle of Reflection", "definition": "Angle between the reflected ray and the normal" }
    ]
  },
  {
    "slug": "chemical-reactions-corrosion",
    "subject": "Class 10 Chemistry",
    "chapter": "Chemical Reactions and Equations",
    "concept": "Corrosion of Iron (Rusting)",
    "keywords": [
      { "keyword": "Redox Reaction", "definition": "Simultaneous oxidation and reduction processes during rusting" },
      { "keyword": "Hydrated Ferric Oxide", "definition": "The chemical formulation of rust (Fe2O3·xH2O)" },
      { "keyword": "Moisture", "definition": "Presence of water vapor necessary for atmospheric oxidation" },
      { "keyword": "Galvanization", "definition": "The preventive method of coating iron with a zinc layer" }
    ]
  },
  {
    "slug": "civics-federalism",
    "subject": "Class 10 Social Science",
    "chapter": "Federalism",
    "concept": "Federalism in India",
    "keywords": [
      { "keyword": "Three-Tier System", "definition": "Union government, State governments, and Panchayats/Municipalities" },
      { "keyword": "Union List", "definition": "Subjects of national importance under sole central jurisdiction" },
      { "keyword": "State List", "definition": "Subjects of local state importance under regional jurisdiction" },
      { "keyword": "Concurrent List", "definition": "Subjects of common interest where both central and state legislative rules apply" }
    ]
  },
  {
    "slug": "economics-sectors",
    "subject": "Class 10 Economics",
    "chapter": "Sectors of the Indian Economy",
    "concept": "Sectors of the Indian Economy",
    "keywords": [
      { "keyword": "Primary Sector", "definition": "Exploitation of natural resources (agriculture, forestry, mining)" },
      { "keyword": "Secondary Sector", "definition": "Manufacturing and industrial processing of primary products" },
      { "keyword": "Tertiary Sector", "definition": "Service sector providing support to primary and secondary activities" },
      { "keyword": "GDP contribution", "definition": "Gross Domestic Product share across various sectors" }
    ]
  }
];
