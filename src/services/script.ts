import type { ScriptData, ScriptList } from '@/types/common';
import { API_URL } from '@/lib/constants';

async function fetchData<T>(url: string): Promise<T | null> {
  const fullUrl = `${API_URL}${url}`;
  try {
    const res = await fetch(fullUrl);
    if (!res.ok) {
      throw new Error(
        `Network response was not ok for URL: ${fullUrl}, status: ${res.status}, statusText: ${res.statusText}`
      );
    }
    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Fetch error for URL ${fullUrl}:`, error.message);
    } else {
      console.error(`Fetch error for URL ${fullUrl}:`, error);
    }
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
