import { motion } from "framer-motion";

export type LoaderProps = {
  size: number;
};

export const Loader = ({ size }: LoaderProps) => {
  return (
    <motion.div
      style={{ width: size, height: size, backgroundColor: "#747bff" }}
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      transition={{
        duration: 1.2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0.2,
      }}
    />
  );
};
