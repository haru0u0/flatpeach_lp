import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-stone-800">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
<About />
      <Features />
      <Service />
      <Plans />
      <Instructor />
      <Access />
      <Contact />
    </main>
  );
}

/* ─── Nav ─────────────────────────────────────────────────────────── */
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Service", href: "#service" },
  { label: "Plans", href: "#plans" },
  { label: "Instructor", href: "#instructor" },
  { label: "Access", href: "#access" },
  { label: "News", href: "https://note.com/flatpeachenglish", isExternal: true },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#">
          <img
            src="/images/logo.png"
            alt="Flat Peach English"
            className="h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
            l.isExternal ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone-500 hover:text-peach-500 transition-colors tracking-wide"
              >
                {l.label}
              </a>
            ) : (
              <a
                key={l.href}
                href={isHome ? l.href : `/${l.href}`}
                className="text-sm text-stone-500 hover:text-peach-500 transition-colors tracking-wide"
              >
                {l.label}
              </a>
            ),
          )}
          <a
            href="https://calendly.com/flat-peach/free-counseling"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm border border-peach-400 text-peach-500 hover:bg-peach-500 hover:text-white px-5 py-2 rounded-full transition-all"
          >
            無料カウンセリング
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-stone-500 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <span
            className={`block w-5 h-px bg-current mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-current mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-4">
          {navLinks.map((l) =>
            l.isExternal ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-stone-600 hover:text-peach-500 py-1"
              >
                {l.label}
              </a>
            ) : (
              <a
                key={l.href}
                href={isHome ? l.href : `/${l.href}`}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-stone-600 hover:text-peach-500 py-1"
              >
                {l.label}
              </a>
            ),
          )}
          <a
            href="https://calendly.com/flat-peach/free-counseling"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-center border border-peach-400 text-peach-500 px-5 py-2 rounded-full"
          >
            無料カウンセリング
          </a>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────── */

// Each peach: position (top/right/bottom/left as %), size (Tailwind w class), opacity, animation class, blur
const peaches = [
  {
    style: { top: "8%", right: "6%" },
    size: "w-36",
    opacity: "opacity-100",
    anim: "animate-peach-1",
    blur: "",
    mobileHide: false,
  },
  {
    style: { top: "30%", right: "18%" },
    size: "w-20",
    opacity: "opacity-70",
    anim: "animate-peach-2",
    blur: "",
    mobileHide: true,
  },
  {
    style: { top: "58%", right: "5%" },
    size: "w-28",
    opacity: "opacity-40",
    anim: "animate-peach-3",
    blur: "",
    mobileHide: false,
  },
  {
    style: { top: "72%", right: "28%" },
    size: "w-16",
    opacity: "opacity-60",
    anim: "animate-peach-4",
    blur: "",
    mobileHide: true,
  },
  {
    style: { top: "15%", right: "38%" },
    size: "w-12",
    opacity: "opacity-50",
    anim: "animate-peach-5",
    blur: "",
    mobileHide: true,
  },
  {
    style: { top: "45%", right: "40%" },
    size: "w-10",
    opacity: "opacity-40",
    anim: "animate-peach-6",
    blur: "blur-[1px]",
    mobileHide: true,
  },
  {
    style: { top: "82%", right: "12%" },
    size: "w-14",
    opacity: "opacity-55",
    anim: "animate-peach-7",
    blur: "",
    mobileHide: true,
  },
  // large blurred peach behind everything for depth
  {
    style: { top: "20%", right: "10%" },
    size: "w-72",
    opacity: "opacity-10",
    anim: "animate-peach-2",
    blur: "blur-2xl",
    mobileHide: false,
  },
];

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-peach-100 via-peach-50 to-orange-50">
      {/* Soft ambient blobs in the background */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full bg-peach-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />

      {/* Floating peaches — z-0 so overlay can sit above them */}
      {peaches.map((p, i) => (
        <div
          key={i}
          className={`absolute z-0 pointer-events-none select-none ${p.size} ${p.opacity} ${p.anim} ${p.blur} ${p.mobileHide ? "hidden md:block" : ""}`}
          style={p.style}
        >
          <img
            src="/images/peach.png"
            alt=""
            className="w-full h-full object-contain drop-shadow-md"
          />
        </div>
      ))}

      {/* Mobile overlay — sits above peaches (z-[1]) but below content (z-10) */}
      <div className="absolute inset-0 z-[1] bg-peach-50/70 md:hidden pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-16">
        <div className="max-w-lg py-24">
          <span className="inline-flex items-center bg-peach-100 text-peach-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-up">
            女性向け英語コーチング・レッスン
          </span>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-stone-800 mb-6 animate-fade-up-delay-1">
            English as a<br />
            <em className="not-italic text-peach-500">Lifestyle.</em>
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed mb-8 animate-fade-up-delay-2">
            「いつか」を待たずに、今日から英語を使い始めませんか？
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up-delay-3">
            <a
              href="https://calendly.com/flat-peach/free-counseling"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap bg-peach-500 hover:bg-peach-600 text-white px-8 py-3.5 rounded-full font-medium transition-colors text-sm text-center shadow-md"
            >
              無料カウンセリングを申し込む
            </a>
            <a
              href="#about"
              className="whitespace-nowrap text-stone-600 hover:text-peach-500 px-8 py-3.5 rounded-full font-medium transition-colors text-sm border border-stone-300 hover:border-peach-400 text-center"
            >
              Flat Peach Englishについて
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-400/60 text-xs tracking-widest">
        <span>scroll</span>
        <span className="animate-bounce">↓</span>
      </div>
    </section>
  );
}
/* ─── About ────────────────────────────────────────────────────────── */
function About() {
  const goals = [
    {
      label: "Use",
      title: "気づいたら英語がある毎日に",
      body: "英語を道具に、エンタメや情報収集を楽しめるように。使うほどに英語が自分のものになっていく。",
    },
    {
      label: "Learn",
      title: "自立した学習者になる",
      body: "教材選びもツール活用も、自分でできるように。レッスンが終わっても効果的な方法で学び続けられる力を。",
    },
    {
      label: "Love",
      title: "英語を、好きになる",
      body: "義務感で向き合っていた英語が、いつの間にか楽しみになっている。英語を通じた出会いを楽しめるように。",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>About</SectionLabel>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-6 leading-snug">
              英語は「完成してから使うもの」ではありません。
              <br />
              <span className="text-peach-500">使いながら育てていくもの</span>
              です。
            </h2>
            <div className="space-y-4 text-stone-500 leading-loose text-sm">
              <p>
                「英語、もう少し上手くなったら使おう」と、ずっと思っていませんか？その日は、待っていても来ません。
              </p>
              <p>
                Flat Peach
                Englishは、今の英語力のまま使い始めることを前提に設計されています。「頑張って学ぶもの」から、「気づいたら毎日使っているもの」へ。使うほどに英語が自分のものになっていく、そんな変化をサポートします。
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs text-stone-400 mb-4">私たちが目指す、受講後の受講生の姿</p>
            {goals.map((g) => (
              <div
                key={g.label}
                className="flex gap-5 items-start p-5 rounded-2xl bg-peach-50"
              >
                <span className="flex-shrink-0 bg-peach-200 text-peach-700 text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mt-0.5">
                  {g.label}
                </span>
                <div>
                  <p className="font-semibold text-stone-800 mb-1">{g.title}</p>
                  <p className="text-stone-500 text-sm leading-loose">
                    {g.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─────────────────────────────────────────────────────── */
const features = [
  {
    num: "01",
    title: "「わからない」まま、使い始める",
    body: "完璧に理解してから使おうとすると、いつまでも使えません。文脈から推測する、言い換えでしのぐ、雰囲気でつかむ——そういう「わからないなりにどうにかする力」を、レッスンの中で意図的に鍛えます。完璧じゃなくていい。英語力が上がるのを待つのではなく、今の英語力で戦える人を目指します。",
    therefore: "カリキュラム内で英語ユーザーとしての経験を積みます。ミニPBL、英語で英語を学ぶ、ネイティブ向けコンテンツへの挑戦など。",
  },
  {
    num: "02",
    title: "「先生なし」で学べるように設計する",
    body: "レッスンで教えるのは答えだけではありません。教材の選び方、ツールの使い方、自分の弱点の見つけ方——学び続けるための方法ごと渡します。レッスンが終わった後も、自分で前に進める人を育てることが、このスクールのゴールです。",
    therefore: "シャドーイング・英作文・文法など、再現性のある学習スキルを体系的に身につけます。「なぜこの教材か」「どう使うか」も含めて教えることで、一人でも続けられる力を育てます。",
  },
  {
    num: "03",
    title: "英語が楽しくなるコンテンツ探しも、カリキュラムのうち",
    body: "英語は一朝一夕では身につきません。だからこそ、義務感だけで続けようとすると必ずどこかで折れます。好きなジャンル、ちょうどいいレベル、見やすいフォーマット——気づいたら見てしまう、心から楽しめるコンテンツが見つかるまで、一緒に探します。英語学習が、いつの間にか趣味になっている。それがゴールです。",
    therefore: "YouTubeやポッドキャストなど、ジャンルやレベルを一緒に絞り込みながら探します。「これなら続けられる」ではなく、「気づいたら見てしまう」ものが見つかるまで付き合います。",
  },
];

function Features() {
  return (
    <section className="py-24 px-6 bg-peach-50">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Our Approach</SectionLabel>
        <h2 className="text-2xl font-bold text-stone-800 mb-12">
          私たちのアプローチ
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.num}
              className="bg-white rounded-2xl px-7 py-8 shadow-sm flex flex-col gap-4"
            >
              <span className="text-3xl font-bold text-peach-200">{f.num}</span>
              <h3 className="font-bold text-stone-800 leading-snug">
                {f.title}
              </h3>
              <p className="text-stone-500 text-sm leading-loose">{f.body}</p>
              {f.therefore && (
                <div className="mt-auto">
                  <div className="text-center text-peach-300 text-lg">↓</div>
                  <div className="bg-peach-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-peach-500 font-semibold mb-1">そのために</p>
                    <p className="text-stone-500 text-xs leading-loose">{f.therefore}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Service ──────────────────────────────────────────────────────── */
function Service() {
  const steps = [
    {
      num: "01",
      title: "無料カウンセリング",
      sub: "共通",
      body: "簡易レベルチェックと、目標や学習におけるお悩みを伺ったうえで、最適な学習の進め方をご提案いたします。",
    },
    {
      num: "02",
      title: "カリキュラム設計",
      sub: "まるごとコーチングのみ",
      body: "レベルチェックをもとに課題と目標のギャップを分析。中長期のカリキュラムと学習スケジュールを設計します。",
    },
    {
      num: "03",
      title: "レッスン開始",
      sub: "共通",
      body: "シャドーイング、英作文（AI活用）、文法学習に加え、好きなコンテンツ探しやミニPBLで「使う力」を鍛えます。",
    },
    {
      num: "04",
      title: "カウンセリング",
      sub: "まるごとコーチングのみ",
      body: "隔週のコーチングで学習法の確認・悩み相談・スケジュール管理を行い、継続をしっかりサポートします。",
    },
  ];

  return (
    <section id="service" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Service</SectionLabel>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-8">
              レッスンの流れ
            </h2>
            <div className="space-y-5">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-peach-200 flex items-center justify-center">
                    <span className="text-peach-600 font-bold text-sm">
                      {s.num}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-semibold text-stone-800">{s.title}</p>
                      <span className="text-xs text-peach-400 border border-peach-200 px-2 py-0.5 rounded-full">
                        {s.sub}
                      </span>
                    </div>
                    <p className="text-stone-500 text-sm leading-loose">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-4">
                対象について
              </h2>
              <p className="text-stone-600 text-sm leading-loose">
                Flat Peach
                Englishは、基本的に女性の方を対象としたスクールです。在校生からのご紹介がある場合に限り、男性の方もご受講いただけます。
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-4">
                対応していない学習
              </h2>
              <p className="text-stone-600 text-sm leading-loose">
                英検・TOEIC・TOEFLなどの試験対策や、資格取得を目的とした学習には対応しておりません。英語を日常や仕事・趣味に活かしたい方に向けたカリキュラムを提供しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Plans ────────────────────────────────────────────────────────── */
const planRows = [
  { label: "セッション時間", a: "週1回 50分", b: "週1回 50分＋隔週1回 60分" },
  {
    label: "各回の内容",
    a: "英語に触れる50分間のレッスン",
    b: "自習での疑問を解消する50分間のレッスン＋学習方法を身につける60分間のコーチング（隔週）",
  },
  {
    label: "対象",
    a: "自習時間が取れない方",
    b: "自習を前提に英語力を本格的に伸ばしたい方",
  },
  { label: "中長期ロードマップと自習カリキュラムの作成", a: "なし", b: "あり" },
  { label: "シャドーイング添削", a: "なし", b: "オプション ＋¥4,000/月" },
  { label: "月額料金（4週間）", a: "¥12,000", b: "¥35,000", highlight: true },
];

function Plans() {
  return (
    <section id="plans" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Plans</SectionLabel>
        <h2 className="text-2xl font-bold text-stone-800 mb-12">
          プランと料金
        </h2>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* 継続クラス */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-stone-800 mb-4">
              継続クラス
            </h3>
            {/* Mobile: カード表示 */}
            <div className="md:hidden space-y-4">
              {[
                { key: "a", img: "/images/slice.png", label: "Standard", name: "ひとくちレッスン" },
                { key: "b", img: "/images/peach.png", label: "Full Support", name: "まるごとコーチング" },
              ].map((plan) => (
                <div key={plan.key} className="rounded-3xl border border-stone-200 overflow-hidden">
                  <div className="bg-peach-50 px-5 py-4 flex items-center gap-4">
                    <img src={plan.img} alt="" className="w-10 h-10 object-contain flex-shrink-0" />
                    <div>
                      <p className="text-xs text-stone-400 tracking-widest uppercase mb-0.5">{plan.label}</p>
                      <p className="text-lg font-bold text-stone-800">{plan.name}</p>
                    </div>
                  </div>
                  <div className="divide-y divide-stone-200">
                    {planRows.map((row, i) => (
                      <div key={i} className={`px-5 py-3 ${row.highlight ? "bg-peach-50" : "bg-white"}`}>
                        <p className="text-xs text-stone-400 mb-1">{row.label}</p>
                        <p className={row.highlight ? "text-xl font-bold text-stone-800" : "text-sm text-stone-700"}>
                          {row[plan.key]}
                        </p>
                      </div>
                    ))}
                    <div className="px-5 py-4 bg-stone-50 flex justify-center">
                      <a
                        href="https://calendly.com/flat-peach/free-counseling"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm border border-peach-400 text-peach-500 hover:bg-peach-500 hover:text-white px-6 py-2 rounded-full transition-all"
                      >
                        申し込む
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: テーブル表示 */}
            <div className="hidden md:block rounded-3xl overflow-hidden border border-stone-200">
              {/* Header */}
              <div className="grid grid-cols-3 bg-peach-50">
                <div className="p-6" />
                <div className="p-6 text-center border-l border-stone-200">
                  <img
                    src="/images/slice.png"
                    alt=""
                    className="w-12 h-12 object-contain mx-auto mb-3"
                  />
                  <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">
                    Standard
                  </p>
                  <p className="text-xl font-bold text-stone-800">ひとくちレッスン</p>
                </div>
                <div className="p-6 text-center border-l border-stone-200">
                  <img
                    src="/images/peach.png"
                    alt=""
                    className="w-12 h-12 object-contain mx-auto mb-3"
                  />
                  <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">
                    Full Support
                  </p>
                  <p className="text-xl font-bold text-stone-800">まるごとコーチング</p>
                </div>
              </div>

              {/* Rows */}
              {planRows.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 border-t border-stone-200 ${row.highlight ? "bg-peach-50" : "bg-white"}`}
                >
                  <div className="px-6 py-4 text-sm text-stone-400 font-medium flex items-center">
                    {row.label}
                  </div>
                  <div
                    className={`px-6 py-4 text-sm text-center border-l border-stone-200 flex items-center justify-center ${row.highlight ? "text-2xl font-bold text-stone-800" : "text-stone-600"}`}
                  >
                    {row.a}
                  </div>
                  <div
                    className={`px-6 py-4 text-sm text-center border-l border-stone-200 flex items-center justify-center ${row.highlight ? "text-2xl font-bold text-stone-800" : "text-stone-600"}`}
                  >
                    {row.b}
                  </div>
                </div>
              ))}

              {/* CTA row */}
              <div className="grid grid-cols-3 border-t border-stone-200 bg-stone-50">
                <div className="px-6 py-5" />
                <div className="px-6 py-5 border-l border-stone-200 flex items-center justify-center">
                  <a
                    href="https://calendly.com/flat-peach/free-counseling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm border border-peach-400 text-peach-500 hover:bg-peach-500 hover:text-white px-5 py-2 rounded-full transition-all"
                  >
                    申し込む
                  </a>
                </div>
                <div className="px-6 py-5 border-l border-stone-200 flex items-center justify-center">
                  <a
                    href="https://calendly.com/flat-peach/free-counseling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm border border-peach-400 text-peach-500 hover:bg-peach-500 hover:text-white px-5 py-2 rounded-full transition-all"
                  >
                    申し込む
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-xs text-stone-400">
                ※
                両プランとも無料カウンセリング（簡易レベルチェック含む）からスタートします
              </p>
              <p className="text-xs text-stone-400">
                ※ 入学金・登録料は不要です。1か月からお始めいただけます。
              </p>
              <p className="text-xs text-stone-400">
                ※
                次月の更新をご希望されない場合は、3週間前までにご連絡ください。
              </p>
              <p className="text-xs text-stone-400">
                ※ お支払いは銀行振り込みとなります。
              </p>
              <p className="text-xs text-stone-400">
                ※ 市販の教材を使用する場合は、別途教材費をご負担いただきます。
              </p>
            </div>
          </div>

          {/* 気まぐれつまみぐい */}
          <div>
            <h3 className="text-xl font-bold text-stone-800 mb-4">
              単発クラス
            </h3>
            <div className="rounded-3xl border border-stone-200 overflow-hidden">
              <div className="bg-peach-50 px-6 py-6 flex items-center gap-4">
                <img
                  src="/images/piece.png"
                  alt=""
                  className="w-12 h-12 object-contain flex-shrink-0"
                />
                <div>
                  <p className="text-xs text-stone-400 tracking-widest uppercase mb-0.5">
                    Single Session
                  </p>
                  <p className="text-xl font-bold text-stone-800">
                    気まぐれつまみぐい
                  </p>
                </div>
              </div>
              <div className="px-6 py-6 bg-white">
                <p className="text-2xl font-bold text-stone-800 mb-1">
                  ¥4,000{" "}
                  <span className="text-sm font-normal text-stone-400">
                    / 50分
                  </span>
                </p>
                <p className="text-sm text-stone-500 mt-4 mb-3">
                  こんなことができます
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "英文CVの添削、書き方レクチャー",
                    "米英留学相談（大学交換留学・大学院・語学留学など）",
                    "英国就職相談（ワーホリ・卒業後ビザなど）",
                    "英語学習のお悩み相談・学習計画立て",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-stone-600"
                    >
                      <span className="text-peach-400 flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-stone-400 mb-5">
                  無料カウンセリングを挟まずに直接ご予約いただけます。
                  <br />
                  ご相談内容を拝見し、お力添えが難しいと判断した場合には個別にご連絡いたします。
                </p>
                <a
                  href="https://calendly.com/flat-peach/free-counseling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm border border-peach-400 text-peach-500 hover:bg-peach-500 hover:text-white px-6 py-2.5 rounded-full transition-all"
                >
                  相談・予約する
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Instructor ───────────────────────────────────────────────────── */
function Instructor() {
  return (
    <section id="instructor" className="py-24 px-6 bg-peach-50">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Instructor</SectionLabel>
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Photo */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-md">
              <img
                src="/images/profile.jpg"
                alt="Haru"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-800">Haru</p>
              <p className="text-stone-400 text-sm">Flat Peach English 講師</p>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2 space-y-4 text-stone-600 text-sm leading-loose">
            <p>
              法政大学社会学部卒業。在学中には、アメリカへの語学留学・交換留学、インドネシアでのボランティア活動、内閣府主催「世界青年の船」への参加など幅広い国際交流活動を経験。
            </p>
            <p>
              卒業後は教育系WebサービスのPMとして2年半勤務。その後、英国ブリストル大学大学院にて教育学修士号を最優秀成績（Distinction）で取得。現地の専門学校にデジタル教育担当職員として就職・勤務し、約2年半の英国滞在を経て帰国。帰国後は現在まで教育系WebサービスのPMとして活動する傍ら、過去には大手オンラインコーチングサービスにてコーチとしても勤務した。
            </p>
            <p>
              英検1級（2025. 11）・IELTS OA7.5（2021.05）・TOEIC L&R
              970点（2022.05）
            </p>
            <div className="mt-2 border-l-2 border-peach-200 pl-4">
              <p className="text-stone-400 text-xs uppercase tracking-widest mb-2">
                Name Story
              </p>
              <p>
                Flat
                Peachはイギリス滞在中に出会った、平たい形の桃。旬の時期は毎日食べるほど好きになりました。受講生のみなさんにも、英語を通じて、私にとってのFlat
                Peachのような、自分だけの小さな幸せや出会いを見つけてほしい。そんな願いを込めて名付けました。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Access ───────────────────────────────────────────────────────── */
function Access() {
  return (
    <section id="access" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Access</SectionLabel>
        <h2 className="text-2xl font-bold text-stone-800 mb-8">アクセス</h2>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="bg-peach-50 rounded-2xl px-8 py-6 border border-peach-100">
            <p className="text-xs text-stone-400 mb-2 tracking-wide uppercase">
              Location
            </p>
            <p className="font-semibold text-stone-800 text-lg">TBD</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ──────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-peach-500">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs text-peach-200 tracking-[0.3em] uppercase mb-4 font-medium">
          Free Counseling
        </p>
        <h2 className="text-3xl font-bold text-white mb-4">
          まずは、無料カウンセリングから。
        </h2>
        <p className="text-peach-200 text-sm mb-10">
          所要時間は約50分。
          <br />
          無理な勧誘は一切ありませんので、お気軽にお越しください！
        </p>
        <div className="flex items-start justify-center gap-0 mb-4 max-w-lg mx-auto">
          {[
            { n: "1", text: "簡易レベルチェック" },
            { n: "2", text: "目標・お悩みのヒアリング" },
            { n: "3", text: "学習プランのご提案" },
          ].map(({ n, text }, i, arr) => (
            <div key={n} className="flex items-start flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className="w-9 h-9 rounded-full bg-white text-peach-500 font-bold text-sm flex items-center justify-center shadow mb-3">
                  {n}
                </div>
                <p className="text-white text-xs leading-snug text-center px-1">
                  {text}
                </p>
              </div>
              {i < arr.length - 1 && (
                <div className="w-8 h-px bg-peach-300 mt-4 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
        <a
          href="https://calendly.com/flat-peach/free-counseling"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-peach-500 hover:bg-peach-50 font-semibold px-10 py-4 rounded-full shadow-lg transition-colors text-sm"
        >
          無料カウンセリングを申し込む
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-stone-700 text-stone-400 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <p className="font-semibold text-white tracking-[0.2em] mb-2">
            Flat Peach English
          </p>
          <p className="text-xs leading-loose">
            English Coaching &amp; Teaching
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-peach-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="hover:text-peach-400 transition-colors">
            Contact
          </a>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-stone-600 text-xs text-stone-500">
        © {new Date().getFullYear()} Flat Peach English. All rights reserved.
      </div>
    </footer>
  );
}


/* ─── Shared ───────────────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p className="text-xs tracking-[0.3em] text-peach-400 uppercase font-medium mb-3">
      {children}
    </p>
  );
}
