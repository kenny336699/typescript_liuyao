import {
  BranchElement,
  FivePhaseRelation,
  Hexagram,
  PalaceNajiaRule,
  Trigram,
} from "./type";

export const hexagrams: { [key: string]: Hexagram } = {
  // 乾宮卦
  111111: { name: "乾為天", number: 1, palace: 1, type: 1 },
  111110: { name: "姤", number: 44, palace: 1, type: 2 },
  111100: { name: "遯", number: 14, palace: 1, type: 3 },
  111000: { name: "否", number: 12, palace: 1, type: 4 },
  110000: { name: "觀", number: 20, palace: 1, type: 5 },
  100000: { name: "剝", number: 23, palace: 1, type: 6 },
  101000: { name: "晉", number: 35, palace: 1, type: 7 },
  101111: { name: "大有", number: 14, palace: 1, type: 8 },

  110110: { name: "兌為澤", number: 58, palace: 2, type: 1 },
  110111: { name: "履", number: 10, palace: 2, type: 2 },
  110101: { name: "大過", number: 28, palace: 2, type: 3 },
  110001: { name: "困", number: 47, palace: 2, type: 4 },
  111001: { name: "咸", number: 31, palace: 2, type: 5 },
  101001: { name: "萃", number: 45, palace: 2, type: 6 },
  100001: { name: "臨", number: 19, palace: 2, type: 7 },
  100110: { name: "損", number: 41, palace: 2, type: 8 },

  101101: { name: "離為火", number: 30, palace: 3, type: 1 },
  101100: { name: "旅", number: 56, palace: 3, type: 2 },
  101110: { name: "鼎", number: 50, palace: 3, type: 3 },
  101010: { name: "未濟", number: 64, palace: 3, type: 4 },
  110010: { name: "渙", number: 59, palace: 3, type: 6 },
  111010: { name: "訟", number: 6, palace: 3, type: 7 },
  111101: { name: "同人", number: 13, palace: 3, type: 8 },

  "001001": { name: "震為雷", number: 51, palace: 4, type: 1 },
  "001000": { name: "豫", number: 16, palace: 4, type: 2 },
  "001010": { name: "解", number: 40, palace: 4, type: 3 },
  "001110": { name: "恆", number: 32, palace: 4, type: 4 },
  "000110": { name: "升", number: 46, palace: 4, type: 5 },
  "010110": { name: "井", number: 48, palace: 4, type: 6 },
  "011110": { name: "大過", number: 28, palace: 4, type: 7 },
  "011001": { name: "隨", number: 17, palace: 4, type: 8 },

  // 巽宮卦
  "011011": { name: "巽為風", number: 57, palace: 5, type: 1 },
  "011010": { name: "小畜", number: 9, palace: 5, type: 2 },
  "011000": { name: "家人", number: 37, palace: 5, type: 3 },
  "011100": { name: "益", number: 42, palace: 5, type: 4 },
  "010100": { name: "無妄", number: 25, palace: 5, type: 5 },
  "000100": { name: "噬嗑", number: 21, palace: 5, type: 6 },
  "001100": { name: "頤", number: 27, palace: 5, type: 7 },
  "001011": { name: "蠱", number: 18, palace: 5, type: 8 },

  // 坎宮卦
  "010010": { name: "坎為水", number: 29, palace: 6, type: 1 },
  "010011": { name: "節", number: 60, palace: 6, type: 2 },
  "010001": { name: "屯", number: 3, palace: 6, type: 3 },
  "010101": { name: "既濟", number: 63, palace: 6, type: 4 },
  "011101": { name: "革", number: 49, palace: 6, type: 5 },
  "001101": { name: "豐", number: 55, palace: 6, type: 6 },
  "000101": { name: "明夷", number: 36, palace: 6, type: 7 },
  "000010": { name: "師", number: 7, palace: 6, type: 8 },

  // 艮宮卦
  100100: { name: "艮為山", number: 52, palace: 7, type: 1 },
  100101: { name: "山火賁", number: 22, palace: 7, type: 2 },
  100111: { name: "山天大畜", number: 26, palace: 7, type: 3 },
  100011: { name: "山澤損", number: 41, palace: 7, type: 4 },
  101011: { name: "火澤睽", number: 38, palace: 7, type: 5 },
  111011: { name: "天澤履", number: 10, palace: 7, type: 6 },
  110011: { name: "風澤中孚", number: 61, palace: 7, type: 7 },
  110100: { name: "風山漸", number: 53, palace: 7, type: 8 },

  // 坤宮卦
  "000000": { name: "坤為地", number: 2, palace: 8, type: 1 },
  "000001": { name: "復", number: 24, palace: 8, type: 2 },
  "000011": { name: "臨", number: 19, palace: 8, type: 3 },
  "000111": { name: "泰", number: 11, palace: 8, type: 4 },
  "001111": { name: "大壯", number: 34, palace: 8, type: 5 },
  "011111": { name: "夬", number: 43, palace: 8, type: 6 },
  "010111": { name: "咸", number: 31, palace: 8, type: 7 },
  "010000": { name: "比", number: 8, palace: 8, type: 8 },
};

