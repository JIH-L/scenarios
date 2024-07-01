import type { ScriptData, ScriptList } from '@/types/common';
const API_URL = process.env.NEXT_PUBLIC_URL;

async function fetchData<T>(url: string): Promise<T | null> {
  const fullUrl = `${API_URL}${url}`;
  try {
    const res = await fetch(fullUrl);
    if (!res.ok) {
      const errorMessage = `Network response was not ok for URL: ${fullUrl}, status: ${res.status}, statusText: ${res.statusText}`;
      throw new Error(errorMessage);
    }
    return res.json();
  } catch (error) {
    const errorMessage = `Fetch error for URL ${fullUrl}: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
    console.error(errorMessage);
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
