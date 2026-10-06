import { useState } from 'react';

const formatPrice = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function CheckoutForm({ items, subtotal, deliveryFee, total, store, onClose }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('delivery');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState(store.payments[0] ?? 'Pix');
  const [cashAmount, setCashAmount] = useState('');
  const [error, setError] = useState('');

  const orderTotal = type === 'delivery' ? total : subtotal;
  const isCash = payment === 'Dinheiro';

  function parseMoney(value) {
    const cleaned = value.replace(/R\$|\s/g, '').trim();
    if (!cleaned) return Number.NaN;

    const normalized = cleaned.includes(',')
      ? cleaned.replace(/\./g, '').replace(',', '.')
      : cleaned;
    return Number(normalized);
  }

  function submit(event) {
    event.preventDefault();
    setError('');

    let change = null;
    if (isCash) {
      const amount = parseMoney(cashAmount);

      if (!Number.isFinite(amount) || amount <= 0) {
        setError('Informe um valor válido para o pagamento em dinheiro.');
        return;
      }

      if (amount < orderTotal - 0.005) {
        setError(`O valor em dinheiro precisa ser pelo menos ${formatPrice(orderTotal)}.`);
        return;
      }

      change = Math.round((amount - orderTotal) * 100) / 100;
    }

    const lines = items.map((item) => {
      const note = item.note ? ` (Obs.: ${item.note})` : '';
      return `• ${item.quantity}x ${item.name} — ${formatPrice(item.price * item.quantity)}${note}`;
    });
    const fulfillment = type === 'delivery' ? 'Entrega' : 'Retirada no local';
    const message = [
      `Olá! Quero fazer um pedido.`,
      '',
      '*Pedido*',
      ...lines,
      '',
      `Subtotal: ${formatPrice(subtotal)}`,
      `Entrega: ${type === 'delivery' ? formatPrice(deliveryFee) : formatPrice(0)}`,
      `*Total: ${formatPrice(orderTotal)}*`,
      '',
      `Nome: ${name}`,
      `Tipo: ${fulfillment}`,
      type === 'delivery' ? `Endereço: ${address}` : '',
      `Pagamento: ${payment}`,
      isCash && change > 0 ? `Levar troco para: ${formatPrice(parseMoney(cashAmount))} (troco: ${formatPrice(change)})` : '',
      isCash && change === 0 ? 'Não precisa de troco.' : '',
    ].filter(Boolean).join('\n');
    const whatsappWindow = window.open(
      `https://wa.me/${store.phone}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );

    if (!whatsappWindow) {
      setError('Não foi possível abrir o WhatsApp. Verifique se o bloqueador de pop-ups está ativo e tente novamente.');
      return;
    }

    onClose();
  }

  return (
    <form className="checkout-form" onSubmit={submit}>
      <h3 id="checkout-title">Finalizar pedido</h3>
      <label>Seu nome<input required value={name} onChange={(event) => setName(event.target.value)} /></label>
      <fieldset>
        <legend>Como você quer receber?</legend>
        <label><input type="radio" name="type" checked={type === 'delivery'} onChange={() => setType('delivery')} /> Entrega</label>
        <label><input type="radio" name="type" checked={type === 'pickup'} onChange={() => setType('pickup')} /> Retirada</label>
      </fieldset>
      {type === 'delivery' && <label>Endereço<input required value={address} onChange={(event) => setAddress(event.target.value)} /></label>}
      <label>Forma de pagamento
        <select value={payment} onChange={(event) => { setPayment(event.target.value); setCashAmount(''); setError(''); }}>
          {store.payments.map((method) => <option key={method}>{method}</option>)}
        </select>
      </label>

      {isCash && (
        <label>
          Vai pagar com quanto?
          <input
            required
            inputMode="decimal"
            placeholder="Ex.: 50,00"
            value={cashAmount}
            onChange={(event) => { setCashAmount(event.target.value); setError(''); }}
            aria-describedby="cash-help cash-error"
            aria-invalid={Boolean(error)}
          />
          <small id="cash-help">Total do pedido: {formatPrice(orderTotal)}</small>
        </label>
      )}

      {error && <p id="cash-error" className="checkout-error" role="alert">{error}</p>}
      <button type="submit" className="checkout-button">Enviar no WhatsApp</button>
    </form>
  );
}
