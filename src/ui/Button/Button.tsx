import type { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonType = 'button' | 'submit';
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  children: ReactNode;
  type?: ButtonType;
  className?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({
  children,
  type = 'button',
  className = '',
  variant = 'secondary',
  disabled = false,
  onClick = undefined,
}: ButtonProps) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(' ');
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
