import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-stone-800">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
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
      <Kodawari />
      <Service />
      <Plans />
      <Instructor />
      <Access />
      {/* <ContactForm /> */}
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
  { label: "Blog", href: "https://note.com/flatpeachenglish", isExternal: true },
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
                className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-peach-500 transition-colors tracking-wide"
              >
                {l.label}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
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
            href="https://calendar.app.google/MBRaimcXHf5hPPxY8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-peach-500 text-white hover:bg-peach-600 px-5 py-2 rounded-full transition-all"
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
                className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-peach-500 py-1"
              >
                {l.label}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
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
            href="https://calendar.app.google/MBRaimcXHf5hPPxY8"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-center bg-peach-400 text-white px-5 py-2 rounded-full"
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
      {/* Ambient blob */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-peach-200/40 blur-3xl pointer-events-none" />

      {/* デスクトップ：複数の浮き桃 */}
      {peaches.map((p, i) => (
        <div
          key={i}
          className={`absolute z-0 pointer-events-none select-none hidden md:block ${p.size} ${p.opacity} ${p.anim} ${p.blur}`}
          style={p.style}
        >
          <img src="/images/peach.png" alt="" className="w-full h-full object-contain drop-shadow-md" />
        </div>
      ))}

      {/* Mobile: 右上に大きな桃、端からはみ出す */}
      <div className="absolute top-0 right-0 w-52 opacity-70 animate-peach-1 pointer-events-none select-none translate-x-6 -translate-y-4 md:hidden">
        <img src="/images/peach.png" alt="" className="w-full drop-shadow-2xl" />
      </div>
      <div className="absolute bottom-16 right-4 w-24 opacity-35 animate-peach-3 pointer-events-none select-none md:hidden">
        <img src="/images/peach.png" alt="" className="w-full" />
      </div>

      {/* Content — mobile: 左寄せ / desktop: 2カラム */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 pt-36 pb-24 md:pt-0 md:min-h-screen md:flex md:items-center">
        <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-12 md:items-center md:w-full">

          {/* テキスト */}
          <div>
            <div className="inline-flex items-center gap-3 bg-peach-500 text-white rounded-2xl px-5 py-2.5 mb-6 animate-fade-up-delay-1 shadow-md">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase leading-none mb-0.5">New Open</p>
                <p className="text-sm font-bold leading-none">2026.06.09</p>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <p className="text-xs leading-snug">無料カウンセリング<br />受付開始</p>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 animate-fade-up-delay-1">
              あなただけのゴールに向かって、<br /><span className="text-peach-500">ずっと続く英語</span>を。
            </h1>
            <p className="text-sm text-stone-400 leading-relaxed animate-fade-up-delay-2">
              コーチングが終わっても、自分の足で進み続けられる「自走力」を育てる。<br className="hidden md:block" />女性向け英語コーチング。
            </p>
          </div>

          {/* 右側 — デスクトップのみ、スペース確保用 */}
          <div className="hidden md:block" />

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
  const targets = [
    "コーチングが終わったあとも、ひとりで続けられる力をつけたい",
    "自分のペースで、自分らしい英語との付き合い方を見つけたい",
    "これまで何度も挫折してきた",
  ];

  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>About</SectionLabel>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* キーメッセージ */}
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-6 leading-snug">
              英語の旅の主役は、<span className="text-peach-500">あなた自身</span>。
            </h2>
            <div className="space-y-4 text-stone-500 leading-loose text-sm">
              <p>
                ひとりひとり、英語で目指したいことが違います。だからペースも、学び方も、かける熱量も、みんな違っていい。ただひとつ、どんな人にも欠かせないのは、自分自身に合ったゴールや学び方を、自分で正しく理解することです。
              </p>
              <p>
                英語とのお付き合いは、終わりのない長い長い旅。ライフステージが変わるたびに、自分も変わり、最適な付き合い方も変わっていきます。だからこそ、コーチとの時間が終わったあとも、自分を理解して、今の自分に合った方法を選んで、また見直して、進み続けられる——そのサイクルを自分で回し続けられることが大切です。
              </p>
              <p>
                Flat Peach Englishは、その力を育てるお手伝いをする場所でありたいと思っています。
              </p>
            </div>
          </div>

          {/* こんな方へ */}
          <div>
            <p className="text-xs text-stone-400 tracking-wide uppercase font-medium mb-5">For You</p>
            <h3 className="text-lg font-bold text-stone-800 mb-5">こんな方へ</h3>
            <ul className="space-y-3 mb-8">
              {targets.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-600 leading-relaxed border-b border-peach-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-peach-400 flex-shrink-0 mt-0.5">✦</span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="bg-peach-50 rounded-2xl px-5 py-4 space-y-1.5">
              <p className="text-xs text-stone-400 leading-relaxed">
                ※ 基本的に女性の方を対象としています。在校生からのご紹介がある場合に限り、男性の方もご受講いただけます。
              </p>
              <p className="text-xs text-stone-400 leading-relaxed">
                ※ 英検・TOEIC・TOEFLなどの試験対策・資格取得のみに特化した学習には対応しておりません。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Kodawari ──────────────────────────────────────────────────────── */
const kodawariPoints = [
  {
    num: "01",
    title: "ゴールもペースも学習内容も、すべてがオリジナル",
    body: [
      "ビジネスの可能性を大きく広げたい人も、日々の楽しみを小さく豊かにしたい人も。毎日30分コツコツ積み重ねたい人も、短期間でがっつり取り組みたい人も。英語という道具の使い道や、そこにかける熱量に正解はありません。だからこそ、私たちのコーチングには既定の型はありません。学習の内容も、ゴールも、一日の学習時間も、あなたの目的とライフスタイルに合わせて、あなたとコーチが一緒に、最適な形をデザインします。",
    ],
  },
  {
    num: "02",
    title: "科学的な学び方を、あなた自身が使いこなせるようになる",
    body: [
      "「第二言語習得論」という分野の研究によって、第二言語を習得するためのプロセスやメカニズムが解明されてきています。しかし、コーチがそれに基づいて設計したロードマップをこなすだけでは、卒業後に自分の力で計画を立てられません。Flat Peachでは、この科学的な知見を学習者のみなさまにも丁寧にシェアし、「学び方を学ぶ」時間を設けています。仕組みを自分で理解し、実際に学びを活かして自ら効果的なロードマップを立てる体験を積むからこそ、卒業後も迷わずに効果的な学習方法を自分で選び、実行できるようになります。",
    ],
  },
  {
    num: "03",
    title: "自分を理解し、必要な学びを自分で決める",
    body: [
      "スタート地点にある「今の課題」や、日々のライフスタイル、目指すゴールは人それぞれ。だからこそ、英語学習には全員に当てはまる万能なメソッド（一律のノウハウ）は存在しません。",
      "そのため、私たちは振り返りのワークを通じて「今の自分の状態」を正しく理解するプロセスを大切にしています。誰かに決められた方法ではなく、「今の自分に本当に必要な学び」を自分で選び取り、決めて進める力を育てていきます。",
    ],
  },
  {
    num: "04",
    title: "英語を「学ぶ」と「使う」をライフスタイルにする",
    body: [
      "机の上の「お勉強」として義務感だけで続けようとすると、英語の旅を長く続けることはできません。英語に触れることが、日常のサイクルの中で自然な楽しみになるように。コーチング期間中から幅広いコンテンツに触れ、無理なく付き合える方法を一緒に探っていきます。「やらなきゃいけない英語」が、いつの間にか「そこにあるのが当たり前で、楽しい英語」に変わっている状態が、私たちの目指すゴールです。",
    ],
  },
];

function Kodawari() {
  return (
    <section className="py-24 px-6 bg-peach-50">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Our Approach</SectionLabel>
        <h2 className="text-2xl font-bold text-stone-800 mb-6">私たちのこだわり</h2>

        {/* Intro */}
        <div className="mb-14 space-y-3 text-stone-500 leading-loose text-sm">
          <p>
            コーチに作ってもらった計画をただこなすだけでは、卒業したあとに立ち止まってしまいます。私たちが目指すのは、コーチングが終わっても、自分の足で進み続けられること。この<span className="font-semibold text-stone-700">「自走力」</span>を育てるために、本コーチングでは以下の4つにこだわります。
          </p>
        </div>

        {/* 4 cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {kodawariPoints.map((p) => (
            <div key={p.num} className="bg-white rounded-2xl px-7 py-8 shadow-sm flex flex-col gap-4">
              <span className="text-2xl font-bold text-peach-200">{p.num}</span>
              <h3 className="font-bold text-stone-800 leading-snug">{p.title}</h3>
              <div className="space-y-3">
                {p.body.map((para, i) => (
                  <p key={i} className="text-stone-500 text-sm leading-loose">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Service ──────────────────────────────────────────────────────── */
function Service() {
  return (
    <section id="service" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Service</SectionLabel>
        <h2 className="text-2xl font-bold text-stone-800 mb-3">コーチングの流れ</h2>
        <p className="text-sm text-stone-500 leading-loose mb-12">
          面談と自習を通じて、コース前半ではコーチが伴走しながら「英語の学び方」を身につけ、後半は自分でロードマップを設計して「自走」を体験します。
        </p>

        <div className="relative">
          <div className="absolute left-1.5 md:left-[6.375rem] top-0 bottom-0 w-px bg-stone-100" />

          <div className="space-y-4">
            {/* 受講前 レベルチェック・振り返りワーク */}
            <div className="flex gap-4 items-center">
              <div className="hidden md:block flex-shrink-0 w-20" />
              <div className="flex-shrink-0 z-10 w-3 flex justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-200" />
              </div>
              <p className="text-xs text-stone-400">振り返りワーク・レベルチェック</p>
            </div>

            {/* 受講前 — サブカード */}
            <div className="flex gap-4 items-start">
              <div className="hidden md:block flex-shrink-0 w-20 text-right pt-3">
                <span className="text-xs text-stone-400">受講前</span>
              </div>
              <div className="flex-shrink-0 pt-3 z-10">
                <div className="w-3 h-3 rounded-full bg-stone-200 ring-4 ring-white" />
              </div>
              <div className="flex-1 bg-stone-50 border border-stone-100 rounded-xl px-4 py-3">
                <p className="text-xs text-stone-400 md:hidden mb-0.5">受講前</p>
                <p className="text-xs font-semibold text-stone-600 mb-1">キックオフ面談</p>
                <p className="text-xs text-stone-400 leading-relaxed">受講前に取り組む振り返りワークとレベルチェックをもとに、コーチが前半のカリキュラムを設計。キックオフ面談でその内容を共有し、いよいよスタートです。</p>
              </div>
            </div>

            {/* Week 1–6 — メインカード */}
            <div className="flex gap-4 items-start">
              <div className="hidden md:block flex-shrink-0 w-20 text-right pt-6">
                <span className="text-xs font-semibold text-stone-600">前半</span>
              </div>
              <div className="flex-shrink-0 pt-6 z-10">
                <div className="w-3 h-3 rounded-full bg-peach-400 ring-4 ring-white" />
              </div>
              <div className="flex-1 bg-white border border-peach-400 shadow-sm rounded-2xl px-6 py-6">
                <p className="text-xs font-semibold text-stone-500 mb-2 md:hidden">前半</p>
                <h3 className="text-base font-bold text-stone-800 mb-3">コーチが設計したロードマップで学ぶ</h3>
                <p className="text-sm text-stone-500 leading-loose">
                  コーチが作成したオリジナルのロードマップに沿って自習を進めます。面談では、第二言語習得論をベースにした「英語の学び方」を学びながら、自習の進捗確認も行います。
                </p>
              </div>
            </div>

            {/* Week 6 レベルチェック */}
            <div className="flex gap-4 items-center">
              <div className="hidden md:block flex-shrink-0 w-20" />
              <div className="flex-shrink-0 z-10 w-3 flex justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-200" />
              </div>
              <p className="text-xs text-stone-400">レベルチェック</p>
            </div>

            {/* Week 7–12 — メインカード */}
            <div className="flex gap-4 items-start">
              <div className="hidden md:block flex-shrink-0 w-20 text-right pt-6">
                <span className="text-xs font-semibold text-stone-600">後半</span>
              </div>
              <div className="flex-shrink-0 pt-6 z-10">
                <div className="w-3 h-3 rounded-full bg-peach-400 ring-4 ring-white" />
              </div>
              <div className="flex-1 bg-white border border-peach-400 shadow-sm rounded-2xl px-6 py-6">
                <p className="text-xs font-semibold text-stone-500 mb-2 md:hidden">後半</p>
                <h3 className="text-base font-bold text-stone-800 mb-3">自分で設計したロードマップで学ぶ</h3>
                <p className="text-sm text-stone-500 leading-loose">
                  前半で学んだ「英語の学び方」や、振り返りワークで発見したご自身に最適な学習の進め方をもとに、コーチのサポートを受けながらあなた自身がロードマップを設計し、自習を進めます。週1回の面談では弱点補強と進捗確認。「自分で決めて、自分で進む」経験を積むことで、卒業後の自走力を育てます。
                </p>
              </div>
            </div>

            {/* Week 12 レベルチェック */}
            <div className="flex gap-4 items-center">
              <div className="hidden md:block flex-shrink-0 w-20" />
              <div className="flex-shrink-0 z-10 w-3 flex justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-200" />
              </div>
              <p className="text-xs text-stone-400">レベルチェック</p>
            </div>

            {/* 修了 — サブカード */}
            <div className="flex gap-4 items-start">
              <div className="hidden md:block flex-shrink-0 w-20 text-right pt-3">
                <span className="text-xs text-stone-400">修了</span>
              </div>
              <div className="flex-shrink-0 pt-3 z-10">
                <div className="w-3 h-3 rounded-full bg-stone-200 ring-4 ring-white" />
              </div>
              <div className="flex-1 bg-stone-50 border border-stone-100 rounded-xl px-4 py-3">
                <p className="text-xs text-stone-400 md:hidden mb-0.5">修了</p>
                <p className="text-xs font-semibold text-stone-600 mb-1">自走スタート</p>
                <p className="text-xs text-stone-400 leading-relaxed">コーチなしでも自分でロードマップを立て、学び続けられる力を持って卒業。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Plans ────────────────────────────────────────────────────────── */
function Plans() {
  const included = [
    { text: "レベルチェック（受講前・Week 6・Week 12）" },
    { text: "ロードマップ設計", sub: [
      "Week 1–6はコーチが設計",
      "Week 7–12はコーチのサポートを受けながらあなたが主体となって設計",
    ]},
    { text: "週1回の面談（60分 × 全12回）", sub: [
      "自習進捗確認・学習相談（毎回）",
      "英語の学び方レッスン（Week 1–6）",
      "弱点補強レッスン（Week 7–12）",
    ]},
    { text: "10分コール × 3枚（受講期間中有効）" },
  ];

  const included6 = [
    { text: "レベルチェック（受講前・Month 3・Month 6）" },
    { text: "ロードマップ設計", sub: [
      "前半はコーチが設計",
      "後半はコーチのサポートを受けながらあなたが主体となって設計",
    ]},
    { text: "隔週1回の面談（60分 × 全12回）", sub: [
      "自習進捗確認・学習相談（毎回）",
      "英語の学び方レッスン（前半）",
      "弱点補強レッスン（後半）",
    ]},
    { text: "10分コール × 6枚（1日1枚まで・受講期間中有効）" },
  ];

  const singleItems = [
    "英語学習のお悩み相談・学習計画立て",
    "英文CVの添削、書き方レクチャー",
    "米英留学相談（大学交換留学・大学院・語学留学など）",
    "英国就職相談（ワーホリ・卒業後ビザなど）",
  ];

  return (
    <section id="plans" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>Plans</SectionLabel>
        <h2 className="text-2xl font-bold text-stone-800 mb-3">プランと料金</h2>
        <p className="text-sm text-stone-500 leading-loose mb-12">取り組みたいペースに応じて、2つのコーチングコースを用意しています。ペースは異なりますが、身につける力はどちらも同じです。</p>

        {/* コーチングプラン モバイル: カード */}
        <div className="md:hidden space-y-6 mb-6">
          {[
            {
              name: "ぎゅぎゅっとコース", sub: "3か月コーチング", icon: "/images/peach.png",
              期間: "3か月", 面談: "週1回・60分（全12回）", コール: "3枚",
              向け: "英語学習の優先度が高く、ぐっと集中して取り組みたい方",
              目安: "目安：自習時間が60分以上/日取れる方",
              price: null,
              monitor: true,
            },
            {
              name: "まったりコース", sub: "6か月コーチング", icon: "/images/slice.png",
              期間: "6か月", 面談: "隔週1回・60分（全12回）", コール: "6枚",
              向け: "仕事や生活と両立しながら、ゆるやかに英語を習慣化したい方",
              目安: "目安：自習時間が60分未満/日の方",
              price: "¥204,000", priceSub: "月々 ¥34,000 × 6か月",
              monitor: false,
            },
          ].map((plan) => (
            <div key={plan.name} className="rounded-3xl border border-stone-200 overflow-hidden">
              <div className="bg-peach-50 px-5 py-4 flex items-center gap-3">
                <img src={plan.icon} alt="" className="w-8 h-8 object-contain flex-shrink-0" />
                <div>
                  <p className="text-xs text-stone-400 tracking-widest uppercase">{plan.sub}</p>
                  <p className="text-base font-bold text-stone-800">{plan.name}</p>
                </div>
              </div>
              <div className="divide-y divide-stone-100">
                {[["期間", plan.期間], ["面談", plan.面談], ["10分コールチケット", plan.コール]].map(([label, val]) => (
                  <div key={label} className="px-5 py-3 flex justify-between items-center gap-4">
                    <span className="text-xs text-stone-600 flex-shrink-0">{label}</span>
                    <span className="text-sm text-stone-700 text-right">{val}</span>
                  </div>
                ))}
                <div className="px-5 py-3">
                  <p className="text-xs text-stone-600 mb-1">こんな人向け</p>
                  <p className="text-sm text-stone-600 mb-0.5">{plan.向け}</p>
                  <p className="text-xs text-stone-400">{plan.目安}</p>
                </div>
                <div className="px-5 py-4">
                  {plan.monitor ? (
                    <>
                      <p className="text-base font-bold text-stone-300 line-through">¥159,000</p>
                      <p className="text-xs text-stone-300 line-through mb-3">月々 ¥53,000 × 3か月</p>
                      <div className="bg-peach-50 border border-peach-200 rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="bg-peach-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">モニター募集中</span>
                          <span className="text-peach-500 text-xs border border-peach-300 px-2 py-0.5 rounded-full">先着2名</span>
                        </div>
                        <div className="flex items-end gap-2">
                          <p className="text-stone-800 font-bold text-2xl leading-tight">¥99,000</p>
                          <p className="text-peach-400 text-xs font-bold mb-0.5">¥60,000 OFF</p>
                        </div>
                        <p className="text-stone-400 text-xs mt-0.5">月々 ¥33,000 × 3か月</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-stone-800">{plan.price}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{plan.priceSub}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* コーチングプラン デスクトップ: 比較表 */}
        <div className="hidden md:block rounded-3xl border border-stone-200 overflow-hidden mb-6">

          {/* ヘッダー行 */}
          <div className="grid grid-cols-3 bg-peach-50">
            <div className="px-6 py-5 border-r border-stone-200" />
            <div className="px-6 py-5 border-r border-stone-200 flex items-center gap-3">
              <img src="/images/peach.png" alt="" className="w-8 h-8 object-contain flex-shrink-0" />
              <p className="text-base font-bold text-stone-800">ぎゅぎゅっとコース</p>
            </div>
            <div className="px-6 py-5 flex items-center gap-3">
              <img src="/images/slice.png" alt="" className="w-8 h-8 object-contain flex-shrink-0" />
              <p className="text-base font-bold text-stone-800">まったりコース</p>
            </div>
          </div>

          {/* 期間 */}
          <div className="grid grid-cols-3 border-t border-stone-100">
            <div className="px-6 py-4 text-xs text-stone-700 border-r border-stone-100 flex items-center">期間</div>
            <div className="px-6 py-4 border-r border-stone-100 flex items-center">
              <p className="text-sm text-stone-700">3か月</p>
            </div>
            <div className="px-6 py-4 flex items-center">
              <p className="text-sm text-stone-700">6か月</p>
            </div>
          </div>

          {/* 面談 */}
          <div className="grid grid-cols-3 border-t border-stone-100">
            <div className="px-6 py-4 border-r border-stone-100">
              <p className="text-xs text-stone-700 mb-2">面談（60分 × 全12回）</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-1.5 text-xs text-stone-400"><span className="flex-shrink-0 mt-0.5">–</span>自習進捗確認・学習相談（毎回）</li>
                <li className="flex items-start gap-1.5 text-xs text-stone-400"><span className="flex-shrink-0 mt-0.5">–</span>英語の学び方レッスン（前半）</li>
                <li className="flex items-start gap-1.5 text-xs text-stone-400"><span className="flex-shrink-0 mt-0.5">–</span>弱点補強レッスン（後半）</li>
              </ul>
            </div>
            <div className="px-6 py-4 border-r border-stone-100 flex items-center">
              <p className="text-sm text-stone-700">週1回</p>
            </div>
            <div className="px-6 py-4 flex items-center">
              <p className="text-sm text-stone-700">隔週1回</p>
            </div>
          </div>


          {/* ロードマップ設計 */}
          <div className="grid grid-cols-3 border-t border-stone-100">
            <div className="px-6 py-4 border-r border-stone-100">
              <p className="text-xs text-stone-700 mb-2">ロードマップ設計</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-1.5 text-xs text-stone-400"><span className="flex-shrink-0 mt-0.5">–</span>前半はコーチが設計</li>
                <li className="flex items-start gap-1.5 text-xs text-stone-400"><span className="flex-shrink-0 mt-0.5">–</span>後半はコーチのサポートのもと自分で設計</li>
              </ul>
            </div>
            <div className="px-6 py-4 border-r border-stone-100 flex items-center">
              <span className="text-peach-400 font-bold text-sm">✓</span>
            </div>
            <div className="px-6 py-4 flex items-center">
              <span className="text-peach-400 font-bold text-sm">✓</span>
            </div>
          </div>

          {/* 10分コール */}
          <div className="grid grid-cols-3 border-t border-stone-100">
            <div className="px-6 py-4 border-r border-stone-100">
              <p className="text-xs text-stone-700 mb-2">10分コールチケット</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-1.5 text-xs text-stone-400"><span className="flex-shrink-0 mt-0.5">–</span>学習中の疑問をいつでも気軽に解決できるチケット制の短時間コール。</li>
                <li className="flex items-start gap-1.5 text-xs text-stone-400"><span className="flex-shrink-0 mt-0.5">–</span>1日1枚まで・受講期間中有効</li>
              </ul>
            </div>
            <div className="px-6 py-4 border-r border-stone-100 flex items-center">
              <p className="text-sm text-stone-700">3枚</p>
            </div>
            <div className="px-6 py-4 flex items-center">
              <p className="text-sm text-stone-700">6枚</p>
            </div>
          </div>

          {/* こんな人向け */}
          <div className="grid grid-cols-3 border-t border-stone-100">
            <div className="px-6 py-4 text-xs text-stone-700 border-r border-stone-100 flex items-center">こんな人向け</div>
            <div className="px-6 py-4 border-r border-stone-100">
              <p className="text-sm text-stone-600 mb-1">英語学習の優先度が高く、ぐっと集中して取り組みたい方</p>
              <p className="text-xs text-stone-400">目安：自習時間が60分以上/日取れる方</p>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-stone-600 mb-1">仕事や生活と両立しながら、ゆるやかに英語を習慣化したい方</p>
              <p className="text-xs text-stone-400">目安：自習時間が60分未満/日の方</p>
            </div>
          </div>

          {/* 料金 */}
          <div className="grid grid-cols-3 border-t border-stone-200">
            <div className="px-6 py-5 text-xs text-stone-700 border-r border-stone-100 flex items-center">料金</div>
            <div className="px-6 py-5 border-r border-stone-100">
              <p className="text-base font-bold text-stone-300 line-through">¥159,000</p>
              <p className="text-xs text-stone-300 line-through mb-3">月々 ¥53,000 × 3か月</p>
              <div className="bg-peach-50 border border-peach-200 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-peach-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">モニター募集中</span>
                  <span className="text-peach-500 text-xs border border-peach-300 px-2 py-0.5 rounded-full">先着2名</span>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-stone-800 font-bold text-2xl leading-tight">¥99,000</p>
                  <p className="text-peach-400 text-xs font-bold mb-0.5">¥60,000 OFF</p>
                </div>
                <p className="text-stone-400 text-xs mt-0.5">月々 ¥33,000 × 3か月</p>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-2xl font-bold text-stone-800">¥204,000</p>
              <p className="text-xs text-stone-400 mt-1">月々 ¥34,000 × 6か月</p>
            </div>
          </div>


        </div>

        {/* 共通注意書き */}
        <div className="space-y-1 mb-16">
          <p className="text-xs text-stone-400">※ 入学金・登録料は不要です。</p>
          <p className="text-xs text-stone-400">※ 市販の教材を使用する場合は、別途教材費をご負担いただきます。</p>
        </div>

        {/* 単発クラス */}
        <div className="border-t border-stone-100 pt-10">
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-5">その他のメニュー</p>
          <div className="rounded-2xl border border-stone-200 overflow-hidden">
            <div className="px-6 py-5 flex flex-wrap items-center gap-4 bg-white">
              <img src="/images/piece.png" alt="" className="w-8 h-8 object-contain flex-shrink-0" />
              <div className="flex items-baseline gap-3 flex-1 min-w-0">
                <p className="text-base font-bold text-stone-800 flex-shrink-0">つまみぐいクラス</p>
                <p className="text-base font-bold text-stone-800 flex-shrink-0">
                  ¥7,900 <span className="text-xs font-normal text-stone-400">/ 60分</span>
                </p>
              </div>
            </div>
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-100">
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5 mb-3">
                {singleItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-xs text-stone-500">
                    <span className="text-peach-400 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-stone-400 leading-relaxed mb-1">都度申し込み・買い切りの単発クラスです。「本格的なコーチングは考えていないけど、ちょっと誰かに相談したい」という方や、コーチング卒業後のヘルスチェックにもぴったりです。</p>
              <p className="text-xs text-stone-400 leading-relaxed mb-1">ご希望の方は <a href="mailto:admin@flatpeach.jp" className="underline hover:text-peach-500 transition-colors">admin@flatpeach.jp</a> までメールにてお問い合わせください。</p>
              <p className="text-xs text-stone-400 leading-relaxed">※ 留学・就職相談は、エージェントによる案内ではなく、講師自身の経験をもとにお話しする形になります。ビザに関する法的なご説明はできかねますのでご了承ください。</p>
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
                src="/images/profile.jpg?v=2"
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
              大学在学中にアメリカへ交換留学。卒業後はIT企業で勤務後、渡英して英国ブリストル大学大学院に進学。教育学修士号を最優秀成績（Distinction）で取得後、現地の専門学校に就職し、約2年半の英国生活を経て帰国。現在もIT企業で働きながら、Flat Peach Englishを運営。Flat Peach Englishのカウンセリングからコーチングまで、一貫して担当します。
            </p>
            <p>
              英検1級・IELTS OA7.5・TOEIC L&R 970点
            </p>
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
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Access</SectionLabel>
        <h2 className="text-2xl font-bold text-stone-800 mb-8">アクセス</h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* テキスト情報 */}
          <div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-baseline gap-3">
                <span className="text-sm font-bold text-stone-800 flex-shrink-0">水道橋駅　徒歩3分</span>
                <span className="text-xs text-stone-400">JR中央・総武線・都営三田線</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-sm font-bold text-stone-800 flex-shrink-0">神保町駅　徒歩9分</span>
                <span className="text-xs text-stone-400">都営新宿線・都営三田線・東京メトロ半蔵門線</span>
              </li>
            </ul>
            <a
              href="https://share.google/pdz7Q80kn3FFgWe43"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone-400 hover:text-peach-500 transition-colors mb-2 inline-block"
            >
              東京都千代田区神田三崎町2-8-9 フルール・テラスA-3 ↗
            </a>
            <p className="text-xs text-stone-400">オンラインでの面談も可能です。</p>
          </div>
          {/* 地図 */}
          <a
            href="https://share.google/pdz7Q80kn3FFgWe43"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden shadow-sm"
          >
            <iframe
              title="Flat Peach English アクセスマップ"
              src="https://maps.google.com/maps?q=東京都千代田区神田三崎町2-8-9+フルール・テラスA-3&hl=ja&z=16&output=embed"
              width="100%"
              height="300"
              style={{ border: 0, pointerEvents: "none" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── ContactForm (一時非公開) ──────────────────────────────────────────────────── */
/*
const FORMSPREE_URL = "https://formspree.io/f/mykbbkeq";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _replyto: form.email }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact-form" className="py-24 px-6 bg-stone-50">
      <div className="max-w-xl mx-auto">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">お問い合わせ</h2>
        <p className="text-sm text-stone-500 mb-10">
          以下のフォーム、または{" "}
          <span className="text-stone-600">admin [at] flatpeach-english.com</span>{" "}
          までお気軽にどうぞ。2営業日以内にご返信いたします。
        </p>

        {status === "success" ? (
          <div className="bg-peach-50 border border-peach-200 rounded-2xl px-8 py-12 text-center">
            <p className="text-peach-500 font-semibold mb-2">送信しました！</p>
            <p className="text-sm text-stone-500">
              お問い合わせありがとうございます。<br />2営業日以内にご返信いたします。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                お名前 <span className="text-peach-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="山田 花子"
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-peach-300 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                メールアドレス <span className="text-peach-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-peach-300 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                お問い合わせ内容 <span className="text-peach-400">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="ご質問・ご相談内容をご記入ください"
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-peach-300 transition resize-none"
              />
            </div>
            {status === "error" && (
              <p className="text-sm text-red-400">
                送信に失敗しました。時間をおいて再度お試しください。
              </p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-peach-500 hover:bg-peach-400 disabled:opacity-50 text-white font-semibold py-3.5 rounded-full transition-colors text-sm"
            >
              {status === "submitting" ? "送信中…" : "送信する"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
*/

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
          所要時間は約60分。
          <br />
          無理な勧誘は一切ありませんので、お気軽にお越しください！
        </p>
        <div className="flex items-start justify-center gap-0 mb-4 max-w-lg mx-auto">
          {[
            { n: "1", text: "目標・お悩みのヒアリング" },
            { n: "2", text: "簡易レベルチェック" },
            { n: "3", text: "プログラムのご説明" },
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
          href="https://calendar.app.google/MBRaimcXHf5hPPxY8"
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

/* ─── CheckoutPage ─────────────────────────────────────────────────── */
function CheckoutPage() {
  return (
    <main className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <img src="/images/logo.png" alt="Flat Peach English" className="h-8 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-stone-800 mb-2">プランを選んでお申し込み</h1>
          <p className="text-sm text-stone-400">ご不明な点は <a href="mailto:admin@flatpeach.jp" className="underline hover:text-peach-500 transition-colors">admin@flatpeach.jp</a> までお気軽にどうぞ。</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: `
          <stripe-pricing-table
            pricing-table-id="prctbl_1TZZnZCEXeuuStYfHKNMc4Q1"
            publishable-key="pk_live_51TYxOTCEXeuuStYfWuGxgTlFKr6aqQpjgbzRApTNQWK9MSeYveTWXFceY6qfoiIPLFavzm18iy0b6BUyjSYoeYXt00IkPB1SO5">
          </stripe-pricing-table>
        ` }} />
      </div>
    </main>
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
          <p className="text-xs text-stone-400 mt-1">東京都千代田区神田三崎町2-8-9 フルール・テラスA-3</p>
          <p className="text-xs text-stone-400 mt-1">admin [at] flatpeach.jp</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              {...(l.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-1 hover:text-peach-400 transition-colors"
            >
              {l.label}
              {l.isExternal && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              )}
            </a>
          ))}
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
