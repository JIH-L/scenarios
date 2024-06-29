export async function getScriptDataById(slug: string, id: number) {
  try {
    const response = await fetch(`/api/${slug}?id=${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function fetchScriptList(type: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${type}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} Script List`);
    }
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return [];
  }
}
