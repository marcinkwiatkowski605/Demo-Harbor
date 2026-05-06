import type { Brand } from '../../lib/useBrand';
import './BrandToggle.css';

type Props = {
  brand: Brand;
  onChange: (brand: Brand) => void;
};

const BRANDS: Brand[] = ['carentan', 'railyard'];

export function BrandToggle({ brand, onChange }: Props) {
  return (
    <div className="brand-toggle" role="group" aria-label="Active brand">
      <span className="brand-toggle__label text-label-sm">Brand</span>
      <div className="brand-toggle__switch" role="radiogroup">
        {BRANDS.map((b) => (
          <button
            key={b}
            type="button"
            role="radio"
            aria-checked={brand === b}
            className="brand-toggle__option text-label-sm"
            onClick={() => onChange(b)}
          >
            {b === 'carentan' ? 'Carentan' : 'Railyard'}
          </button>
        ))}
      </div>
    </div>
  );
}
