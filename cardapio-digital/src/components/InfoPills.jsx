import { MapPin, ShoppingBag, Wallet } from 'lucide-react';
import { useStore } from '../context/MenuContext.jsx';
import { formatMoney } from '../utils/money.js';

export default function InfoPills() {
  const { storeInfo } = useStore();

  const items = [];

  if (storeInfo?.acceptsDelivery) {
    items.push({ label: 'Entrega', value: 'em sua região', icon: MapPin });
  }

  if (storeInfo?.acceptsPickup) {
    items.push({ label: 'Retirada', value: 'no balcão', icon: ShoppingBag });
  }

  if (Number(storeInfo?.minOrder ?? 0) > 0) {
    items.push({ label: 'Pedido mínimo', value: formatMoney(storeInfo.minOrder), icon: Wallet });
  }

  return (
    <div className="info-pills">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="info-pill">
          <span className="pill-icon">
            <Icon size={16} />
          </span>
          <div>
            <strong>{label}</strong>
            <small>{value}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
