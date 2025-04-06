'use client';

import * as React from 'react';
import { cn } from "@/lib/utils";
import theme from "@/lib/design-tokens";

/**
 * Heading component
 * 
 * Consistent heading styles for h1-h6 elements
 */
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: 'default' | 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

export function Heading({
  as: Component = 'h2',
  size = 'md',
  color = 'default',
  className,
  children,
  ...props
}: HeadingProps) {
  const sizeClasses = {
    xs: 'text-sm font-medium',
    sm: 'text-base font-medium',
    md: 'text-lg font-semibold',
    lg: 'text-xl font-semibold',
    xl: 'text-2xl font-semibold',
    '2xl': 'text-3xl font-bold',
    '3xl': 'text-4xl font-bold',
    '4xl': 'text-5xl font-bold',
  };

  const colorClasses = {
    default: 'text-slate-900 dark:text-slate-50',
    primary: 'text-slate-900 dark:text-white',
    secondary: 'text-slate-700 dark:text-slate-300',
    accent: 'text-[#39FF14]',
  };

  return (
    <Component
      className={cn(
        sizeClasses[size],
        colorClasses[color],
        'tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Text component
 * 
 * Consistent paragraph and text styles
 */
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'accent';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  children: React.ReactNode;
}

export function Text({
  as: Component = 'p',
  size = 'md',
  color = 'default',
  weight = 'normal',
  className,
  children,
  ...props
}: TextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const colorClasses = {
    default: 'text-slate-900 dark:text-slate-100',
    primary: 'text-slate-800 dark:text-slate-200',
    secondary: 'text-slate-600 dark:text-slate-400',
    muted: 'text-slate-500 dark:text-slate-500',
    accent: 'text-[#39FF14]',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <Component
      className={cn(
        sizeClasses[size],
        colorClasses[color],
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * KeyPoint component
 * 
 * Standard formatting for key points with bullet indicator
 */
export function KeyPoint({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-start", className)} {...props}>
      <div className="shrink-0 w-1 h-1 rounded-full bg-[#39FF14] mt-1.5 mr-1.5"></div>
      <Text 
        size="sm" 
        color="secondary" 
        className="line-clamp-1"
      >
        {children}
      </Text>
    </div>
  );
}

/**
 * SectionTitle component
 * 
 * Standardized section titles with optional subtitle
 */
export function SectionTitle({
  title,
  subtitle,
  className,
  ...props
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-6", className)} {...props}>
      <Heading size="lg" className="mb-1">
        {title}
      </Heading>
      {subtitle && (
        <Text color="secondary" size="sm">
          {subtitle}
        </Text>
      )}
    </div>
  );
}

export function Label({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span 
      className={cn(
        "text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Heading as H1, Heading as H2, Heading as H3, Heading as H4, Heading as H5, Heading as H6 };
