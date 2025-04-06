'use client';

import * as React from 'react';
import { cn } from "@/lib/utils";
import { SectionTitle } from "@/components/ui/typography";
import { motion } from "framer-motion";
import { CardBase } from "@/components/ui/card-base";

interface DemoSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  action?: React.ReactNode;
  contentClassName?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

interface DemoGridProps {
  children: React.ReactNode;
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

interface DemoEmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/**
 * DemoSection component
 * 
 * A consistent section layout for DemoGenius pages with
 * optional animations and action buttons.
 */
const DemoSection = React.forwardRef<HTMLDivElement, DemoSectionProps>(({
  title,
  subtitle,
  children,
  className,
  animate = false,
  action,
  contentClassName,
  fullWidth = false,
  noPadding = false,
  ...props
}, ref) => {
  // Use regular section element unless animation is enabled
  const sectionProps = {
    className: cn("mb-8 w-full", className),
    ...props
  };
  
  const content = (
    <>
      {(title || action) && (
        <div className="flex items-center justify-between mb-6">
          {title && (
            <SectionTitle title={title} subtitle={subtitle} className="mb-0" />
          )}
          {action && (
            <div className="flex-shrink-0">{action}</div>
          )}
        </div>
      )}
      
      <div className={cn(
        "w-full",
        !fullWidth && "mx-auto",
        !noPadding && "p-0",
        contentClassName
      )}>
        {children}
      </div>
    </>
  );
  
  if (animate) {
    // Use a type-safe approach to motion props
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={sectionProps.className}
        ref={ref}
      >
        {content}
      </motion.div>
    );
  }
  
  return <section {...sectionProps} ref={ref}>{content}</section>;
});

DemoSection.displayName = "DemoSection";

/**
 * DemoGrid component
 * 
 * A consistent grid layout for organizing content
 */
const DemoGrid = React.forwardRef<HTMLDivElement, DemoGridProps>(({
  children,
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 6,
  className,
  ...props
}, ref) => {
  // Create responsive grid template columns
  const gridCols = `grid-cols-${columns.default}`;
  const gridColsSm = columns.sm ? `sm:grid-cols-${columns.sm}` : '';
  const gridColsMd = columns.md ? `md:grid-cols-${columns.md}` : '';
  const gridColsLg = columns.lg ? `lg:grid-cols-${columns.lg}` : '';
  const gridColsXl = columns.xl ? `xl:grid-cols-${columns.xl}` : '';
  
  // Create gap class
  const gapClass = `gap-${gap}`;
  
  return (
    <div 
      ref={ref}
      className={cn(
        "grid w-full",
        gridCols,
        gridColsSm,
        gridColsMd,
        gridColsLg,
        gridColsXl,
        gapClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

DemoGrid.displayName = "DemoGrid";

/**
 * DemoEmptyState component
 * 
 * A consistent empty state pattern for DemoGenius
 */
const DemoEmptyState = React.forwardRef<HTMLDivElement, DemoEmptyStateProps & React.HTMLAttributes<HTMLDivElement>>(({
  title,
  description,
  icon,
  action,
  className,
  ...props
}, ref) => {
  return (
    <CardBase
      className={cn(
        "w-full flex flex-col items-center justify-center text-center p-12", 
        className
      )}
      ref={ref}
      {...props}
    >
      {icon && (
        <div className="text-slate-300 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {description && (
        <p className="text-slate-500 mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && (
        <div>{action}</div>
      )}
    </CardBase>
  );
});

DemoEmptyState.displayName = "DemoEmptyState";

export { DemoSection, DemoGrid, DemoEmptyState };
