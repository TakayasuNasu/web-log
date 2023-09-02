import { style } from "@vanilla-extract/css"

export const status = style({
  overflow: "hidden",
  paddingBlock: "16px",
  paddingInline: "12px",
})

export const statusArticle = style({
  columnGap: "12px",
})

export const face = style({
  width: "min(10.8vw, 46px)",
})

export const cardWrapper = style({
  border: "solid 1px var(--sub-bg-colour)",
  borderRadius: "16px",
})

export const ogpCard = style({
  selectors: {
    "&:hover": {
      textDecoration: "unset !important",
    },
  },
})

export const ogTextBlock = style({
  color: "var(--text-colour)",
})

export const textLg = style({
  fontSize: "16px !important",
})

export const textGray = style({
  color: "#72767a",
})
