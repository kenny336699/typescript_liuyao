// Core structures
interface Hexagram {
  name: string;
  number: number;
  palace: number;
  type: number;
}

interface Trigram {
  name: string;
  nature: string;
  symbol: string;
  number: number;
}

// Branch and Element related
interface BranchElement {
  branch: string;
  element: string;
  number: number;
}

// Najia (Pattern) related
interface PalaceNajiaRule {
  inner: {
    stem: string;
    branches: BranchElement[];
  };
  outer: {
    stem: string;
    branches: BranchElement[];
  };
}

interface StemBranch {
  heavenlyStem: string;
  earthlyBranch: string;
  element: string;
  relation: string;
}

// Line and Position related
interface RelationPosition {
  relation: string;
  positions: number;
  branch?: string;
  element?: string;
  number?: number;
}

interface YiuLine {
  sixGod: string; // 新增：為了型別完整性，建議把這個加上
  hiddensStemBranch: StemBranch | null;
  stemBranch: StemBranch;
  // [新增] 變爻資訊：如果是靜爻則為 null
  bianStemBranch: StemBranch | null;
}
interface GanZhiDetails {
  year: string;
  month: string;
  day: string;
  hour: string;
}
// Results and Collections
interface HexagramResult {
  name: string;
  yiuLines: YiuLine[];
  // [新增] dateDetail 屬性
  dateDetail: GanZhiDetails;
  // [新增] self 和 resp 屬性 (因為它們在 analyze() 中回傳了)
  self: number;
  resp: number;
}
interface FivePhaseRelation {
  [key: number]: string;
}

// Map types for collections
interface HexagramMap {
  [key: string]: Hexagram;
}

interface TrigramMap {
  [key: string]: Trigram;
}

interface PalaceNajiaRuleMap {
  [key: number]: PalaceNajiaRule;
}

interface FivePhaseRelationMap {
  [key: string]: FivePhaseRelation;
}

export type {
  Hexagram,
  Trigram,
  BranchElement,
  PalaceNajiaRule,
  StemBranch,
  RelationPosition,
  YiuLine,
  HexagramResult,
  FivePhaseRelation,
  HexagramMap,
  TrigramMap,
  PalaceNajiaRuleMap,
  FivePhaseRelationMap,
};
