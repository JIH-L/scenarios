import type { ScriptData, ScriptList } from '@/types/common';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

async function fetchJsonWithCheck<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Network response was not ok for URL: ${url}`);
  }
  return res.json();
}

async function fetchData<T>(url: string): Promise<T | null> {
  try {
    return await fetchJsonWithCheck<T>(`${BASE_URL}${url}`);
  } catch (error) {
    console.error(`Fetch error for URL ${url}:`, error);
    return null;
  }
}

export async function getScriptById(
  slug: string,
  id: number
): Promise<ScriptData | null> {
  return fetchData(`/api/${slug}?id=${id}`);
}

export async function getScriptList(type: string): Promise<ScriptList | null> {
  return fetchData(`/api/${type}`);
}
