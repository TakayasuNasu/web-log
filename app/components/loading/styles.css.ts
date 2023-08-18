import { keyframes, style } from "@vanilla-extract/css"

const scaleUp = keyframes({
  "20%": { backgroundColor: "#ffff" },
  "40%": { transform: "scaleY(1.5)" },
})

export const loader = style({
  alignItems: "center",
})

export const bar = style({
  display: "inline-block",
  width: "3px",
  height: "20px",
  backgroundColor: "rgba(255, 255, 255, .5)",
  animation: `${scaleUp} 1s linear infinite`,

  selectors: {
    "&:nth-child(2)": {
      height: "35px",
      marginInline: "5px",
      animationDelay: ".25s",
    },

    "&:nth-child(3)": {
      animationDelay: ".5s",
    },
  },
})
