import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-stone-800">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/tokushoho" element={<TokushohoPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/monitor" element={<MonitorPage />} />
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
      {/* <Service /> */}
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
  { label: "Plans", href: "#plans" },
  { label: "Instructor", href: "#instructor" },
  { label: "Access", href: "#access" },
  { label: "Blog", href: "https://note.com/flatpeach", isExternal: true },
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
        <a href="/">
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
            href="#contact"
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
            href="#contact"
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
                <p className="text-sm font-bold leading-none">2026.06.16</p>
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
      "「第二言語習得論」という分野の研究によって、第二言語を習得するためのプロセスやメカニズムが解明されてきています。しかし、コーチがそれに基づいて設計したロードマップをこなすだけでは、卒業後に自分の力で計画を立てられません。Flat Peachでは、この科学的な知見を学習者のみなさまにも丁寧にシェアし、「学び方を学ぶ」時間を設けています。仕組みを自分で理解するからこそ、卒業後も迷わずに効果的な学習方法を自分で選び、実行できるようになります。",
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
    { text: "オリジナル学習ロードマップ設計", sub: [
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
    { text: "オリジナル学習ロードマップ設計", sub: [
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
              期間: "3か月", 面談: "週1回・60分（全12回）",
              向け: "英語学習の優先度が高く、ぐっと集中して取り組みたい方",
              目安: "目安：自習時間が60分以上/日取れる方",
              price: null,
              monitor: true,
            },
            {
              name: "まったりコース", sub: "6か月コーチング", icon: "/images/slice.png",
              期間: "6か月", 面談: "隔週1回・60分（全12回）",
              向け: "仕事や生活と両立しながら、ゆるやかに英語を習慣化したい方",
              目安: "目安：自習時間が60分未満/日の方",
              price: "¥180,000", priceSub: "月々 ¥30,000 × 6か月",
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
                {[["期間", plan.期間], ["面談", plan.面談]].map(([label, val]) => (
                  <div key={label} className="px-5 py-3 flex justify-between items-center gap-4">
                    <span className="text-xs text-stone-600 flex-shrink-0">{label}</span>
                    <span className="text-sm text-stone-700 text-right">{val}</span>
                  </div>
                ))}
                <div className="px-5 py-3 flex justify-between items-center gap-4">
                  <span className="text-xs text-stone-600 flex-shrink-0">24hチャットサポート</span>
                  <span className="text-sm text-stone-500 text-right">+¥10,000/月（任意）</span>
                </div>
                <div className="px-5 py-3">
                  <p className="text-xs text-stone-600 mb-1">こんな人向け</p>
                  <p className="text-sm text-stone-600 mb-0.5">{plan.向け}</p>
                  <p className="text-xs text-stone-400">{plan.目安}</p>
                </div>
                <div className="px-5 py-4">
                  {plan.monitor ? (
                    <>
                      <p className="text-base font-bold text-stone-300 line-through">¥120,000</p>
                      <p className="text-xs text-stone-300 line-through mb-3">月々 ¥40,000 × 3か月</p>
                      <div className="bg-peach-50 border border-peach-200 rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="bg-peach-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">モニター募集中</span>
                          <span className="text-peach-500 text-xs border border-peach-300 px-2 py-0.5 rounded-full">先着2名</span>
                        </div>
                        <div className="flex items-end gap-2">
                          <p className="text-stone-800 font-bold text-2xl leading-tight">¥87,000</p>
                          <p className="text-peach-400 text-xs font-bold mb-0.5">¥33,000 OFF</p>
                        </div>
                        <p className="text-stone-400 text-xs mt-0.5">月々 ¥29,000 × 3か月</p>
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
              <p className="text-xs text-stone-400">自習進捗確認・学習相談、英語の学び方レッスン、弱点補強レッスン　など</p>
            </div>
            <div className="px-6 py-4 border-r border-stone-100 flex items-center">
              <p className="text-sm text-stone-700">週1回</p>
            </div>
            <div className="px-6 py-4 flex items-center">
              <p className="text-sm text-stone-700">隔週1回</p>
            </div>
          </div>


          {/* オリジナル学習ロードマップ設計 */}
          <div className="grid grid-cols-3 border-t border-stone-100">
            <div className="px-6 py-4 border-r border-stone-100">
              <p className="text-xs text-stone-700">オリジナル学習ロードマップ設計</p>
            </div>
            <div className="px-6 py-4 border-r border-stone-100 flex items-center">
              <span className="text-peach-400 font-bold text-sm">✓</span>
            </div>
            <div className="px-6 py-4 flex items-center">
              <span className="text-peach-400 font-bold text-sm">✓</span>
            </div>
          </div>

          {/* 24hチャットサポート（オプション） */}
          <div className="grid grid-cols-3 border-t border-stone-100">
            <div className="px-6 py-4 border-r border-stone-100">
              <p className="text-xs text-stone-700 mb-1">24hチャットサポート</p>
              <p className="text-xs text-stone-400">30時間以内に返信・月ごとに加入OK</p>
            </div>
            <div className="px-6 py-4 border-r border-stone-100 flex items-center">
              <p className="text-sm text-stone-500">+¥10,000/月（任意）</p>
            </div>
            <div className="px-6 py-4 flex items-center">
              <p className="text-sm text-stone-500">+¥10,000/月（任意）</p>
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
              <p className="text-base font-bold text-stone-300 line-through">¥120,000</p>
              <p className="text-xs text-stone-300 line-through mb-3">月々 ¥40,000 × 3か月</p>
              <div className="bg-peach-50 border border-peach-200 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-peach-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">モニター募集中</span>
                  <span className="text-peach-500 text-xs border border-peach-300 px-2 py-0.5 rounded-full">先着2名</span>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-stone-800 font-bold text-2xl leading-tight">¥87,000</p>
                  <p className="text-peach-400 text-xs font-bold mb-0.5">¥33,000 OFF</p>
                </div>
                <p className="text-stone-400 text-xs mt-0.5">月々 ¥29,000 × 3か月</p>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-2xl font-bold text-stone-800">¥180,000</p>
              <p className="text-xs text-stone-400 mt-1">月々 ¥30,000 × 6か月</p>
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

/* ─── Blog ─────────────────────────────────────────────────────────── */
function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/note-rss")
      .then((r) => r.json())
      .then((data) => {
        if (data.items?.length > 0) setPosts(data.items);
      })
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-20 px-6 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        <SectionLabel>Blog</SectionLabel>
        <h2 className="text-2xl font-bold text-stone-800 mb-8">最新のnote</h2>

        <ul className="divide-y divide-stone-200">
          {posts.map((post) => (
            <li key={post.guid}>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-baseline gap-5 py-4 group"
              >
                <span className="flex-shrink-0 text-xs text-stone-400 tabular-nums">
                  {new Date(post.pubDate).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-sm text-stone-700 group-hover:text-peach-500 transition-colors leading-relaxed">
                  {post.title}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <a
            href="https://note.com/flatpeach"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-peach-500 hover:text-peach-600 transition-colors"
          >
            noteをもっと見る →
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
          コーチングの内容や進め方をていねいにご説明するので、気になることは何でも聞いてください。
          <br />
          無理な勧誘は一切ありませんので、お気軽にどうぞ！
        </p>
        <div className="flex items-start justify-center gap-0 mb-4 max-w-lg mx-auto">
          {[
            { n: "1", text: "目標・お悩みのヒアリング" },
            { n: "2", text: "簡易レベルチェック" },
            { n: "3", text: "プログラムのご説明・Q&A" },
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
        {/* SP: ボタンで新規タブ */}
        <div className="md:hidden mt-8">
          <a
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ePcXNWFS5VRUaoqVfaM9qD1481p1JNoOQYk4Y4VEbCrlzF5LFY5lUpIto_PmL6zpTxeUD78Ri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-peach-500 hover:bg-peach-50 font-semibold px-10 py-4 rounded-full shadow-lg transition-colors text-sm"
          >
            日程を選んで予約する →
          </a>
        </div>
        {/* PC: iframe埋め込み */}
        <div className="hidden md:block mt-8 rounded-2xl overflow-hidden shadow-lg bg-white">
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ePcXNWFS5VRUaoqVfaM9qD1481p1JNoOQYk4Y4VEbCrlzF5LFY5lUpIto_PmL6zpTxeUD78Ri?gv=true"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            title="無料カウンセリング予約"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── TermsPage ────────────────────────────────────────────────────── */
function Article({ title, children, red = false }) {
  return (
    <section className={`space-y-2 ${red ? "text-red-600" : ""}`}>
      <h2 className={`text-sm font-bold mb-3 ${red ? "text-red-600" : "text-stone-800"}`}>{title}</h2>
      {children}
    </section>
  );
}

function P({ children, red }) {
  return <p className={`text-sm leading-relaxed ${red ? "text-red-600" : "text-stone-600"}`}>{children}</p>;
}

function Ol({ items, red }) {
  return (
    <ol className="space-y-1.5 list-none">
      {items.map((item, i) => (
        <li key={i} className={`text-sm leading-relaxed flex gap-2 ${red ? "text-red-600" : "text-stone-600"}`}>
          <span className="flex-shrink-0">{i + 1}．</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function Sub({ items, red }) {
  return (
    <ol className="space-y-1 ml-4 list-none">
      {items.map((item, i) => (
        <li key={i} className={`text-sm leading-relaxed flex gap-2 ${red ? "text-red-600" : "text-stone-600"}`}>
          <span className="flex-shrink-0">（{i + 1}）</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function TermsPage() {
  return (
    <main className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <img src="/images/logo.png" alt="Flat Peach English" className="h-8 w-auto object-contain mb-8" />
        <h1 className="text-2xl font-bold text-stone-800 mb-4">受講規約</h1>
        <p className="text-sm text-stone-600 leading-relaxed mb-12">
          本受講規約（以下「本規約」といいます。）は、Flat Peach English（以下「当スクール」といいます。）が提供する英語コーチングサービス（以下「本サービス」といいます。）の利用条件を定めるものです。受講を希望される方（以下「受講希望者」といいます。）は、本規約の内容をご確認・ご同意のうえ、お申込みください。
        </p>

        <div className="space-y-10">
          <Article title="第1条（適用）">
            <Ol items={[
              "本規約は、当スクールと受講者との間の一切の関係に適用されます。",
              "当スクールが別途定める個別の利用条件、ガイドライン等がある場合、これらも本規約の一部を構成します。",
            ]} />
          </Article>

          <Article title="第2条（サービス内容）">
            <Ol items={[
              "本サービスには、以下のコースがあります。各コースの内容・受講期間・面談回数・受講料等の詳細は、当スクールのウェブサイト（https://www.flatpeach.jp）に定めるとおりとします。",
              "本サービスは、対面またはオンライン（Google Meetを使用します。）により提供します。",
              "当スクールは、受講者に事前に通知したうえで、本サービスの内容、提供方法、料金等を変更することがあります。",
            ]} />
            <Sub items={[
              "ぎゅぎゅっとコース（受講期間：3か月）",
              "まったりコース（受講期間：6か月）",
              "つまみぐいクラス（単発）",
              "その他、当スクールが別途定めるコースまたはメニュー",
            ]} />
          </Article>

          <Article title="第3条（申込み・契約の成立）">
            <Ol items={[
              "受講希望者は、当スクールが定める方法（無料カウンセリングを経たうえでのウェブサイト上の申込手続き等）により、本サービスの申込みを行うものとします。",
              "本サービスの利用契約（以下「本契約」といいます。）は、受講希望者が本規約に同意し、当スクール所定の申込手続きを完了し、当スクールが申込みを承諾した時点で成立します。本契約の成立をもって、受講希望者は「受講者」となります。",
              "当スクールは、以下のいずれかに該当する場合、申込みを承諾しないことがあります。この場合、当スクールはその理由を開示する義務を負いません。",
            ]} />
            <Sub items={[
              "申込内容に虚偽または不正確な情報がある場合",
              "当スクールの運営上、受入れが困難と判断した場合",
              "その他、当スクールが不適当と合理的に判断した場合",
            ]} />
          </Article>

          <Article title="第4条（受講料・支払い）">
            <Ol items={[
              "受講料は、当スクールのウェブサイトに表示された金額とします。",
              "受講者は、申込時にクレジットカード決済（Stripe）により受講料を一括でお支払いください。",
              "当スクールは、受講料のほか、入学金および登録料はいただきません。ただし、市販の教材を使用する場合は、教材費を別途ご負担いただきます。",
              "受講者が任意で24時間チャットサポートに加入する場合は、月額10,000円（税込）を別途お支払いいただきます。チャットサポートは月単位での加入・解約が可能です。なお、月の途中で加入または解約された場合であっても、当該月のチャットサポート料の日割り計算による返金は行いません。",
              "当スクールは、アンケートへの回答、口コミ・体験談の提供その他当スクールが定める条件（以下「モニター条件」といいます。）への協力を前提として、受講料を割引した価格（以下「モニター料金」といいます。）を適用することがあります。モニター条件の具体的な内容は、お申込み時に別途ご案内し、受講者の同意を得たうえで適用します。",
              "モニター料金が適用された受講者がモニター条件を履行しなかった場合、当スクールは、通常料金とモニター料金との差額を請求できるものとします。",
              "モニター条件に基づき受講者から提供された口コミ・体験談等は、当スクールのウェブサイト、SNS等において、受講者を特定しない形で掲載することがあります。受講者は、掲載された口コミ等について、当スクールに対しいつでも削除を求めることができ、当スクールは速やかにこれに応じます。",
            ]} />
          </Article>

          <Article title="第5条（受講開始）">
            <Ol items={[
              "当スクールは、受講者の決済完了を確認した後、初回面談の日程調整その他受講開始に必要なご案内を行います。",
              "初回面談の実施をもって「受講開始」とします。",
              "受講期間は、受講開始日から当該コースに定める期間とします。",
            ]} />
          </Article>

          <Article title="第6条（面談の実施・キャンセル・振替）">
            <Ol items={[
              "定期面談は、1回60分とし、各コースに定める頻度（ぎゅぎゅっとコースは週1回、まったりコースは隔週1回）で実施します。面談の日時は、受講者と当スクールの協議により決定します。",
              "受講者は、面談日の前日までに当スクールに連絡することにより、面談の日程を変更（振替）することができます。当日のキャンセルまたは無断欠席の場合は、1回分を消化したものとして取り扱います。",
              "受講者が面談開始時刻から20分以上遅刻した場合は、当該面談はキャンセル扱いとし、1回分を消化したものとして取り扱います。",
              "受講者が面談開始時刻から20分未満の遅刻の場合、面談は実施しますが、遅刻した分の延長は行いません。",
              "つまみぐいクラスのキャンセル・変更についても、前日までにご連絡ください。当日キャンセルの場合、当該レッスンを受講したものとみなし、受講料の返金および代替日への振替は行いません。",
              "当スクールの都合により面談を実施できない場合は、代替日程にて振替を行います。",
            ]} />
          </Article>

          <Article title="第7条（受講期間の満了）">
            <Ol items={[
              "本契約は、受講期間の満了をもって終了します。",
              "面談回数に残りがある場合であっても、受講期間の満了により本契約は終了し、未実施分の面談の繰越しや返金は行いません。ただし、当スクールの都合により実施できなかった面談についてはこの限りではなく、当スクールは受講者と協議のうえ対応いたします。",
            ]} />
          </Article>

          <Article title="第8条（クーリング・オフ）" red>
            <Ol red items={[
              "ぎゅぎゅっとコースおよびまったりコースは、特定商取引に関する法律に定める特定継続的役務提供に該当します。受講者は、本規約を受領した日から起算して8日間は、書面または電磁的記録（メール等を含みます。）により、無条件で本契約の解除（クーリング・オフ）をすることができます。",
              "クーリング・オフがなされた場合、当スクールは、受講者がすでに支払った受講料の全額を速やかに返金いたします。当スクールは、クーリング・オフに伴う損害賠償または違約金の請求は行いません。",
              "クーリング・オフの期間内にすでに本サービスの一部が提供されていた場合であっても、受講者は対価の支払いを求められることはありません。",
              "つまみぐいクラスは単発のサービスであり、本条の適用対象外です。",
            ]} />
          </Article>

          <Article title="第9条（中途解約・返金）">
            <Ol items={[
              "受講者は、ぎゅぎゅっとコースまたはまったりコースの受講期間中、理由を問わず、書面または電磁的記録（メール等を含みます。）により、将来に向かって本契約を解約することができます。",
              "受講開始前に受講者が解約した場合、当スクールは、15,000円を上限とする事務手数料を控除した残額を返金いたします。",
              "受講開始後に受講者が中途解約した場合、当スクールは、以下のとおり精算し、返金すべき金額がある場合は速やかに返金いたします。",
              "前各項の定めにかかわらず、返金額が0円以下となる場合は、返金は行いません。",
              "つまみぐいクラスは、その性質上、サービス提供後のキャンセルおよび返金はお受けできません。",
            ]} />
            <Sub items={[
              "提供済みの役務の対価（受講料総額 ÷ 面談全回数 × 実施済み面談回数）",
              "解約手数料（50,000円または契約残額の20%のいずれか低い方）",
              "返金額 ＝ 受講料総額 −（1）−（2）",
            ]} />
          </Article>

          <Article title="第10条（禁止事項）">
            <P>受講者は、以下の行為を行ってはなりません。</P>
            <Sub items={[
              "当スクールまたは他の受講者に対する迷惑行為、ハラスメント行為",
              "本サービスの運営を妨害する行為",
              "虚偽の情報を提供する行為",
              "本サービスを通じて得た情報を利用した営業活動、勧誘行為",
              "第12条に定める知的財産権を侵害する行為",
              "法令または公序良俗に違反する行為",
              "その他、当スクールが不適切と合理的に判断する行為",
            ]} />
          </Article>

          <Article title="第11条（受講資格の取消し）">
            <Ol items={[
              "当スクールは、受講者が前条の禁止事項に違反した場合その他本規約に重大な違反があった場合、事前に催告したうえで受講資格を取り消すことができます。ただし、違反の程度が著しい場合は、催告なく取り消すことができます。",
              "前項により受講資格が取り消された場合、受講料の返金については第9条を準用します。",
            ]} />
          </Article>

          <Article title="第12条（知的財産権）">
            <Ol items={[
              "本サービスを通じて提供される教材、資料、カリキュラム、ロードマップその他一切のコンテンツの著作権およびその他の知的財産権は、当スクールに帰属します。",
              "受講者は、当スクールの事前の書面による承諾なく、コンテンツの転載、複製、配布、第三者への共有、またはSNS等への公開を行ってはなりません。",
              "面談の録画および録音は、当スクールが許可した場合を除き、禁止します。",
            ]} />
          </Article>

          <Article title="第13条（成果の不保証）">
            <Ol items={[
              "本サービスは、受講者の英語力の向上、資格試験の合格その他特定の成果や効果を保証するものではありません。英語学習の成果は個人差があり、効果の感じ方は受講者によって異なります。",
              "受講者は、本サービスの利用により得られる気づき、判断および行動について、自らの責任で行うものとします。",
            ]} />
          </Article>

          <Article title="第14条（免責事項・損害賠償）">
            <Ol items={[
              "当スクールは、本サービスの提供に関して、当スクールの故意または重大な過失による場合を除き、受講者に生じた損害について責任を負いません。",
              "当スクールが責任を負う場合であっても、その範囲は受講者が支払った受講料の額を上限とします。",
              "通信環境の障害、天災、その他当スクールの合理的な支配の及ばない事由により本サービスを提供できなかった場合、当スクールは責任を負いません。ただし、この場合、当スクールは代替日程での振替等、合理的な対応を行います。",
            ]} />
          </Article>

          <Article title="第15条（個人情報の取扱い）">
            <P>当スクールは、受講者の個人情報を、当スクールのプライバシーポリシー（当スクールのウェブサイト（https://www.flatpeach.jp）内に掲載）に従い、適切に取り扱います。</P>
          </Article>

          <Article title="第16条（反社会的勢力の排除）">
            <P>受講者および当スクールは、現在および将来にわたり、暴力団、暴力団員、反社会的勢力またはこれらと密接な関係を有する者でないことを表明し保証します。これに違反した場合、相手方は催告なく本契約を解除できるものとします。</P>
          </Article>

          <Article title="第17条（規約の変更）">
            <Ol items={[
              "当スクールは、必要に応じて本規約を変更することができます。",
              "変更後の規約は、当スクールが受講者に通知した時点（メール送信またはウェブサイト上への掲載）で効力を生じるものとします。",
              "変更通知後に受講者が本サービスの利用を継続した場合、変更後の規約に同意いただいたものとみなします。",
            ]} />
          </Article>

          <Article title="第18条（準拠法・管轄）">
            <Ol items={[
              "本規約の成立・効力・解釈および履行については、日本法を準拠法とします。",
              "本規約に関する紛争については、東京地方裁判所または東京簡易裁判所を第一審の専属的合意管轄裁判所とします。",
            ]} />
          </Article>

          <Article title="第19条（協議解決）">
            <P>本規約に定めのない事項または本規約の解釈に疑義が生じた場合は、受講者と当スクールが誠実に協議のうえ解決するものとします。</P>
          </Article>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-100 text-xs text-stone-500 space-y-1">
          <p>制定日：2026年6月16日</p>
          <p>Flat Peach English</p>
          <p>所在地：東京都千代田区神田三崎町2-8-9 フルール・テラスA-3</p>
          <p>連絡先：admin@flatpeach.jp</p>
        </div>
        <div className="mt-8">
          <a href="/" className="text-xs text-peach-500 hover:text-peach-600 transition-colors">
            ← トップページに戻る
          </a>
        </div>
      </div>
    </main>
  );
}

/* ─── PrivacyPage ──────────────────────────────────────────────────── */
function PrivacyPage() {
  const sections = [
    {
      title: "1. 取得する個人情報",
      body: "当スクールは、以下の場面においてお客様の個人情報を取得します。\n・無料カウンセリングのご予約時（氏名、メールアドレス等）\n・受講前ヒアリングフォームへのご回答時（学習状況、目標等）",
    },
    {
      title: "2. 利用目的",
      body: "取得した個人情報は、以下の目的のみに使用します。\n・カウンセリング・コーチングサービスの提供\n・ご予約・日程調整のご連絡\n・サービスに関するご案内",
    },
    {
      title: "3. 第三者への提供",
      body: "法令に基づく場合を除き、お客様の個人情報を第三者に提供することはありません。",
    },
    {
      title: "4. 業務委託について",
      body: "サービス提供にあたり、以下の外部サービスを利用しています。これらのサービスに必要な範囲でデータが共有されます。\n・Google LLC（カレンダー予約・フォーム）\n・Stripe, Inc.（決済処理）",
    },
    {
      title: "5. Cookieの使用について",
      body: "当サイトでは、Google Analytics（Google LLC提供）によるアクセス解析のためにCookieを使用しています。収集されるデータは匿名であり、個人を特定するものではありません。Google Analyticsの無効化はGoogle社が提供するブラウザアドオンにより可能です。",
    },
    {
      title: "6. 個人情報の管理",
      body: "取得した個人情報は適切に管理し、不正アクセス・紛失・漏洩の防止に努めます。",
    },
    {
      title: "7. 開示・訂正・削除",
      body: "個人情報の開示・訂正・削除をご希望の場合は、admin@flatpeach.jp までご連絡ください。",
    },
    {
      title: "8. プライバシーポリシーの変更",
      body: "本ポリシーは予告なく変更することがあります。変更後はサイト上に掲載した時点で効力を生じます。",
    },
  ];

  return (
    <main className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <img src="/images/logo.png" alt="Flat Peach English" className="h-8 w-auto object-contain mb-8" />
          <h1 className="text-2xl font-bold text-stone-800 mb-2">プライバシーポリシー</h1>
          <p className="text-sm text-stone-500">Flat Peach Englishは、お客様の個人情報の取り扱いについて、以下のとおり定めます。</p>
        </div>
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-sm font-bold text-stone-800 mb-2">{s.title}</h2>
              <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-stone-100 text-xs text-stone-400">
          制定日：2026年6月16日
        </div>
        <div className="mt-6">
          <a href="/" className="text-xs text-peach-500 hover:text-peach-600 transition-colors">
            ← トップページに戻る
          </a>
        </div>
      </div>
    </main>
  );
}

/* ─── TokushohoPage ────────────────────────────────────────────────── */
function TokushohoPage() {
  const rows = [
    ["販売業者", "Flat Peach English"],
    ["代表者名", "請求があり次第、遅滞なく開示いたします"],
    ["所在地", "東京都千代田区神田三崎町2-8-9 フルール・テラスA-3"],
    ["電話番号", "請求があり次第、遅滞なく開示いたします"],
    ["メールアドレス", "admin@flatpeach.jp"],
    ["サービス内容", "マンツーマン英語コーチング"],
    ["料金", "ぎゅぎゅっとコース ¥120,000（モニター価格 ¥87,000）/ まったりコース ¥180,000 / つまみぐいクラス ¥7,900（すべて税込）"],
    ["料金以外の費用", "市販の教材を使用する場合、別途教材費をご負担いただきます"],
    ["支払い方法", "クレジットカード（Stripe）"],
    ["支払い時期", "お申し込み時に一括前払い"],
    ["サービス提供時期", "お支払い確認後、別途ご案内する日程よりサービスを開始します"],
    ["キャンセル・返金", "準備中"],
    ["動作環境", "オンライン受講の場合、インターネット接続環境が必要です"],
  ];

  return (
    <main className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <img src="/images/logo.png" alt="Flat Peach English" className="h-8 w-auto object-contain mb-8" />
          <h1 className="text-2xl font-bold text-stone-800 mb-2">特定商取引法に基づく表記</h1>
        </div>
        <table className="w-full text-sm border-collapse">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-t border-stone-100">
                <th className="text-left text-xs text-stone-500 font-medium py-4 pr-6 align-top w-36 flex-shrink-0">
                  {label}
                </th>
                <td className="text-stone-700 py-4 leading-relaxed">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-12 pt-6 border-t border-stone-100">
          <a href="/" className="text-xs text-peach-500 hover:text-peach-600 transition-colors">
            ← トップページに戻る
          </a>
        </div>
      </div>
    </main>
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
            pricing-table-id="prctbl_1TjMZ3CEXeuuStYfnHJUMk6L"
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
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-stone-600 text-xs text-stone-500 flex flex-wrap justify-between gap-4">
        <span>© {new Date().getFullYear()} Flat Peach English. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-peach-400 transition-colors">プライバシーポリシー</a>
          <a href="/tokushoho" className="hover:text-peach-400 transition-colors">特定商取引法に基づく表記</a>
        </div>
      </div>
    </footer>
  );
}


/* ─── MonitorPage ──────────────────────────────────────────────────── */
function MonitorPage() {
  return (
    <main className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <img src="/images/logo.png" alt="Flat Peach English" className="h-8 w-auto object-contain mb-8" />
        <h1 className="text-2xl font-bold text-stone-800 mb-4">モニター受講条件</h1>
        <p className="text-sm text-stone-600 leading-relaxed mb-12">
          本ページは、Flat Peach Englishのモニター価格でのご受講を検討されている方に向けた条件説明ページです。モニター価格は、以下の条件へのご協力を前提として適用されます。
        </p>

        <div className="space-y-10">
          <Article title="ご協力いただく内容">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-stone-800 mb-2">1. アンケートへのご回答</h3>
                <P>受講中または修了後に、アンケートにご回答いただきます。学習の進捗・実際のカリキュラムや面談の進め方・コーチングの感想のほか、体験談の記入欄を設けます。</P>
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-800 mb-2">2. 写真またはスクリーンショット（1〜2点）</h3>
                <P>受講中または修了後に、次のいずれかをご提供いただけると助かります。どれか1点でも構いません。</P>
                <Sub items={[
                  "単語帳の進捗、学習時間の記録などのスクリーンショット",
                  "受講前後のレベルチェックスコアの比較（数値のみ）",
                  "自習スペースや教材の写真（お顔が映らないものでOK）",
                ]} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-800 mb-2">3. カリキュラム・進め方の事例紹介</h3>
                <P>ご受講の内容（初回面談でのヒアリング内容、レベルチェック結果、カリキュラムの進め方、自習の取り組みなど）を、当スクールがまとめたうえで、note等に事例記事として掲載させていただく場合があります。掲載にあたっては、内容・掲載範囲を事前にご確認いただき、同意をいただいたうえで公開します。</P>
              </div>
              <div className="bg-stone-50 rounded-xl px-5 py-4">
                <p className="text-xs font-bold text-stone-700 mb-2">【1・2・3 共通】</p>
                <P>いただいた内容は、個人が特定できない範囲で、かつ文意を変えない範囲での編集のうえ、LPやSNSに掲載することがあります。氏名は掲載せず、ファーストネーム・イニシャルのいずれかをお選びいただけます。</P>
              </div>
            </div>
          </Article>

          <Article title="モニター条件が履行されなかった場合">
            <P>詳細は受講規約第4条をご確認ください。</P>
          </Article>

          <Article title="ご不明点について">
            <P>条件についてご不明な点があれば、カウンセリング時またはメール（<a href="mailto:admin@flatpeach.jp" className="underline hover:text-peach-500 transition-colors">admin@flatpeach.jp</a>）にてお気軽にご質問ください。</P>
          </Article>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-100">
          <a href="/" className="text-xs text-peach-500 hover:text-peach-600 transition-colors">
            ← トップページに戻る
          </a>
        </div>
      </div>
    </main>
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
