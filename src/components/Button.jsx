import React from 'react';

const VARIANT_CLASSES = {
  primary:
    'bg-gradient-to-r from-primary to-secondary text-white shadow-glow-primary hover:brightness-110 active:scale-[0.98]',
  secondary:
    'bg-surface-secondary text-text-main border border-border hover:border-primary/60 hover:bg-surface-secondary/80 active:scale-[0.98]',
  outline:
    'bg-transparent text-text-main border border-border hover:border-primary hover:text-primary active:scale-[0.98]',
  ghost:
    'bg-transparent text-text-muted hover:text-text-main hover:bg-surface-secondary/70 active:scale-[0.98]',
  danger:
    'bg-danger text-white hover:brightness-110 active:scale-[0.98]',
  success:
    'bg-success text-white hover:brightness-110 active:scale-[0.98]',
};

const SIZE_CLASSES = {
  sm: 'min-h-[36px] px-3 py-1.5 text-xs gap-1.5 rounded-lg',
  md: 'min-h-[42px] px-4 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'min-h-[48px] px-6 py-3 text-base gap-2.5 rounded-2xl',
  icon: 'min-h-[40px] min-w-[40px] p-2 rounded-xl justify-center',
};

/**
 * Reusable accessible button component with consistent design tokens.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center font-semibold transition-all duration-150 select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary,
        SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;

