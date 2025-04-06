'use client';

import * as React from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CardBase, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card-base";

interface DemoCardProps extends Omit<React.ComponentPropsWithoutRef<typeof CardBase>, 'padding'> {
  accentColor?: string;
  hoverEffect?: boolean;
  animateEntry?: boolean;
  index?: number;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * DemoCard component
 * 
 * A styled card component that follows the DemoGenius design system
 * with white backgrounds, consistent borders, and optional accent colors.
 */
export function DemoCard({
  accentColor,
  hoverEffect = true,
  animateEntry = false,
  index = 0,
  padding = 'md',
  className,
  children,
  ...props
}: DemoCardProps) {
  const CardWrapper = animateEntry ? motion.div : React.Fragment;
  
  const motionProps = animateEntry ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: index * 0.1 }
  } : {};

  return (
    <CardWrapper {...motionProps}>
      <CardBase 
        accentColor={accentColor}
        hoverEffect={hoverEffect}
        padding={padding}
        className={className}
        {...props}
      >
        {children}
      </CardBase>
    </CardWrapper>
  );
}

/**
 * DemoCardGradientHeader component
 * 
 * A standardized header with gradient background for DemoGenius cards
 */
export function DemoCardGradientHeader({
  title,
  description,
  icon,
  className,
  ...props
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div 
      className={cn(
        "p-6 rounded-t-lg bg-gradient-to-r from-slate-900 to-slate-800 flex items-center gap-4",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="text-[#39FF14]">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-sm text-slate-300 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}

export { CardContent, CardHeader, CardTitle, CardFooter };
export default DemoCard;
