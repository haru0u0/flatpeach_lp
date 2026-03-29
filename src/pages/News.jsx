import { useState, useEffect } from 'react';
import { getNews, getCategories } from '../lib/microcms';

const LIMIT = 20;

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '').trim() ?? '';
}

function TimelineItem({ article }) {
  const isLong = stripHtml(article.content).length > 200;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative pl-10 pb-10 last:pb-0">
      {/* dot */}
      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-peach-300" />

      {/* date */}
      <p className="text-xs font-medium text-stone-400 mb-3 tracking-wide">
        {formatDate(article.published_at)}
      </p>

      {/* card */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm px-6 py-5">
        {article.category && (
          <span className="inline-block text-xs bg-peach-100 text-peach-600 px-2.5 py-0.5 rounded-full mb-3">
            {article.category.name}
          </span>
        )}

        {article.title && (
          <h2 className="font-bold text-stone-800 mb-3 leading-snug">{article.title}</h2>
        )}

        {/* content with accordion */}
        <div className="relative">
          <div
            className={`article-content overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              isLong && !expanded ? 'max-h-40' : 'max-h-[9999px]'
            }`}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          {isLong && !expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-sm text-peach-500 hover:text-peach-600 transition-colors flex items-center gap-1"
          >
            {expanded ? <>閉じる <span className="text-xs">↑</span></> : <>続きを読む <span className="text-xs">↓</span></>}
          </button>
        )}

        {/* images — shown when not long, or when expanded */}
        {article.images?.length > 0 && (!isLong || expanded) && (
          <div
            className="mt-4 grid gap-2"
            style={{ gridTemplateColumns: `repeat(${Math.min(article.images.length, 2)}, 1fr)` }}
          >
            {article.images.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-peach-50">
                <img src={img.url} alt="" className="w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCategories().then(d => setCategories(d.contents)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setArticles([]);
    getNews({ limit: LIMIT, offset: 0, categoryId: selectedCat })
      .then(d => { setArticles(d.contents); setTotal(d.totalCount); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedCat]);

  function loadMore() {
    setLoading(true);
    getNews({ limit: LIMIT, offset: articles.length, categoryId: selectedCat })
      .then(d => setArticles(prev => [...prev, ...d.contents]))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  return (
    <main className="pt-24 pb-24 px-6 min-h-screen bg-white">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-peach-400 uppercase font-medium mb-3">News</p>
        <h1 className="text-3xl font-bold text-stone-800 mb-8">お知らせ・コラム</h1>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setSelectedCat(null)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              selectedCat === null
                ? 'bg-peach-500 text-white'
                : 'bg-stone-100 text-stone-500 hover:bg-peach-100 hover:text-peach-600'
            }`}
          >
            すべて
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                selectedCat === cat.id
                  ? 'bg-peach-500 text-white'
                  : 'bg-stone-100 text-stone-500 hover:bg-peach-100 hover:text-peach-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Timeline */}
        {loading && articles.length === 0 ? (
          <div className="border-l-2 border-peach-100 ml-3 space-y-0">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative pl-10 pb-10 animate-pulse">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-stone-100 border-2 border-stone-200" />
                <div className="h-3 bg-stone-100 rounded w-24 mb-3" />
                <div className="bg-white rounded-2xl border border-stone-100 px-6 py-5 space-y-2">
                  <div className="h-3 bg-stone-100 rounded" />
                  <div className="h-3 bg-stone-100 rounded w-5/6" />
                  <div className="h-3 bg-stone-100 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <p className="text-stone-400 text-sm py-20 text-center">記事はまだありません。</p>
        ) : (
          <div className="border-l-2 border-peach-100 ml-3">
            {articles.map(a => <TimelineItem key={a.id} article={a} />)}
          </div>
        )}

        {/* Load more */}
        {!loading && articles.length < total && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              className="border border-peach-400 text-peach-500 hover:bg-peach-500 hover:text-white px-8 py-3 rounded-full text-sm transition-all"
            >
              もっと見る
            </button>
          </div>
        )}
        {loading && articles.length > 0 && (
          <p className="text-center mt-8 text-stone-400 text-sm">読み込み中...</p>
        )}
      </div>
    </main>
  );
}
