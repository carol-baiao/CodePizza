"use client"

import { createContext, ReactNode, useState } from "react";
import { OrderDetail } from "./OrderDetail.types";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderDetail;
}

type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState<OrderDetail>({} as OrderDetail);

    async function onRequestOpen(order_id: string) {
        const response = await api.get("/order/detail", {
            headers: {
                Authorization: `Bearer ${getCookieClient()}`
            },
            params: {
                order_id: order_id
            }
        })

        setOrder(response.data);
        setIsOpen(true);
    }

    function onRequestClose() {
        setIsOpen(false);
    }

    return(
        <OrderContext.Provider value={{isOpen, onRequestOpen, onRequestClose, order}}>
           {children} 
        </OrderContext.Provider>
    )
}