// Define the Six Gods (traditional Chinese names)
type SixGods = "青龙" | "朱雀" | "勾陈" | "腾蛇" | "白虎" | "玄武";

// Define Heavenly Stems (traditional Chinese characters)
export type HeavenlyStem =
  | "甲"
  | "乙"
  | "丙"
  | "丁"
  | "戊"
  | "己"
  | "庚"
  | "辛"
  | "壬"
  | "癸";

// Mapping of Heavenly Stems to their Six Gods starting positions
const SIX_GODS_STARTING_MAP: Record<HeavenlyStem, number> = {
  甲: 0,
  乙: 1,
  丙: 2,
  丁: 3,
  戊: 4,
  己: 5,
  庚: 0,
  辛: 1,
  壬: 2,
  癸: 3,
};

// Predefined sequence of Six Gods
const SIX_GODS_SEQUENCE: SixGods[] = [
  "青龙",
  "朱雀",
  "勾陈",
  "腾蛇",
  "白虎",
  "玄武",
];

export function arrangeSixGods(stem: HeavenlyStem): SixGods[] {
  // Get the starting index for the given Heavenly Stem
  const startingIndex = SIX_GODS_STARTING_MAP[stem];

  // Rearrange Six Gods cyclically based on the starting index
  return SIX_GODS_SEQUENCE.map(
    (_, index) => SIX_GODS_SEQUENCE[(startingIndex + index) % 6]
  );
}
