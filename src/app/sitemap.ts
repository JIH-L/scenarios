import { MetadataRoute } from 'next';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const games = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/games`).then(
    (res) => res.json()
  );
  const gamesSitemap =
    games?.data.map((game: any) => ({
      url: `${process.env.NEXT_PUBLIC_URL}/game/${game._id}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    })) || [];

  const novels = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/novels`).then(
    (res) => res.json()
  );
  const novelsSitemap =
    novels?.data.map((novel: any) => ({
      url: `${process.env.NEXT_PUBLIC_URL}/novel/${novel._id}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    })) || [];

  const sitemap = [
    {
      url: `${process.env.NEXT_PUBLIC_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/games`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/novels`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...gamesSitemap,
    ...novelsSitemap,
  ];

  return sitemap;
}
