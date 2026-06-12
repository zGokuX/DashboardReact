import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchProducts,
  fetchProductsCategory,
  fetchSortProductPrice,
  fetchAllCategories,
} from '@/services/requests'
import { productKeys, categoryKeys } from '@/services/queryKeys'
import { ITEM_PER_PAGE } from '@/Constants'

// Normalizziamo tutte le query prodotti alla forma { products, total }.
// Le funzioni in requests.ts ritornano shape diverse (oggetto completo vs array):
// uniformandole qui, consumatori e aggiornamenti di cache restano semplici.

export function useProducts(pageSize = ITEM_PER_PAGE, page = 0, options = {}) {
  return useQuery({
    queryKey: productKeys.list(pageSize, page),
    queryFn: async () => {
      const res = await fetchProducts(pageSize, page)
      return { products: res.products ?? [], total: res.total ?? 0 }
    },
    ...options,
  })
}

export function useProductsByCategory(category: string, options = {}) {
  return useQuery({
    queryKey: productKeys.category(category),
    queryFn: async () => {
      const products = await fetchProductsCategory(category)
      return { products: products ?? [], total: products?.length ?? 0 }
    },
    ...options,
  })
}

export function useProductsSorted(sortBy: string, options = {}) {
  return useQuery({
    queryKey: productKeys.sorted(sortBy),
    queryFn: async () => {
      const products = await fetchSortProductPrice(sortBy)
      return { products: products ?? [], total: products?.length ?? 0 }
    },
    ...options,
  })
}

export function useCategories(options = {}) {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: fetchAllCategories,
    ...options,
  })
}

// Aggiunta "locale" di un prodotto.
// dummyjson non persiste davvero la POST, quindi invalidare la query
// ricaricherebbe i dati vecchi facendo sparire l'aggiunta.
// Iniettiamo invece il prodotto in tutte le cache di lista prodotti.
export function useAddLocalProduct() {
  const queryClient = useQueryClient()

  return (product: any) => {
    queryClient.setQueriesData(
      { queryKey: productKeys.all },
      (old: any) => {
        if (!old) return old
        return {
          ...old,
          products: [...(old.products ?? []), product],
          total: (old.total ?? 0) + 1,
        }
      },
    )
  }
}
