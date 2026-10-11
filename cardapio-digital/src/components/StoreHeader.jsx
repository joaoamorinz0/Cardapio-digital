import { useState } from 'react';
import { useStore } from '../context/MenuContext.jsx';
import { getOpenStatus } from '../utils/hours.js';

export default function StoreHeader() {
  const { storeInfo } = useStore();
  const [logoFailed, setLogoFailed] = useState(false);
  const status = getOpenStatus(storeInfo?.hours ?? []);
  const hasLogo = Boolean(storeInfo?.logo) && !logoFailed;

  return (
    <header className="store-header">
      <div className="brand-row">
        <div className={`brand-mark ${hasLogo ? 'has-logo' : 'has-fallback'}`} aria-label={storeInfo?.name ?? 'Loja'}>
          {hasLogo ? (
            <img
              src={storeInfo.logo}
              alt={storeInfo.name}
              className="brand-logo"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="brand-name-text">{storeInfo?.name ?? 'Loja'}</span>
          )}
        </div>
      </div>

      <div className="store-status" aria-live="polite">
        <span className={`status-dot ${status.isOpen ? 'open' : 'closed'}`} />
        <div className="status-copy">
          <strong>{status.isOpen ? 'Aberto agora' : 'Fechado'}</strong>
          <span>{status.scheduleText || status.nextOpenText || 'Horário indisponível'}</span>
        </div>
      </div>
    </header>
  );
}
