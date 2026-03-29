const API_KEY = import.meta.env.VITE_MICROCMS_API_KEY ?? '';
const BASE = 'https://flat-peach-eng.microcms.io/api/v1';
const headers = { 'X-MICROCMS-API-KEY': API_KEY };

export async function getNews({ limit = 12, offset = 0, categoryId } = {}) {
  const params = new URLSearchParams({ limit, offset });
  if (categoryId) params.set('filters', `category[equals]${categoryId}`);
  const res = await fetch(`${BASE}/news?${params}`, { headers });
  if (!res.ok) throw new Error('news fetch failed');
  return res.json(); // { contents, totalCount, offset, limit }
}

export async function getNewsItem(id) {
  const res = await fetch(`${BASE}/news/${id}`, { headers });
  if (!res.ok) throw new Error('news item fetch failed');
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE}/categories?limit=100`, { headers });
  if (!res.ok) throw new Error('categories fetch failed');
  return res.json(); // { contents, totalCount }
}
