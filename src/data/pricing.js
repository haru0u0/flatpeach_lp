// 料金はこのファイルだけで管理する。
// LPの表示・特定商取引法の表示・構造化データ（AI/検索エンジン向け）がすべてここを読む。
// ※ 受講規約の本文（チャットサポート月額など）は法的文書なので個別に直すこと。

export const pricing = {
  gyugyu: {
    name: "ぎゅぎゅっとコース",
    months: 3,
    regular: 120000,
    monitor: 99000, // 1期生モニター価格
  },
  mattari: {
    name: "まったりコース",
    months: 6,
    regular: 180000,
  },
  tsumamigui: {
    name: "つまみぐいクラス",
    price: 7900, // 60分
  },
  chatSupport: 10000, // 月額・任意
  monitorDeadline: "2026-12-31", // 1期生モニターの申込期限
};

// 例: 120000 → "¥120,000"
export const yen = (n) => "¥" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
