// Vercel serverless function: note.com RSSをサーバー側で取得してJSONで返す
// ブラウザからは直接フェッチできないCORSをサーバーサイドで回避する

const RSS_URL = "https://note.com/flatpeach/rss";

function extractTag(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  if (!m) return "";
  // CDATAを除去
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

  try {
    const response = await fetch(RSS_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; FlatPeachLP/1.0)" },
    });
    const xml = await response.text();

    const items = [];
    for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
      const item = m[1];
      items.push({
        title: extractTag(item, "title"),
        link: extractTag(item, "link"),
        pubDate: extractTag(item, "pubDate"),
      });
      if (items.length >= 3) break;
    }

    res.status(200).json({ items });
  } catch {
    res.status(200).json({ items: [] });
  }
}
