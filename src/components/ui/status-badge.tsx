'use client';

import * as React from 'react';
import { cn } from "@/lib/utils";

type StatusVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type SizeVariant = 'sm' | 'md' | 'lg';

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: StatusVariant;
  size?: SizeVariant;
  icon?: React.ReactNode;
  pulse?: boolean;
}

/**
 * StatusBadge component
 * 
 * A consistent badge component for indicating status with optional pulsing effect
 */
export function StatusBadge({
  variant = 'default',
  size = 'md',
  icon,
  pulse = false,
  className,
  children,
  ...props
}: StatusBadgeProps) {
  const variantStyles: Record<StatusVariant, string> = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
    primary: 'bg-[rgba(57,255,20,0.15)] text-[#39FF14]',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  };
  
  const sizeStyles: Record<SizeVariant, string> = {
    sm: 'text-xs px-2 py-0.5 rounded',
    md: 'text-xs px-2.5 py-1 rounded-md',
    lg: 'text-sm px-3 py-1.5 rounded-md',
  };

  return (
    <div
      className={cn(
        "inline-flex items-center font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && (
        <span className={cn("mr-1.5", size === 'sm' ? '-ml-0.5' : '-ml-1')}>
          {icon}
        </span>
      )}
      
      {pulse && (
        <span className="relative flex h-2 w-2 mr-1.5">
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            variant === 'primary' ? 'bg-[#39FF14]' :
            variant === 'success' ? 'bg-emerald-400' :
            variant === 'warning' ? 'bg-amber-400' :
            variant === 'danger' ? 'bg-red-400' :
            variant === 'info' ? 'bg-blue-400' :
            'bg-slate-400'
          )}></span>
          <span className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            variant === 'primary' ? 'bg-[#39FF14]' :
            variant === 'success' ? 'bg-emerald-500' :
            variant === 'warning' ? 'bg-amber-500' :
            variant === 'danger' ? 'bg-red-500' :
            variant === 'info' ? 'bg-blue-500' :
            'bg-slate-500'
          )}></span>
        </span>
      )}
      
      {children}
    </div>
  );
}

/**
 * StatusDot component
 * 
 * A simple status indicator dot with optional tooltip
 */
export function StatusDot({
  variant = 'default',
  size = 'md',
  pulse = false,
  className,
  tooltip,
  ...props
}: Omit<StatusBadgeProps, 'icon' | 'children'> & { tooltip?: string }) {
  const sizeMap = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
  };
  
  const dotColor = 
    variant === 'primary' ? 'bg-[#39FF14]' :
    variant === 'success' ? 'bg-emerald-500 dark:bg-emerald-400' :
    variant === 'warning' ? 'bg-amber-500 dark:bg-amber-400' :
    variant === 'danger' ? 'bg-red-500 dark:bg-red-400' :
    variant === 'info' ? 'bg-blue-500 dark:bg-blue-400' :
    'bg-slate-500 dark:bg-slate-400';

  return (
    <div 
      className={cn("relative inline-flex", className)} 
      {...props}
      title={tooltip}
    >
      {pulse ? (
        <span className="flex">
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            dotColor
          )}></span>
          <span className={cn(
            "relative inline-flex rounded-full",
            sizeMap[size],
            dotColor
          )}></span>
        </span>
      ) : (
        <span className={cn(
          "inline-flex rounded-full",
          sizeMap[size],
          dotColor
        )}></span>
      )}
    </div>
  );
}

export default StatusBadge;
