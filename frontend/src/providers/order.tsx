"use client"

import { createContext, ReactNode, useState } from "react";
import { OrderDetail } from "./OrderDetail.types";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderDetail;
    finishOrder: (order_id: string) => Promise<void>;
}

type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState<OrderDetail>({} as OrderDetail);
    const router = useRouter();

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

    async function finishOrder(order_id: string) {
        const token = getCookieClient();

        const data = {
            order_id: order_id
        }

        try {
            await api.put("/order/send", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (err) {
            toast.error("Falha ao finalizar o pedido.");
            return;
        }

        toast.success("Pedido finalizado com sucesso!");
        setIsOpen(false);
        router.refresh();
    }

    return(
        <OrderContext.Provider value={{isOpen, onRequestOpen, onRequestClose, finishOrder, order}}>
           {children} 
        </OrderContext.Provider>
    )
}