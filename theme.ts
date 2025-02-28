"use client";

import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  colors: {
    'snow': [
      "#f1f5f9", // SNOW
      "#e2e6ec",
      "#c0ccd9",
      "#9bb1c8",
      "#7c99b9",
      "#688ab0",
      "#5e83ac",
      "#4d7098",
      "#426588",
      "#345779"
    ],
    'pillow': [
      "#f0eefc", // PILLOW
      "#ddd8f3",
      "#b7ace9",
      "#907de0",
      "#6e56d8",
      "#5a3ed4",
      "#4f31d3",
      "#4125bb",
      "#3921a7",
      "#2f1a93"
    ],
    'milkshake': [
      "#eeeaff",
      "#d8d0ff",
      "#ac9cff",
      "#7e64ff", // MILKSHAKE
      "#5836fe",
      "#4019fe",
      "#3209ff",
      "#2500e4",
      "#1e00cc",
      "#1200b4"
    ],
    'gravy': [
      "#f3f5f7",
      "#e6e7e7",
      "#cacccf",
      "#aab1b8",
      "#8f99a4",
      "#7d8a98",
      "#748394",
      "#617081",
      "#556573",
      "#465768"  // GRAVY
    ],
    'electric': [
      "#e0fcff",
      "#cef4ff",
      "#a0e5fa",
      "#6ed7f5",
      "#48cbf1",
      "#2fc3ef",
      "#19bfef", // ELECTRIC
      "#00a8d5",
      "#0096bf",
      "#0082a9"
    ],
    'cornflower': [
      "#e5fbfe",
      "#d9eff2",
      "#b8dbe2",
      "#94c7d0",
      "#75b6c0",
      "#62abb7",
      "#54a6b4", // CORNFLOWER
      "#42909f",
      "#34818e",
      "#1b707d"
    ],
    'amethyst': [
      "#f1efff",
      "#dfdcf7",
      "#bcb6e6",
      "#968dd6", // AMETHYST
      "#766bc9",
      "#6255c1",
      "#584abe",
      "#493ca8",
      "#403497",
      "#352d87"
    ],
    'sunflower': [
      "#fff7e3",
      "#f9ecd1",
      "#f0d7a9",
      "#e6c07d",
      "#dead57",
      "#d9a13e", // SUNFLOWER
      "#d79b30",
      "#bf8721",
      "#a97819",
      "#94660c"
    ],
    'pistachio': [
      "#f6fae9",
      "#eaf2db",
      "#d6e3b7",
      "#bfd491",
      "#adc771",
      "#a0bf5b",
      "#99bb4f",
      "#85a43f", // PISTACHIO
      "#759135",
      "#647e28"
    ],
    'rose': [
      "#ffecec",
      "#f8dbdb",
      "#e7b6b6",
      "#d68e8f",
      "#c86d6d",
      "#c05758", // ROSE
      "#bd4b4d",
      "#a73c3e",
      "#953436",
      "#84292c"
    ],
    'pearl': [
      "#eff4fe",
      "#e0e6ef", // PEARL
      "#bfcbda",
      "#9caec6", 
      "#7e96b5",
      "#6b86ab",
      "#617fa7",
      "#4f6c94",
      "#456085",
      "#365377"
    ],
    'smoke': [
      "#eff4ff",
      "#dfe6f1",
      "#c1ccda",
      "#a1afc2",
      "#8697af", // SMOKE
      "#7488a3",
      "#6a809e",
      "#596e8a",
      "#4c617e",
      "#3c5571"
    ],
    'anchor': [
      "#f2f4f7",
      "#e4e6e8",
      "#c6cbd2",
      "#a4adbc",
      "#8895a9",
      "#76869e",
      "#6c7f9a",
      "#5b6c87",
      "#506079",
      "#41536c"  // ANCHOR
    ],
  },

  fontFamily: "Roboto, sans-serif",
  fontFamilyMonospace: "Roboto Mono",

  headings: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "500",
  },

  fontSizes: {
    xs: rem(10),
    sm: rem(14),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
  },

  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.65',
  },
});
