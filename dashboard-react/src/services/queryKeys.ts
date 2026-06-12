// Fabbrica centralizzata delle query key di React Query.
// Tenerle in un unico punto rende prevedibili invalidazioni e aggiornamenti di cache.

export const productKeys = {
  // Prefisso comune: usato per aggiornare/invalidare tutte le liste prodotti insieme.
  all: ['products'] as const,
  list: (pageSize: number, page: number) =>
    [...productKeys.all, 'list', { pageSize, page }] as const,
  category: (category: string) =>
    [...productKeys.all, 'category', category] as const,
  sorted: (sortBy: string) =>
    [...productKeys.all, 'sorted', sortBy] as const,
}

export const categoryKeys = {
  all: ['categories'] as const,
}
