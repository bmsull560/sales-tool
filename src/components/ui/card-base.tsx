'use client';

import * as React from 'react';
import { cn } from "@/lib/utils";
import theme from "@/lib/design-tokens";

interface CardBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  accentColor?: string;
  noBorder?: boolean;
  noShadow?: boolean;
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * CardBase component
 * 
 * A foundational card component that ensures consistent styling across 
 * the application with white backgrounds, consistent borders and shadows.
 */
const CardBase = React.forwardRef<HTMLDivElement, CardBaseProps>(({
  accentColor,
  noBorder = false,
  noShadow = false,
  hoverEffect = true,
  padding = 'md',
  className,
  children,
  ...props
}, ref) => {
  // Generate padding class based on theme
  const paddingClass = padding === 'none' 
    ? '' 
    : padding === 'sm' 
      ? `p-${theme.components.card.padding.sm.replace('rem', '').replace('.', '')}`
      : padding === 'lg' 
        ? `p-${theme.components.card.padding.lg.replace('rem', '').replace('.', '')}`
        : `p-${theme.components.card.padding.md.replace('rem', '').replace('.', '')}`;
  
  // Generate border styles
  const borderStyles: React.CSSProperties = {};
  if (accentColor) {
    borderStyles.borderTopColor = accentColor;
    borderStyles.borderTopWidth = '3px';
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        // Use white background from theme
        "bg-white dark:bg-slate-950 rounded-lg",
        !noBorder && "border border-slate-200 dark:border-slate-800",
        !noShadow && "shadow-sm",
        hoverEffect && "transition-all duration-200 hover:shadow-md",
        paddingClass,
        className
      )}
      style={borderStyles}
      {...props}
    >
      {children}
    </div>
  );
});

CardBase.displayName = "CardBase";

/**
 * CardTitle component
 * 
 * A consistently styled card title
 */
function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

/**
 * CardDescription component
 * 
 * A consistently styled card description
 */
function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm text-slate-500 dark:text-slate-400",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/**
 * CardHeader component
 * 
 * A consistently styled card header
 */
function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CardContent component
 * 
 * A consistently styled card content area
 */
function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "p-6 pt-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CardFooter component
 * 
 * A consistently styled card footer
 */
function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center p-6 pt-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { CardBase, CardTitle, CardDescription, CardHeader, CardContent, CardFooter };
