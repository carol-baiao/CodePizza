"use client"

import styles from './styles.module.scss';
import { RefreshCw } from 'lucide-react';
import { OrderProps } from '@/lib/order.type';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Props {
    orders: OrderProps[];
}

export function Orders({ orders }: Props) {
    const router = useRouter();

    function handleRefresh() {
        router.refresh();
        toast.success('Pedidos atualizados com sucesso!');
    }

    return(
        <main className={styles.container}>
            <section className={styles.containerHeader}>
                <h1>Últimos pedidos</h1>

                <button onClick={handleRefresh}>
                    <RefreshCw size={24} color='#3fffa3'/>
                </button>
            </section>

            <section className={styles.listOrders}>
                {orders.length === 0 && (
                    <span className={styles.emptyItem}>Nenhum pedido aberto no momento...</span>
                )}

                {orders.map( order => (
                    <button key={order.id} className={styles.orderItem}>
                        <div className={styles.tag}></div>
                        <span>Mesa {order.table}</span>
                    </button>
                ))}
            </section>
        </main>
    )
}