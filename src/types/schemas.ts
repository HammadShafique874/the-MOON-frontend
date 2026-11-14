
export type SourceType = 'dataset' | 'research_paper' | 'technical_report' | 'webpage'
export type AccessStatus = 'accessible' | 'restricted' | 'unavailable' | 'unknown'
export type VerificationStatus = 'metadata_verified' | 'content_verified' | 'unverified'
export type IngestionStatus = 'not_ingested' | 'ingested' | 'partially_ingested' | 'failed'
export type ComparisonStatus = 'success' | 'partial' | 'not_comparable'
export type EvidenceStatus = 'supported' | 'partially_supported' | 'insufficient_evidence'

export type ExperimentDataStatus = string
export type MeasurementStatus = string
export type AnalysisStatus = string
export type AnalysisType = string
export type InsightConfidence = string
export type CvProcessingStatus = string
export type CvCalibrationStatus = string

export interface Experiment {
  experiment_id: string
  name: string
  investigation: string
  program: string
  description: string
  platform: string
  source_ids: string[]
  data_status: ExperimentDataStatus
  available_measurements: string[]
  limitations: string[]
  last_updated: string
}

export interface MeasurementConditions {
  fuel: string | null
  pressure: number | null
  temperature: number | null
  flow_velocity: number | null
}

export interface Measurement {
  measurement_id: string
  experiment_id: string
  variable: string
  value: number | null
  unit: string
  timestamp: string | number | null
  conditions: MeasurementConditions
  source_id: string
  measurement_status: MeasurementStatus
  notes: string[]
}

export interface Source {
  source_id: string
  title: string
  url: string | null
  publisher: string
  source_type: SourceType
  experiment_id: string
  access_status: AccessStatus
  verification_status: VerificationStatus
  ingestion_status: IngestionStatus
  publication_date: string | null
}

export interface AnalysisMetric {
  metric: string
  variable: string
  value: number | null
  unit: string
}

export interface AnalysisDataQuality {
  missing_values: number
  validation_passed: boolean
  warnings: string[]
}

export interface AnalysisResult {
  analysis_id: string
  experiment_id: string
  analysis_type: AnalysisType
  status: AnalysisStatus
  results: AnalysisMetric[]
  data_quality: AnalysisDataQuality
  source_ids: string[]
  limitations: string[]
}

export interface ComparedVariable {
  variable: string
  unit: string
  comparable: boolean
  reason: string
}

export interface Comparison {
  comparison_id: string
  experiment_ids: string[]
  status: ComparisonStatus
  compared_variables: ComparedVariable[]
  findings: string[]
  warnings: string[]
  source_ids: string[]
}

export interface SupportingEvidence {
  source_id: string
  experiment_id: string
  evidence_text: string
  url: string | null
}

export interface Insight {
  insight_id: string
  question: string
  claim: string
  supporting_evidence: SupportingEvidence[]
  fire_safety_relevance: string
  limitations: string[]
  confidence: InsightConfidence
  evidence_status: EvidenceStatus
}

export interface CvFeatures {
  area_pixels: number
  width_pixels: number
  height_pixels: number
  brightness_mean: number
}

export interface CvResult {
  cv_result_id: string
  experiment_id: string
  media_id: string
  processing_status: CvProcessingStatus
  detected: boolean
  features: CvFeatures
  method: string
  calibration_status: CvCalibrationStatus
  limitations: string[]
  source_ids: string[]
}

export interface ApiSuccess<T> {
  success: true
  data: T
  message: string
}

export interface ApiFailure {
  success: false
  data: null
  message: string
  error_code?: string
}

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure

export interface ComparisonRequest {
  experiment_ids: string[]
  variables?: string[]
}

export interface AskRequest {
  question: string
  experiment_ids: string[]
}

export interface InsightRequest {
  experiment_id: string
  analysis_id: string
  question: string
}

export interface AnalysisRequest {
  experiment_id: string
  analysis_type?: AnalysisType
}

export interface VisionRequest {
  experiment_id: string
  media_id?: string
}

export type HealthData = Record<string, unknown> | null
