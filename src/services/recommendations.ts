import type { Resource } from '@/types';

export interface Recommendation {
  resource: Resource;
  score: number;
  reasons: string[];
}

export function getRecommendations(
  targetResource: Resource,
  allResources: Resource[],
  limit = 6
): Recommendation[] {
  const others = allResources.filter(
    (r) => r.id !== targetResource.id && r.available
  );

  const scored = others.map((r) => {
    let score = 0;
    const reasons: string[] = [];

    // Same category — strong signal
    if (r.category === targetResource.category) {
      score += 40;
      reasons.push(`Same category (${r.category})`);
    }

    // Description keyword overlap
    const targetWords = new Set(
      targetResource.description.toLowerCase().match(/\b\w{4,}\b/g) ?? []
    );
    const rWords = new Set(
      r.description.toLowerCase().match(/\b\w{4,}\b/g) ?? []
    );
    let overlap = 0;
    targetWords.forEach((w) => {
      if (rWords.has(w)) overlap++;
    });
    if (overlap > 0) {
      score += Math.min(overlap * 5, 20);
      if (overlap >= 2) reasons.push(`${overlap} shared keywords in description`);
    }

    // Name keyword overlap
    const targetNameWords = new Set(targetResource.name.toLowerCase().match(/\b\w{3,}\b/g) ?? []);
    const rNameWords = new Set(r.name.toLowerCase().match(/\b\w{3,}\b/g) ?? []);
    let nameOverlap = 0;
    targetNameWords.forEach((w) => {
      if (rNameWords.has(w)) nameOverlap++;
    });
    if (nameOverlap > 0) {
      score += nameOverlap * 8;
      reasons.push('Similar name');
    }

    // Same condition bonus
    if (r.condition === targetResource.condition) {
      score += 10;
      reasons.push(`Same condition (${r.condition})`);
    }

    // Same sharing type
    if (r.sharingType === targetResource.sharingType) {
      score += 5;
      reasons.push(`Same sharing type (${r.sharingType === 'Give' ? 'Give Away' : 'Lend'})`);
    }

    // Same location bonus
    if (r.location === targetResource.location) {
      score += 8;
      reasons.push('Same location');
    }

    // Popularity (views)
    score += Math.min(r.views / 10, 10);
    if (r.views > 40) reasons.push(`Popular (${r.views} views)`);

    return { resource: r, score, reasons: reasons.slice(0, 3) };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getRecommendationsForUser(
  userName: string,
  allResources: Resource[]
): Recommendation[] {
  const userResources = allResources.filter((r) => r.owner === userName);
  if (userResources.length === 0) {
    // No shared resources — recommend most popular
    return allResources
      .filter((r) => r.available)
      .sort((a, b) => b.views - a.views)
      .slice(0, 6)
      .map((r) => ({ resource: r, score: r.views, reasons: [`Popular (${r.views} views)`] }));
  }

  const allRecs: Recommendation[] = [];
  const seenIds = new Set<string>();

  userResources.forEach((ur) => {
    getRecommendations(ur, allResources, 4).forEach((rec) => {
      if (!seenIds.has(rec.resource.id) && rec.resource.owner !== userName) {
        seenIds.add(rec.resource.id);
        allRecs.push(rec);
      }
    });
  });

  return allRecs
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}
