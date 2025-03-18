"use client"

import { use } from 'react';
import styles from './styles.module.scss';
import { X } from 'lucide-react';
import { OrderContext } from '@/providers/order';
import { calculateTotalPrice } from '@/lib/helper';

export function OrderModal() {
    const { onRequestClose, order, finishOrder } = use(OrderContext);

    async function handleFinishOrder() {
        await finishOrder(order.id);
    }

    return (
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} color='#FF3F4b' />
                </button>

                <article className={styles.container}>
                    <div className={styles.header}>
                        <h2>Detalhes do pedido</h2>

                        <span className={styles.table}>
                            Mesa <b>{order.table}</b> {order.name && (` - ${order.name}`)}
                        </span>
                    </div>

                    <div className={styles.listItems}>
                        <ul>
                            {order.items.map(item => (
                                <li key={item.id}>
                                    <section className={styles.item}>
                                        <span>
                                            Qtd.: <b>{item.amount}</b> - {item.product.name} - R$ {parseFloat(item.product.price) * item.amount}
                                        </span>
                                        <span className={styles.description}>{item.product.description}</span>
                                    </section>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <h3 className={styles.total}>Total: R$ {calculateTotalPrice(order.items)}</h3>

                    <div className={styles.containerButton}>
                        <button onClick={handleFinishOrder}>
                            Concluir pedido
                        </button>
                    </div>
                </article>
            </section>
        </dialog>
    );
}