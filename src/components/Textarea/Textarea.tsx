import { useId, type TextareaHTMLAttributes, type ReactNode } from 'react';
import './Textarea.css';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  optional?: boolean;
  helperText?: ReactNode;
  helperIcon?: ReactNode;
  showCounter?: boolean;
  error?: boolean;
};

export function Textarea({
  label,
  optional = false,
  helperText,
  helperIcon,
  showCounter = false,
  error = false,
  disabled = false,
  id,
  className,
  value,
  defaultValue,
  maxLength,
  rows = 4,
  ...rest
}: Props) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const helperId = helperText ? `${fieldId}-helper` : undefined;

  const wrapperClasses = [
    'textarea',
    error && 'textarea--error',
    disabled && 'textarea--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const currentValue =
    typeof value === 'string'
      ? value
      : typeof defaultValue === 'string'
        ? defaultValue
        : '';
  const currentLength = currentValue.length;

  return (
    <div className={wrapperClasses}>
      <label htmlFor={fieldId} className="textarea__label-row text-label-md">
        <span>{label}</span>
        {optional ? (
          <span className="textarea__label-optional text-body-md">(optional)</span>
        ) : null}
      </label>
      <div className="textarea__field text-body-md">
        <textarea
          id={fieldId}
          rows={rows}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          className="textarea__control"
          aria-invalid={error || undefined}
          aria-describedby={helperId}
          {...rest}
        />
      </div>
      {(helperText || showCounter) && (
        <div className="textarea__hints">
          {helperText ? (
            <div id={helperId} className="textarea__helper text-body-sm">
              {helperIcon ? <span className="textarea__helper-icon">{helperIcon}</span> : null}
              <span>{helperText}</span>
            </div>
          ) : (
            <div className="textarea__helper" />
          )}
          {showCounter && maxLength ? (
            <span className="textarea__counter text-body-sm">
              {currentLength}/{maxLength}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