export const trigrams: { [key: string]: Trigram } = {
  // 乾(天)
  111: { name: "乾", nature: "1", symbol: "天", number: 1 },
  // 兌(澤)
  "011": { name: "兌", nature: "1", symbol: "澤", number: 2 },
  // 離(火)
  101: { name: "離", nature: "4", symbol: "火", number: 3 },
  // 震(雷)
  "001": { name: "震", nature: "2", symbol: "雷", number: 4 },
  // 巽(風)
  110: { name: "巽", nature: "2", symbol: "風", number: 5 },
  // 坎(水)
  "010": { name: "坎", nature: "3", symbol: "水", number: 6 },
  // 艮(山)
  100: { name: "艮", nature: "5", symbol: "山", number: 7 },
  // 坤(地)
  "000": { name: "坤", nature: "5", symbol: "地", number: 8 },
};

export const BRANCH_ELEMENT_ARRAY: BranchElement[] = [
  { branch: "子", element: "水", number: 3 },
  { branch: "丑", element: "土", number: 5 },
  { branch: "寅", element: "木", number: 2 },
  { branch: "卯", element: "木", number: 2 },
  { branch: "辰", element: "土", number: 5 },
  { branch: "巳", element: "火", number: 4 },
  { branch: "午", element: "火", number: 4 },
  { branch: "未", element: "土", number: 5 },
  { branch: "申", element: "金", number: 1 },
  { branch: "酉", element: "金", number: 1 },
  { branch: "戌", element: "土", number: 5 },
  { branch: "亥", element: "水", number: 3 },
];
export const branchMap: { [key: string]: BranchElement } =
  BRANCH_ELEMENT_ARRAY.reduce(
    (map: { [key: string]: BranchElement }, branchObj: BranchElement) => {
      map[branchObj.branch] = branchObj;
      return map;
    },
    {}
  );
export const PALACE_NAJIA_RULES: { [key: number]: PalaceNajiaRule } = {
  1: {
    // 乾宮：乾內甲子外壬午
    inner: {
      stem: "甲",
      branches: [branchMap["子"], branchMap["寅"], branchMap["辰"]], // 內卦地支順序
    },
    outer: {
      stem: "壬",
      branches: [branchMap["午"], branchMap["申"], branchMap["戌"]], // 外卦地支順序
    },
  },
  2: {
    // 兌宮：兌內丁巳外丁亥
    inner: {
      stem: "丁",
      branches: [branchMap["巳"], branchMap["卯"], branchMap["丑"]],
    },
    outer: {
      stem: "丁",
      branches: [branchMap["亥"], branchMap["酉"], branchMap["未"]],
    },
  },
  3: {
    // 離宮：離內己卯外己酉
    inner: {
      stem: "己",
      branches: [branchMap["卯"], branchMap["丑"], branchMap["亥"]],
    },
    outer: {
      stem: "己",
      branches: [branchMap["酉"], branchMap["未"], branchMap["己"]],
    },
  },
  4: {
    // 震宮：震內庚子外庚午
    inner: {
      stem: "庚",
      branches: [branchMap["子"], branchMap["寅"], branchMap["辰"]],
    },
    outer: {
      stem: "庚",
      branches: [branchMap["午"], branchMap["申"], branchMap["戌"]],
    },
  },
  5: {
    // 巽宮：巽內辛丑外辛未
    inner: {
      stem: "辛",
      branches: [branchMap["丑"], branchMap["亥"], branchMap["酉"]],
    },
    outer: {
      stem: "辛",
      branches: [branchMap["未"], branchMap["巳"], branchMap["卯"]],
    },
  },
  6: {
    // 坎宮：坎內戊寅外戊申
    inner: {
      stem: "戊",
      branches: [branchMap["寅"], branchMap["辰"], branchMap["午"]],
    },
    outer: {
      stem: "戊",
      branches: [branchMap["申"], branchMap["戌"], branchMap["子"]],
    },
  },
  7: {
    // 艮宮：艮內丙辰外丙戌
    inner: {
      stem: "丙",
      branches: [branchMap["辰"], branchMap["午"], branchMap["申"]],
    },
    outer: {
      stem: "丙",
      branches: [branchMap["戌"], branchMap["子"], branchMap["寅"]],
    },
  },
  8: {
    // 坤宮：坤內乙未外癸丑
    inner: {
      stem: "乙",
      branches: [branchMap["未"], branchMap["巳"], branchMap["卯"]],
    },
    outer: {
      stem: "癸",
      branches: [branchMap["丑"], branchMap["亥"], branchMap["亥"]],
    },
  },
};

export const FIVE_PHASE_RELATIONS: { [key: number]: FivePhaseRelation } = {
  1: {
    1: "兄弟", //金
    2: "妻財", //木
    3: "子孫", //水
    4: "官鬼", //火
    5: "父母", //土
  },
  2: {
    1: "官鬼",
    2: "兄弟",
    3: "父母",
    4: "子孫",
    5: "妻財",
  },
  3: {
    1: "父母",
    2: "子孫",
    3: "兄弟",
    4: "妻財",
    5: "官鬼",
  },
  4: {
    1: "妻財",
    2: "父母",
    3: "官鬼",
    4: "兄弟",
    5: "子孫",
  },
  5: {
    1: "子孫",
    2: "官鬼",
    3: "妻財",
    4: "父母",
    5: "兄弟",
  },
};
