
import { API_PREFIX, USE_MOCK } from '../config/env'
import { mockSources } from '../data/mock/sources'
import type {
  AnalysisRequest,
  AnalysisResult,
  AskRequest,
  Comparison,
  ComparisonRequest,
  CvResult,
  Experiment,
  HealthData,
  Insight,
  InsightRequest,
  Measurement,
  Source,
  VisionRequest,
} from '../types/schemas'
import { callApi } from './apiClient'

const v1 = (path: string) => `${API_PREFIX}${path}`
const enc = encodeURIComponent

/** GET /api/v1/health */
export const getHealth = (signal?: AbortSignal) =>
  callApi<HealthData>('GET', v1('/health'), undefined, signal)

/** GET /api/v1/experiments */
export const getExperiments = async (
  signal?: AbortSignal
): Promise<Experiment[]> => {
  const result = await callApi<
    Experiment[] | { items?: Experiment[] }
  >('GET', v1('/experiments'), undefined, signal)

  if (Array.isArray(result)) {
    return result
  }

  return Array.isArray(result?.items) ? result.items : []
}

/** GET /api/v1/experiments/{experiment_id} */
export const getExperiment = (experimentId: string, signal?: AbortSignal) =>
  callApi<Experiment>(
    'GET',
    v1(`/experiments/${enc(experimentId)}`),
    undefined,
    signal
  )

/** GET /api/v1/experiments/{experiment_id}/measurements */
export const getMeasurements = (experimentId: string, signal?: AbortSignal) =>
  callApi<Measurement[] | { items?: Measurement[] }>(
    'GET',
    v1(`/experiments/${enc(experimentId)}/measurements`),
    undefined,
    signal
  ).then((result) =>
    Array.isArray(result) ? result : result?.items ?? []
  )

/** POST /api/v1/analysis */
export const runAnalysis = (request: AnalysisRequest, signal?: AbortSignal) =>
  callApi<AnalysisResult>('POST', v1('/analysis'), request, signal)

/** POST /api/v1/comparison */
export const compareExperiments = (
  request: ComparisonRequest,
  signal?: AbortSignal
) =>
  callApi<Comparison>('POST', v1('/comparison'), request, signal)

/** POST /api/v1/insights */
export const generateInsight = (
  request: InsightRequest,
  signal?: AbortSignal
) =>
  callApi<Insight>('POST', v1('/insights'), request, signal)

/** POST /api/v1/assistant/ask — RAG question */
export const askAssistant = (request: AskRequest, signal?: AbortSignal) =>
  callApi<Insight>('POST', v1('/assistant/ask'), request, signal)

/** POST /api/v1/vision/analyze — optional */
export const analyzeVision = (request: VisionRequest, signal?: AbortSignal) =>
  callApi<CvResult>('POST', v1('/vision/analyze'), request, signal)

/** Mock mode returns mock sources */
export async function getKnownSources(): Promise<{
  sources: Source[]
  provided: boolean
}> {
  if (USE_MOCK) {
    return { sources: mockSources, provided: true }
  }

  return { sources: [], provided: false }
}
