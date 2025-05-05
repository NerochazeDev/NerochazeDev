import React from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement>, MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animationType?: "fadeIn" | "slideUp" | "slideRight" | "scale" | "bounce";
}

export function AnimatedContainer({
  children,
  delay = 0,
  duration = 0.3,
  className,
  animationType = "fadeIn",
  ...props
}: AnimatedContainerProps) {
  
  const getAnimationVariants = () => {
    switch (animationType) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case "slideUp":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
      case "slideRight":
        return {
          hidden: { x: -20, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case "scale":
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 }
        };
      case "bounce":
        return {
          hidden: { y: 10, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
              delay
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={getAnimationVariants()}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedList({
  children,
  staggerDelay = 0.1,
  className,
  animationType = "slideUp",
  ...props
}: AnimatedContainerProps & { staggerDelay?: number }) {
  
  const getAnimationVariants = () => {
    switch (animationType) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case "slideUp":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
      case "slideRight":
        return {
          hidden: { x: -20, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case "scale":
        return {
          hidden: { scale: 0.95, opacity: 0 },
          visible: { scale: 1, opacity: 1 }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={cn(className)}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={getAnimationVariants()}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}