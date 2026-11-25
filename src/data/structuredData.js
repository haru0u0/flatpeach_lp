// トップページの構造化データ（JSON-LD）。AIや検索エンジンが内容を正しく読み取るためのもの。
// 料金は pricing.js、質問は faq.js から作るので、ここで数字を直接書かないこと。
// 住所などの事業者情報は index.html の EducationalOrganization にある。
import { pricing } from "./pricing";
import { faqs } from "./faq";

const SITE = "https://flatpeach.jp/";
const ORG_ID = SITE + "#organization";
const PERSON_ID = SITE + "#haru";

const offer = (price, extra = {}) => ({
  "@type": "Offer",
  price,
  priceCurrency: "JPY",
  url: SITE + "#plans",
  availability: "https://schema.org/InStock",
  ...extra,
});

const course = ({ key, name, months, frequency, description, offers }) => ({
  "@type": "Course",
  "@id": `${SITE}#course-${key}`,
  name: `${name}（${months}か月英語コーチング）`,
  description,
  inLanguage: "ja",
  provider: { "@id": ORG_ID },
  offers,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseSchedule: {
      "@type": "Schedule",
      duration: `P${months}M`,
      repeatFrequency: frequency,
    },
    instructor: { "@id": PERSON_ID },
  },
});

const g = pricing.gyugyu;
const m = pricing.mattari;

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": ORG_ID,
      name: "Flat Peach English",
      url: SITE,
      founder: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Haru",
      jobTitle: "英語コーチ",
      worksFor: { "@id": ORG_ID },
      description:
        "Flat Peach English講師。アメリカ交換留学、IT企業勤務を経て英国ブリストル大学大学院で教育学修士（Distinction）を取得し、英国の専門学校に就職。約2年半の英国生活を経て帰国。英検1級・IELTS OA8.0・TOEIC L&R 970点。",
      alumniOf: { "@type": "CollegeOrUniversity", name: "University of Bristol" },
      knowsLanguage: ["ja", "en"],
      sameAs: ["https://note.com/flatpeach"],
    },
    course({
      key: "gyugyu",
      name: g.name,
      months: g.months,
      frequency: "P1W",
      description: `${g.months}か月の女性向けオンライン・マンツーマン英語コーチング。初回面談＋定期面談（週1回・60分×12回）、オリジナル学習ロードマップ設計、日次学習報告、週一なんでもアウトプット添削。自習を1日60分以上取れ、集中して取り組みたい方向け。`,
      offers: [
        offer(g.regular, { name: "通常価格" }),
        offer(g.monitor, {
          name: "1期生モニター価格（モニター条件へのご協力が必要）",
          priceValidUntil: pricing.monitorDeadline,
        }),
      ],
    }),
    course({
      key: "mattari",
      name: m.name,
      months: m.months,
      frequency: "P2W",
      description: `${m.months}か月の女性向けオンライン・マンツーマン英語コーチング。初回面談＋定期面談（隔週1回・60分×12回）、オリジナル学習ロードマップ設計、日次学習報告、週一なんでもアウトプット添削。自習が1日60分未満で、ゆるやかに英語を習慣化したい方向け。`,
      offers: [offer(m.regular, { name: "通常価格" })],
    }),
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};
