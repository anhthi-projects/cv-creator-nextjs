/*
 * App
 */

export enum Page {
  Width = 1000,
  Heigh = 1000 * 1.402,
  PadTopBottom = 70,
  PadLeftRight = 50,
  LeftColWidth = 320,
}

/*
 * Colors
 */

export enum Color {
  Primary = "#16a085",
  PrimaryDarker = "#13816B",
  White = "#ffffff",
  Blue = "#0773e8",

  Light1 = "#eff1f7",
  Light2 = "#e6e8f0",
  Light3 = "#d8dae5",
  Light4 = "#c0c2cc",
  Light5 = "#9598a6",
  Light6 = "#737580",
  Light7 = "#575966",
  Light8 = "#41434d",
  Light9 = "#363840",
  Light10 = "#2b2d33",
  Light11 = "#212126",
  Light12 = "#18191c",
  Light13 = "#0b0b0d",
}

/*
 * Font
 */

export enum FontSize {
  Base = "16px",
  Xs = "0.70rem",
  Sm = "0.85rem",
  Md = "1.0rem",
  Lg = "1.15rem",
  Xl = "1.3rem",
  Xl1 = "1.6rem",
  Xl2 = "2.0rem",
}

export enum FontWeight {
  Light = 300,
  SemiLight = 400,
  Normal = 500,
  SemiBold = 600,
  Bold = 700,
}

/*
 * Space
 */

export enum Space {
  px2 = "2px",
  px4 = "4px",
  px6 = "6px",
  px8 = "8px",
  px12 = "12px",
  px16 = "16px",
  px20 = "20px",
  px28 = "28px",
  px36 = "36px",
  px44 = "44px",
  px56 = "56px",
  px70 = "70px",
}

/*
 * Space
 */

export enum ZIndex {
  z10 = 10,
  z20 = 20,
  z30 = 30,
  z40 = 40,
  z50 = 50,
  z60 = 60,
  z70 = 70,
  z80 = 80,
  z90 = 90,
}

/*
 * Breakpoints
 */

export enum MediaQuery {
  Sm = "@media (max-width: 640px)",
  Md = "@media only screen and (max-width: 768px)",
  Lg = "@media (max-width: 1024px)",
  Xl = "@media (max-width: 1280px)",
}
