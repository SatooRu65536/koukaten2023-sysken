export function getStyle(buildId: string): {
  gap: number;
  bottomSpace: number;
  widthRatio: number;
} {
  switch (buildId) {
    case "1号館":
      return { widthRatio: 1, gap: 6.5, bottomSpace: 0 };
    case "10号館":
      return { widthRatio: 1, gap: 15, bottomSpace: 17 };
    case "4号館":
      return { widthRatio: 0.7, gap: 15, bottomSpace: 8 };
    case "4号館別館":
      return { widthRatio: 0.87, gap: 15, bottomSpace: 8 };
    default:
      return { widthRatio: 1, gap: 6.5, bottomSpace: 0 };
  }
}

export function round(num: number | null) {
  if (num === null) return null;
  if (num > 100) return 100;
  if (num % 1 === 0) return num.toFixed(1);
  return Math.round(num * 10) / 10;
}

// yyyy-mm-ddの形式で返す
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month < 10) month.toString().padStart(2, "0");
  const day = date.getDay();
  if (day < 10) day.toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 2桁の数字に変換する
export function formatNumber(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}
