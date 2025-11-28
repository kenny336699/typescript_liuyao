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

function initializeCaches() {
  Object.values(trigrams).forEach((trigram) => {
    trigramByNumberCache.set(trigram.number, trigram);
  });
  Object.entries(hexagrams).forEach(([key, hexagram]) => {
    if (hexagram.type === 1) {
      palaceHexagramCache.set(hexagram.palace, key);
    }
  });
}

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

// [新增] 輔助函式：反轉指定位置的 bit (用於生成變卦字串)
// pos: 0-5 (0是對應 hexStr 的第一個字元，即上爻)
const flipBitAt = (str: string, index: number): string => {
  const char = str[index];
  const newChar = char === "0" ? "1" : "0";
  return str.substring(0, index) + newChar + str.substring(index + 1);
};

class HexagramAnalyzer {
  private hexStr: string;
  private hexagram: (typeof hexagrams)[keyof typeof hexagrams];
  private trigram: Trigram;
  private hexgramEle: (typeof FIVE_PHASE_RELATIONS)[keyof typeof FIVE_PHASE_RELATIONS];
  private movingLines: number[]; // [新增] 存儲動爻位置 (1-6)

  // [修改] 建構子增加 movingLines 參數，預設為空陣列
  constructor(hexagramKey: string | number, movingLines: number[] = []) {
    this.validateInput(hexagramKey);
    this.hexStr = hexagramKey.toString();
    this.movingLines = movingLines;

    this.hexagram = hexagrams[this.hexStr];
    if (!this.hexagram) {
      throw new Error(`Hexagram key ${this.hexStr} not found in data.`);
    }

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

  // 通用的納甲分析，可以傳入任意卦的 Key
  private analyzeNajiaCommon(targetHexStr: string) {
    const outerTrigramKey = targetHexStr.slice(0, 3);
    const innerTrigramKey = targetHexStr.slice(3);

    const outerTrigram = trigrams[outerTrigramKey];
    const innerTrigram = trigrams[innerTrigramKey];

    if (!outerTrigram || !innerTrigram) {
      throw new Error(`Invalid trigram structure in ${targetHexStr}`);
    }

    const naJiaInner = PALACE_NAJIA_RULES[innerTrigram.number].inner;
    const naJiaOuter = PALACE_NAJIA_RULES[outerTrigram.number].outer;

    return {
      inner: naJiaInner,
      outer: naJiaOuter,
      // 注意：這裡的 branches 只是地支本身，不含六親，因為六親取決於「本卦」
      allBranches: [...naJiaInner.branches, ...naJiaOuter.branches],
      innerStem: naJiaInner.stem,
      outerStem: naJiaOuter.stem,
    };
  }

  private analyzeNajia() {
    const common = this.analyzeNajiaCommon(this.hexStr);
    return {
      inner: common.inner,
      outer: common.outer,
      liuqin: [
        ...calculateLiuqin(common.inner, this.hexgramEle),
        ...calculateLiuqin(common.outer, this.hexgramEle),
      ],
    };
  }

  private analyzePalaceNajia() {
    const palaceHexagramKey = palaceHexagramCache.get(this.hexagram.palace);
    if (!palaceHexagramKey) {
      throw new Error("Palace hexagram not found");
    }

    const common = this.analyzeNajiaCommon(palaceHexagramKey);

    return {
      inner: common.inner,
      outer: common.outer,
      branches: [...common.inner.branches, ...common.outer.branches],
      liuqin: [
        ...calculateLiuqin(common.inner, this.hexgramEle),
        ...calculateLiuqin(common.outer, this.hexgramEle),
      ],
      outerStem: common.outerStem,
      innerStem: common.innerStem,
    };
  }

  private findMissingRelations(currentRelations: string[]): string[] {
    const allRelations = new Set(["兄弟", "子孫", "妻財", "官鬼", "父母"]);
    return [...allRelations].filter((x) => !currentRelations.includes(x));
  }

  // [新增] 計算變卦字串
  private getBianHexStr(): string | null {
    if (this.movingLines.length === 0) return null;

    let bianStr = this.hexStr;
    this.movingLines.forEach((lineIdx) => {
      // hexStr 索引 0 是上爻 (Line 6)，索引 5 是初爻 (Line 1)
      // 轉換公式: StringIndex = 6 - lineIdx
      const strIdx = 6 - lineIdx;
      if (strIdx >= 0 && strIdx < 6) {
        bianStr = flipBitAt(bianStr, strIdx);
      }
    });
    return bianStr;
  }

  public analyze(): { result: HexagramResult } {
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

    // [新增] 處理變卦
    const bianHexStr = this.getBianHexStr();
    let bianNajiaData = null;

    if (bianHexStr) {
      // 獲取變卦的納甲資訊 (地支)
      bianNajiaData = this.analyzeNajiaCommon(bianHexStr);
    }

    const yiuLines: YiuLine[] = Array.from({ length: 6 }, (_, i) => {
      const lineNum = i + 1;
      const hidden1 = findByPosition(hidden, lineNum);

      // [新增] 計算變爻資料
      let bianStemBranchData: StemBranch | null = null;

      // 只有當此爻是動爻，且我們成功計算出變卦時，才填入資料
      if (this.movingLines.includes(lineNum) && bianNajiaData) {
        const bianBranch = bianNajiaData.allBranches[i];
        const bianStem =
          i > 2 ? bianNajiaData.outerStem : bianNajiaData.innerStem;

        // 關鍵：變爻的六親，是用「變出來的地支」對比「本卦的五行屬性」
        const relation = this.hexgramEle[bianBranch.number];

        bianStemBranchData = createStemBranch(bianStem, bianBranch, relation);
      }

      return {
        sixGod: sixGod[i],
        hiddensStemBranch: hidden1
          ? createStemBranch(
              // 修正邏輯：伏神通常參考本宮首卦
              i > 2 ? palaceNajia.outerStem : palaceNajia.innerStem,
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
        bianStemBranch: bianStemBranchData, // [新增]
      };
    });

    const { self, resp } = findSelfResponse(this.hexagram.type);

    // 如果有變卦，也可以試著找出變卦的名字 (Optional)
    let bianHexName = "";
    if (bianHexStr && hexagrams[bianHexStr]) {
      bianHexName = hexagrams[bianHexStr].name;
    }

    return {
      result: {
        dateDetail,
        name: this.hexagram.name + (bianHexName ? ` 之 ${bianHexName}` : ""), // 修改顯示名稱
        yiuLines,
        self,
        resp,
      },
    };
  }
}

initializeCaches();

// [修改] 函式簽名，增加 movingLines 參數
export function getHexagramNajia(
  hexagramKey: string | number,
  movingLines: number[] = [] // 預設無動爻
): {
  result: HexagramResult; // 記得確認 HexagramResult 的定義是否需要擴充 name 欄位
} {
  const analyzer = new HexagramAnalyzer(hexagramKey, movingLines);
  return analyzer.analyze();
}

const najiaInfo = getHexagramNajia("111111", [2, 5]); // 測試乾為天，二爻和五爻動
console.log(najiaInfo);
// Example usage
// 110011 (澤天夬? 或者是其他)
// 假設動了初爻(1) 和 三爻(3)
// const najiaInfo = getHexagramNajia("110011", [1, 3]);
// console.log(JSON.stringify(najiaInfo, null, 2));
