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
  hiddensStemBranch: StemBranch | null;
  stemBranch: StemBranch;
}

// Results and Collections
interface HexagramResult {
  name: string;
  yiuLines: YiuLine[];
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
