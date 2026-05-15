import type { Product } from "../types";
import api from "./api";

export const getProductsApi = async () : Promise<Product[]> => {
    const { data } = await api.get<Product[]>('/products')
    return data
}

export const getProductByIdApi = async (id: string) : Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`)
    return data
}

export const createProductApi = async (
  productData: Omit<Product, '_id' | 'rating' | 'numReviews' | 'createdAt'>
): Promise<Product> => {
    const { data } = await api.post<Product>('/products', productData)
    return data
}

export const updateProductApi = async (
  id: string,
  productData: Partial<Product>
): Promise<Product> => {
  const { data } = await api.put<Product>(`/products/${id}`, productData)
  return data
}

export const deleteProductApi = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`)
}