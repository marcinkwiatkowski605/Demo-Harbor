import { useEffect, useState } from 'react';

export type Brand = 'carentan' | 'railyard';

export function useBrand(initial: Brand = 'carentan'): [Brand, (b: Brand) => void] {
  const [brand, setBrand] = useState<Brand>(initial);

  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand);
  }, [brand]);

  return [brand, setBrand];
}
