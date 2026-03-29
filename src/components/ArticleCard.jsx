import { Link } from 'react-router-dom';

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '').trim().slice(0, 80) ?? '';
}

export default function ArticleCard({ article }) {
  const image = article.images?.[0];

  return (
    <Link
      to={`/news/${article.id}`}
      className="group block rounded-2xl overflow-hidden border border-stone-100 hover:shadow-md transition-shadow bg-white"
    >
      <div className="aspect-video overflow-hidden bg-peach-50 flex items-center justify-center">
        {image ? (
          <img
            src={image.url}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <img src="/images/peach.png" alt="" className="w-14 h-14 object-contain opacity-20" />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {article.category && (
            <span className="text-xs bg-peach-100 text-peach-600 px-2.5 py-0.5 rounded-full">
              {article.category.name}
            </span>
          )}
          <span className="text-xs text-stone-400">{formatDate(article.published_at)}</span>
        </div>
        {article.title ? (
          <p className="font-semibold text-stone-800 text-sm leading-snug group-hover:text-peach-500 transition-colors line-clamp-2">
            {article.title}
          </p>
        ) : (
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">
            {stripHtml(article.content)}
          </p>
        )}
      </div>
    </Link>
  );
}
