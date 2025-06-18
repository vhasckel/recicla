import clsx from 'clsx';
import { ButtonProps } from '@/types/components';

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...rest
}: ButtonProps): JSX.Element {
  const variantClasses = {
    primary: 'bg-primary text-lightGreen hover:bg-secondary',
    secondary: 'bg-secondary text-lightGreen hover:bg-primary',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-lightGreen',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button
      {...rest}
      className={clsx(
        'flex items-center rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:bg-primary aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
}
