import { supabase } from './supabase';

const hhmm = (t) => (t ? t.slice(0, 5) : null);

const toProduct = (p) => ({
  id: p.id,
  category: p.categoria_id,
  name: p.nome,
  description: p.descricao ?? '',
  ingredients: p.ingredientes
    ? p.ingredientes.split(',').map((s) => s.trim()).filter(Boolean)
    : [],
  price: Number(p.preco),
  image: p.imagem_url ?? null,
  featured: p.destaque,
  addons: (p.adicionais ?? [])
    .filter((a) => a.disponivel)
    .sort((a, b) => a.ordem - b.ordem)
    .map((a) => ({ id: a.id, name: a.nome, price: Number(a.preco) })),
});

export async function fetchMenu(slug) {
  const { data: est, error } = await supabase
    .from('estabelecimentos')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  if (!est) return null;

  const byEst = (table, select = '*') =>
    supabase.from(table).select(select).eq('estabelecimento_id', est.id);

  const [cats, prods, cfg, hours, regions, payments] = await Promise.all([
    byEst('categorias').order('ordem'),
    byEst('produtos', '*, adicionais(*)').order('ordem'),
    byEst('configuracoes').maybeSingle(),
    byEst('horarios_funcionamento').order('dia_semana'),
    byEst('regioes_entrega').order('nome'),
    byEst('formas_pagamento').order('ordem'),
  ]);

  for (const r of [cats, prods, cfg, hours, regions, payments]) {
    if (r.error) throw r.error;
  }

  return {
    storeInfo: {
      id: est.id,
      slug: est.slug,
      name: est.nome,
      tagline: est.descricao ?? '',
      address: est.endereco ?? '',
      logo: est.logo_url,
      cover: est.capa_url,
      whatsapp: est.whatsapp,
      hours: hours.data.map((h) => ({
        day: h.dia_semana,
        open: hhmm(h.abre),
        close: hhmm(h.fecha),
        closed: h.fechado,
      })),
      regions: regions.data.map((r) => ({ id: r.id, name: r.nome, fee: Number(r.taxa) })),
      payments: payments.data.map((p) => ({ id: p.id, type: p.tipo, name: p.nome })),
      minOrder: Number(cfg.data?.pedido_minimo ?? 0),
      acceptsPickup: cfg.data?.aceita_retirada ?? true,
      acceptsDelivery: cfg.data?.aceita_entrega ?? true,
      orderMessage: cfg.data?.mensagem_pedido ?? '',
      banners: [],
      deliveryFee: 0, // a taxa real vem da região escolhida no checkout
    },
    categories: cats.data.map((c) => ({ id: c.id, name: c.nome, featured: c.destaque })),
    products: prods.data.map(toProduct),
  };
}