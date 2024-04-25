export const Animations = {
  FadeDown: {
    initial: { opacity: 0, filter: "blur(8px)", y: -10 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(8px)", y: 0 },
  },
} as const;
