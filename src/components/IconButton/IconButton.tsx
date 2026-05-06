import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './IconButton.css';

type Size = 'lg' | 'md' | 'sm';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: ReactNode;
  size?: Size;
  'aria-label': string;
};

export function IconButton({
  icon,
  size = 'sm',
  className,
  type = 'button',
  ...rest
}: Props) {
  const classes = [
    'icon-button',
    size !== 'sm' && `icon-button--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      <span className="icon-button__icon">{icon}</span>
    </button>
  );
}
