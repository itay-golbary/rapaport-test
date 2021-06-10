export type StoneType = "Ruby" | "Sapphire" | "Diamond";

export type Shape =
  | "Round"
  | "Princess"
  | "Emerald"
  | "Asscher"
  | "Radiant"
  | "Square Radiant"
  | "Pear"
  | "Oval";

export type Clarity =
  | "FL"
  | "IF"
  | "VVS1"
  | "VVS2"
  | "VS1"
  | "VS2"
  | "SI1"
  | "SI2"
  | "SI3"
  | "I1"
  | "I2"
  | "I3";

export type DiamondColor =
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P";

interface BaseStone {
  id: number;
  type: StoneType;
  shape: Shape;
  clarity: Clarity;
  color?: DiamondColor;
}

interface Gem extends BaseStone {
  type: "Ruby" | "Sapphire";
  color?: never;
}

interface Diamond extends BaseStone {
  type: "Diamond";
  color: DiamondColor;
}

export type Stone = Gem | Diamond;

export type Stones = Stone[];
