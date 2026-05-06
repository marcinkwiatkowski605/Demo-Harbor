import { BrandToggle } from './components/BrandToggle';
import { FormCard } from './screens/FormCard';
import { useBrand } from './lib/useBrand';

export function App() {
  const [brand, setBrand] = useBrand('carentan');

  return (
    <>
      <main
        style={{
          minHeight: '100vh',
          padding: 'var(--space-48) var(--space-24)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FormCard />
      </main>
      <BrandToggle brand={brand} onChange={setBrand} />
    </>
  );
}
