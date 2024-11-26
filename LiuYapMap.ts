import {
  hexagrams,
  trigrams,
  PALACE_NAJIA_RULES,
  FIVE_PHASE_RELATIONS,
} from "./data";
import { getCurrentDateDetails } from "./dateDetail";
import { arrangeSixGods, HeavenlyStem } from "./sixGod";
import {
  BranchElement,
  HexagramResult,
  RelationPosition,
  Trigram,
  YiuLine,
  StemBranch,
} from "./type";
import { findSelfResponse } from "./util";

// Cache for frequently accessed data
const trigramByNumberCache = new Map<number, Trigram>();
const palaceHexagramCache = new Map<number, string>();

// Initialize caches
function initializeCaches() {
  // Cache trigrams by number
  Object.values(trigrams).forEach((trigram) => {
    trigramByNumberCache.set(trigram.number, trigram);
  });

  // Cache palace hexagrams
  Object.entries(hexagrams).forEach(([key, hexagram]) => {
    if (hexagram.type === 1) {
      palaceHexagramCache.set(hexagram.palace, key);
    }
  });
}

// Utility functions
const getTrigramByNumber = (number: number): Trigram | undefined => {
  return trigramByNumberCache.get(number);
};

const findByPosition = (
  combinedArray: RelationPosition[],
  targetPosition: number
): RelationPosition | null => {
  return (
    combinedArray.find((item) => item.positions === targetPosition) || null
  );
};

const matchPositions = (
  relations: RelationPosition[],
  branches: BranchElement[]
): RelationPosition[] => {
  return relations.map((relation) => ({
    ...relation,
    branch: branches[relation.positions - 1].branch,
    element: branches[relation.positions - 1].element,
    number: branches[relation.positions - 1].number,
  }));
};

const calculateLiuqin = (
  naJiaRules: { stem: string; branches: BranchElement[] },
  hexgramEle: Record<number, string>
): string[] => {
  return naJiaRules.branches.map((branch) => hexgramEle[branch.number]);
};

const createStemBranch = (
  stem: string,
  branch: BranchElement,
  relation: string
): StemBranch => ({
  heavenlyStem: stem,
  earthlyBranch: branch.branch,
  element: branch.element,
  relation,
});

class HexagramAnalyzer {
  private hexStr: string;
  private hexagram: (typeof hexagrams)[keyof typeof hexagrams];
  private trigram: Trigram;
  private hexgramEle: (typeof FIVE_PHASE_RELATIONS)[keyof typeof FIVE_PHASE_RELATIONS];

  constructor(hexagramKey: string | number) {
    this.validateInput(hexagramKey);
    this.hexStr = hexagramKey.toString();
    this.hexagram = hexagrams[this.hexStr];
    this.trigram = this.getTrigramData();
    this.hexgramEle = FIVE_PHASE_RELATIONS[Number(this.trigram.nature)];
  }

  private validateInput(hexagramKey: string | number) {
    if (typeof hexagramKey !== "string" && typeof hexagramKey !== "number") {
      throw new Error("Hexagram key must be a string or number");
    }
    if (hexagramKey.toString().length !== 6) {
      throw new Error("Hexagram key must be 6 digits long");
    }
  }

  private getTrigramData(): Trigram {
    const trigram = getTrigramByNumber(this.hexagram.palace);
    if (!trigram) {
      throw new Error("Trigram not found");
    }
    return trigram;
  }

  private analyzeNajia() {
    const outerTrigramKey = this.hexStr.slice(0, 3);
    const innerTrigramKey = this.hexStr.slice(3);

    const outerTrigram = trigrams[outerTrigramKey];
    const innerTrigram = trigrams[innerTrigramKey];

    const naJiaInner = PALACE_NAJIA_RULES[innerTrigram.number].inner;
    const naJiaOuter = PALACE_NAJIA_RULES[outerTrigram.number].outer;

    return {
      inner: naJiaInner,
      outer: naJiaOuter,
      liuqin: [
        ...calculateLiuqin(naJiaInner, this.hexgramEle),
        ...calculateLiuqin(naJiaOuter, this.hexgramEle),
      ],
    };
  }

  private analyzePalaceNajia() {
    const palaceHexagramKey = palaceHexagramCache.get(this.hexagram.palace);
    if (!palaceHexagramKey) {
      throw new Error("Palace hexagram not found");
    }

    const outerTrigramKey = palaceHexagramKey.slice(0, 3);
    const innerTrigramKey = palaceHexagramKey.slice(3);

    const outerTrigram = trigrams[outerTrigramKey];
    const innerTrigram = trigrams[innerTrigramKey];

    const naJiaInner = PALACE_NAJIA_RULES[innerTrigram.number].inner;
    const naJiaOuter = PALACE_NAJIA_RULES[outerTrigram.number].outer;

    return {
      inner: naJiaInner,
      outer: naJiaOuter,
      branches: [...naJiaInner.branches, ...naJiaOuter.branches],
      liuqin: [
        ...calculateLiuqin(naJiaInner, this.hexgramEle),
        ...calculateLiuqin(naJiaOuter, this.hexgramEle),
      ],
    };
  }

  private findMissingRelations(currentRelations: string[]): string[] {
    const allRelations = new Set(["兄弟", "子孫", "妻財", "官鬼", "父母"]);
    return [...allRelations].filter((x) => !currentRelations.includes(x));
  }

  public analyze(): { result: any } {
    const dateDetail = getCurrentDateDetails().ganZhi;
    let sixGod = arrangeSixGods(dateDetail.day[0] as HeavenlyStem);

    const najia = this.analyzeNajia();
    const palaceNajia = this.analyzePalaceNajia();
    const missingRelations = this.findMissingRelations(najia.liuqin);
    const hiddenSpirits = missingRelations.map((relation) => ({
      relation,
      positions: palaceNajia.liuqin.indexOf(relation) + 1 || 0,
    }));

    const hidden = matchPositions(hiddenSpirits, palaceNajia.branches);

    const all = [...najia.inner.branches, ...najia.outer.branches];

    const yiuLines: YiuLine[] = Array.from({ length: 6 }, (_, i) => {
      const hidden1 = findByPosition(hidden, i + 1);
      return {
        sixGod: sixGod[i],
        hiddensStemBranch: hidden1
          ? createStemBranch(
              i > 2 ? palaceNajia.outer.stem : palaceNajia.inner.stem,
              {
                branch: hidden1.branch!,
                element: hidden1.element!,
                number: hidden1.number!,
              },
              hidden1.relation
            )
          : null,
        stemBranch: createStemBranch(
          i > 2 ? najia.outer.stem : najia.inner.stem,
          all[i],
          najia.liuqin[i]
        ),
      };
    });

    const { self, resp } = findSelfResponse(this.hexagram.type);
    console.log(yiuLines);
    return {
      result: {
        dateDetail,
        name: this.hexagram.name,
        yiuLines,
        self,
        resp,
      },
    };
  }
}

// Initialize caches when module loads
initializeCaches();

// Export function for external use
export function getHexagramNajia(hexagramKey: string | number): {
  result: HexagramResult;
} {
  const analyzer = new HexagramAnalyzer(hexagramKey);
  return analyzer.analyze();
}

// Example usage
const najiaInfo = getHexagramNajia("110011");
console.log(najiaInfo);
