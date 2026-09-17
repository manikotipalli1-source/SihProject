export type Severity = 'low' | 'medium' | 'high';
export type DiseaseType = 'bacterial' | 'fungal' | 'viral' | 'pest' | 'nutritional' | 'other';

export interface Disease {
  id: string;
  name: string;
  nameMarathi: string;
  cropId: string;

  /** Scientific name of the pathogen / virus / vector, e.g. "Xanthomonas citri pv. malvacearum" */
  scientificName?: string;
  diseaseType?: DiseaseType;

  symptoms: string;
  symptomsMarathi: string;

  /** What causes it and (for viral diseases) which insect vector spreads it.
   *  Optional: only populated for diseases with full Plantix-style profiles. */
  cause?: string;
  causeMarathi?: string;

  /** Weather/soil/field conditions that favor outbreak, and how it spreads field-to-field */
  spreadAndConditions?: string;
  spreadAndConditionsMarathi?: string;

  /** Expected yield/crop impact if left unmanaged */
  damageImpact?: string;
  damageImpactMarathi?: string;

  /** Chemical control options — general guidance, not exact dosages; always paired with
   *  a reminder to confirm with a local agricultural extension officer before applying. */
  chemicalControl?: string[];
  chemicalControlMarathi?: string[];

  /** Organic / biological control options */
  organicControl?: string[];
  organicControlMarathi?: string[];

  /** Cultural practices: field sanitation, rotation, resistant varieties, timing, etc. */
  culturalControl?: string[];
  culturalControlMarathi?: string[];

  /** Short one-line summary — used for TTS playback and compact UI contexts */
  advisory: string;
  advisoryMarathi: string;

  severity: Severity;
}
