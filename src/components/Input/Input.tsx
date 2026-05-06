import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import './Input.css';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string;
  optional?: boolean;
  labelIcon?: ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  helperText?: ReactNode;
  helperIcon?: ReactNode;
  error?: boolean;
};

export function Input({
  label,
  optional = false,
  labelIcon,
  leadingIcon,
  trailingIcon,
  helperText,
  helperIcon,
  error = false,
  disabled = false,
  id,
  className,
  ...rest
}: Props) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  const wrapperClasses = [
    'input',
    error && 'input--error',
    disabled && 'input--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <label htmlFor={inputId} className="input__label-row text-label-md">
        <span>{label}</span>
        {optional ? <span className="input__label-optional text-body-md">(optional)</span> : null}
        {labelIcon ? <span className="input__label-icon">{labelIcon}</span> : null}
      </label>
      <div className="input__field text-body-md">
        {leadingIcon ? <span className="input__field-icon">{leadingIcon}</span> : null}
        <input
          id={inputId}
          className="input__control"
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={helperId}
          {...rest}
        />
        {trailingIcon ? <span className="input__field-icon">{trailingIcon}</span> : null}
      </div>
      {helperText ? (
        <div id={helperId} className="input__helper text-body-sm">
          {helperIcon ? <span className="input__helper-icon">{helperIcon}</span> : null}
          <span>{helperText}</span>
        </div>
      ) : null}
    </div>
  );
}
