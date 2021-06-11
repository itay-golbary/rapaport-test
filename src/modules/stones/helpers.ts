import { Clarity, DiamondColor, Shape, Stones, StoneType } from "./types";

const TypeList: StoneType[] = ["Diamond", "Sapphire", "Ruby"];

const ShapeList: Shape[] = [
  "Round",
  "Princess",
  "Emerald",
  "Asscher",
  "Radiant",
  "Square Radiant",
  "Pear",
  "Oval",
];

const ClarityList: Clarity[] = [
  "FL",
  "IF",
  "VVS1",
  "VVS2",
  "VS1",
  "VS2",
  "SI1",
  "SI2",
  "SI3",
  "I1",
  "I2",
  "I3",
];

const DiamondColorList: DiamondColor[] = [
  "D",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
];

const generateStones = () => {
  const list: Stones = [];

  TypeList.forEach((type) => {
    if (type === "Diamond") {
      ShapeList.forEach((shape) => {
        ClarityList.forEach((clarity) => {
          DiamondColorList.forEach((color) => {
            list.push({ id: list.length, type, shape, clarity, color });
          });
        });
      });
    } else {
      ShapeList.forEach((shape) => {
        ClarityList.forEach((clarity) => {
          list.push({ id: list.length, type, shape, clarity });
        });
      });
    }
  });

  return list;
};

export { generateStones, TypeList, ShapeList, ClarityList, DiamondColorList };
