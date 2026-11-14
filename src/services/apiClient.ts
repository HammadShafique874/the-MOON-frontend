import { API_BASE_URL, MOCK_LATENCY_MS, REQUEST_TIMEOUT_MS, USE_MOCK } from '../config/env'
import { mockRoute } from '../data/mock/mockBackend'
import type { ApiEnvelope } from '../types/schemas'

export class ApiError extends Error {
  errorCode?: string
  status?: number
  constructor(message: string, options: { errorCode?: string; status?: number } = {}) {
    super(message)
    this.name = 'ApiError'
    this.errorCode = options.errorCode
    this.status = options.status
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function isEnvelope(value: any): value is ApiEnvelope<unknown> {
  return value !== null && typeof value === 'object' && typeof value.success === 'boolean' && 'data' in value
}

async function realRequest(method: string, path: string, body: unknown, signal?: AbortSignal) {
  if (!API_BASE_URL) {
    throw new ApiError('VITE_API_BASE_URL is not configured. Set it in .env.local or enable mock data.')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  signal?.addEventListener('abort', () => controller.abort())

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })

    let json: unknown = null
    try {
      json = await response.json()
    } catch {
    }

    if (isEnvelope(json)) return { envelope: json, status: response.status }
    if (!response.ok) throw new ApiError(`API request failed (${response.status}).`, { status: response.status })
    throw new ApiError('The API response did not use the standard envelope.', { status: response.status })
  } catch (error: any) {
    if (error instanceof ApiError) throw error
    if (error?.name === 'AbortError') {
      if (signal?.aborted) throw error
      throw new ApiError('The API request timed out.')
    }
    throw new ApiError('Could not reach the API. Check that the backend is running and VITE_API_BASE_URL is correct.')
  } finally {
    clearTimeout(timeout)
  }
}

export async function callApi<T>(
  method: 'GET' | 'POST',
  path: string,
  body?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  let envelope: ApiEnvelope<unknown>
  let status: number | undefined

  if (USE_MOCK) {
    await sleep(MOCK_LATENCY_MS)
    envelope = mockRoute(method, path, body)
  } else {
    const result = await realRequest(method, path, body, signal)
    envelope = result.envelope
    status = result.status
  }

  if (!envelope.success) {
    throw new ApiError(envelope.message || 'The API reported an error.', {
      errorCode: envelope.error_code,
      status,
    })
  }
  return envelope.data as T
}