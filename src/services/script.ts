export async function getScriptDataById(slug: string, id: number) {
  try {
    const response = await fetch(`/api/${slug}?id=${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
