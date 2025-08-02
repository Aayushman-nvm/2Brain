import React from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick: () => void;
}

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
};

const sizeClasses = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

function Button({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center gap-2 rounded focus:outline-none transition';
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  return (
    <button className={classes} onClick={onClick}>
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      <span>{text}</span>
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
}

export default Button;
