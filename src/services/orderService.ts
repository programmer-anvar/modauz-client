import type { Order, OrderItem, ShippingAddress } from "../types";
import api from "./api";

export const createOrderApi = async (
    items: OrderItem[],
    shippingAddress: ShippingAddress,
    paymentMethod: 'naqd' | 'karta'
): Promise<Order> => {
    const { data } = await api.post<Order>('/orders', {
        items,
        shippingAddress,
        paymentMethod
    })
    return data
}

export const getMyOrdersApi = async () :Promise<Order[]> => {
    const { data } = await api.get<Order[]>('/orders/myorders')
    return data
}

export const getOrderByIdApi = async (id: string) : Promise<Order> => {
    const { data } = await api.get<Order>(`/orders/${id}`)
    return data
}

export const getAllOrdersApi = async (): Promise<Order[]> => {
    const { data } = await api.get<Order[]>('/orders')
    return data
}

export const updateOrderStatusApi = async (id:string, status: Order['status']) : Promise<Order> => {
    const { data } = await api.put<Order>(`/orders/${id}/status`, {status})
    return data
}