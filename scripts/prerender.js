// ビルド後に各ページを中身入りのHTMLとして書き出す（AIや検索エンジンのクローラー向け）。
// JavaScriptを実行しないクローラーにも、料金・講師・FAQなどの本文が読めるようにする。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const SITE = "https://flatpeach.jp";

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");

// ページごとのタイトル・説明（トップは index.html のものをそのまま使う）
const routes = [
  { url: "/", file: "index.html" },
  { url: "/terms", file: "terms.html", noindex: true, title: "受講規約", description: "Flat Peach English（英語コーチング）の受講規約です。" },
  { url: "/monitor", file: "monitor.html", noindex: true, title: "モニター受講条件", description: "Flat Peach Englishの1期生モニター価格でご受講いただく際の条件です。" },
  { url: "/privacy", file: "privacy.html", title: "プライバシーポリシー", description: "Flat Peach Englishのプライバシーポリシーです。" },
  { url: "/tokushoho", file: "tokushoho.html", title: "特定商取引法に基づく表記", description: "Flat Peach Englishの特定商取引法に基づく表記です。" },
  { url: "/checkout", file: "checkout.html", title: "プランを選んでお申し込み", description: "Flat Peach Englishのコーチングコースのお申し込みページです。" },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const r of routes) {
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(r.url)}</div>`);
  if (r.title) {
    const title = `${r.title}｜Flat Peach English`;
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
      .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
      .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(r.description)}"`)
      .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(r.description)}"`)
      .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${SITE}${r.url}"`)
      .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${SITE}${r.url}"`);
  }
  // 受講規約・モニター受講条件はカウンセリング後に個別に案内するので、検索・AIには載せない
  if (r.noindex) html = html.replace("</head>", '    <meta name="robots" content="noindex, nofollow" />\n  </head>');
  fs.writeFileSync(path.join(dist, r.file), html);
  console.log(`prerendered ${r.url} -> dist/${r.file}`);
}

fs.rmSync(ssrDir, { recursive: true, force: true });
