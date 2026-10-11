import { Search } from 'lucide-react';
import { useStore } from '../context/MenuContext.jsx';

export default function SearchBar({ value, onChange, inputRef }) {
  const { storeInfo } = useStore();

  return (
    <label className="search-bar" htmlFor="menu-search">
      <Search size={18} />
      <input
        id="menu-search"
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar no cardápio"
        aria-label={`${storeInfo?.name ?? 'Cardápio'} buscar no cardápio`}
      />
    </label>
  );
}
