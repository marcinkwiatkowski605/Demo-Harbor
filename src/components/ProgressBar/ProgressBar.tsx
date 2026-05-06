import { Info } from 'lucide-react';
import './ProgressBar.css';

type Props = {
  label: string;
  current: number;
  total: number;
  motivationalText?: string;
};

export function ProgressBar({ label, current, total, motivationalText }: Props) {
  const pct = total > 0 ? Math.min(100, (current / total) * 100) : 0;

  return (
    <div className="progress-bar">
      <div className="progress-bar__labels">
        <span className="progress-bar__label text-label-md">{label}</span>
        <div className="progress-bar__counter">
          <span className="progress-bar__count text-body-md">
            {current}/{total}
          </span>
          <span className="progress-bar__icon">
            <Info size={20} strokeWidth={1.5} />
          </span>
        </div>
      </div>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>
      {motivationalText ? (
        <p className="progress-bar__subtitle text-body-sm">{motivationalText}</p>
      ) : null}
    </div>
  );
}
