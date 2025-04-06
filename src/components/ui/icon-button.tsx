'use client';

import * as React from 'react';
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

type IconButtonSize = 'sm' | 'md' | 'lg' | 'icon';
type IconButtonVariant = ButtonProps['variant'] | 'accent';

interface IconButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof Button>, 'variant' | 'size'> {
  icon: React.ReactNode;
  label?: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  rounded?: boolean;
}

/**
 * IconButton component
 * 
 * A consistent icon button that follows the DemoGenius design language
 */
export function IconButton({
  icon,
  label,
  variant = 'default',
  size = 'md',
  rounded = false,
  className,
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10',
    icon: 'h-10 w-10',
  };
  
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    icon: 'h-5 w-5',
  };
  
  const variantOverrides = {
    accent: 'bg-[#39FF14] hover:bg-[#32E512] text-black font-medium',
  };

  // Determine button variant
  let buttonVariant: ButtonProps['variant'] = variant as ButtonProps['variant'];
  if (variant === 'accent') {
    buttonVariant = 'default'; // Use default as base but we'll override its styles
  }

  // Map size to shadcn/ui button sizes
  const buttonSize: ButtonProps['size'] = size === 'icon' ? 'icon' : size;

  return (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      className={cn(
        sizeClasses[size],
        rounded && "rounded-full",
        variant === 'accent' && variantOverrides.accent,
        className
      )}
      aria-label={label}
      title={label}
      {...props}
    >
      <span className={cn(iconSizes[size])}>
        {icon}
      </span>
    </Button>
  );
}

/**
 * ActionButton component
 * 
 * A button with icon and text that follows the DemoGenius design language
 */
export function ActionButton({
  icon,
  children,
  variant = 'default',
  size = 'default',
  className,
  ...props
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: IconButtonVariant;
  size?: ButtonProps['size'];
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<typeof Button>, 'variant'>) {
  // Determine button variant
  let buttonVariant: ButtonProps['variant'] = variant as ButtonProps['variant'];
  if (variant === 'accent') {
    buttonVariant = 'default'; // Use default as base but we'll override its styles
  }

  return (
    <Button
      variant={buttonVariant}
      size={size}
      className={cn(
        variant === 'accent' && "bg-[#39FF14] hover:bg-[#32E512] text-black font-medium",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="mr-2">
          {icon}
        </span>
      )}
      {children}
    </Button>
  );
}

export default IconButton;
