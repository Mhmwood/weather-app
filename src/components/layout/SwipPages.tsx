import { motion, AnimatePresence } from "framer-motion";

import { JSX } from "react";
import { useState } from "react";

type pages = {
  id: number;
  content: JSX.Element;
}[];

const SwipPages = ({ pages }: { pages: pages }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    if (newDirection === 1 && page < pages.length - 1) {
      setPage([page + 1, newDirection]);
    } else if (newDirection === -1 && page > 0) {
      setPage([page - 1, newDirection]);
    }
  };

  const swipeConfidenceThreshold = 500;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute h-full w-full px-8"
          transition={{
            x: {
              type: "spring",
              stiffness: 400,
              damping: 40,
              mass: 0.5,
            },
            opacity: { duration: 0.15 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          dragTransition={{
            bounceStiffness: 600,
            bounceDamping: 30,
          }}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {pages[page].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SwipPages;
