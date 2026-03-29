import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsItem } from '../lib/microcms';

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getNewsItem(id)
      .then(setArticle)
      .catch(() => setError('記事が見つかりませんでした'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <main className="pt-24 pb-24 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto animate-pulse space-y-4">
        <div className="h-3 bg-stone-100 rounded w-24" />
        <div className="h-7 bg-stone-100 rounded w-3/4" />
        <div className="h-60 bg-stone-100 rounded-2xl" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <div key={i} className="h-3 bg-stone-100 rounded" />)}
        </div>
      </div>
    </main>
  );

  if (error) return (
    <main className="pt-24 pb-24 px-6 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-stone-400 mb-4 text-sm">{error}</p>
        <Link to="/news" className="text-peach-500 hover:underline text-sm">← 一覧に戻る</Link>
      </div>
    </main>
  );

  return (
    <main className="pt-24 pb-24 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <Link to="/news" className="text-sm text-stone-400 hover:text-peach-500 transition-colors mb-8 inline-block">
          ← 一覧に戻る
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {article.category && (
            <span className="text-xs bg-peach-100 text-peach-600 px-3 py-1 rounded-full">
              {article.category.name}
            </span>
          )}
          <span className="text-sm text-stone-400">{formatDate(article.published_at)}</span>
        </div>

        {article.title && (
          <h1 className="text-2xl font-bold text-stone-800 mb-6 leading-snug">{article.title}</h1>
        )}

        {article.images?.length > 0 && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img src={article.images[0].url} alt="" className="w-full object-cover" />
          </div>
        )}

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </main>
  );
}
