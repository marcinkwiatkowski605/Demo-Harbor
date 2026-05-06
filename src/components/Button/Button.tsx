import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type Size = 'lg' | 'md' | 'sm';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  size?: Size;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
};

export function Button({
  size = 'lg',
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  children,
  className,
  type = 'button',
  ...rest
}: Props) {
  const classes = [
    'button',
    'text-label-lg',
    size !== 'lg' && `button--size-${size}`,
    fullWidth && 'button--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {leadingIcon ? <span className="button__icon">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="button__icon">{trailingIcon}</span> : null}
    </button>
  );
}
