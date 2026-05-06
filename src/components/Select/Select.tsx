import { useId, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import './Select.css';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'value'> & {
  label: string;
  optional?: boolean;
  labelIcon?: ReactNode;
  leadingIcon?: ReactNode;
  value?: string;
  placeholder?: string;
  helperText?: ReactNode;
  helperIcon?: ReactNode;
  error?: boolean;
};

export function Select({
  label,
  optional = false,
  labelIcon,
  leadingIcon,
  value,
  placeholder,
  helperText,
  helperIcon,
  error = false,
  disabled = false,
  id,
  className,
  ...rest
}: Props) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const helperId = helperText ? `${fieldId}-helper` : undefined;

  const wrapperClasses = [
    'select',
    error && 'select--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showPlaceholder = !value;

  return (
    <div className={wrapperClasses}>
      <label htmlFor={fieldId} className="select__label-row text-label-md">
        <span>{label}</span>
        {optional ? <span className="select__label-optional text-body-md">(optional)</span> : null}
        {labelIcon ? <span className="select__label-icon">{labelIcon}</span> : null}
      </label>
      <button
        type="button"
        id={fieldId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={false}
        aria-invalid={error || undefined}
        aria-describedby={helperId}
        disabled={disabled}
        className="select__field text-body-md"
        {...rest}
      >
        {leadingIcon ? <span className="select__icon">{leadingIcon}</span> : null}
        <span
          className={
            'select__value' + (showPlaceholder ? ' select__value--placeholder' : '')
          }
        >
          {value ?? placeholder}
        </span>
        <span className="select__icon" aria-hidden="true">
          <ChevronDown size={20} strokeWidth={2} />
        </span>
      </button>
      {helperText ? (
        <div id={helperId} className="select__helper text-body-sm">
          {helperIcon ? <span className="select__helper-icon">{helperIcon}</span> : null}
          <span>{helperText}</span>
        </div>
      ) : null}
    </div>
  );
}
