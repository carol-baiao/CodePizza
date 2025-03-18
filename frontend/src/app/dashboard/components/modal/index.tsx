"use client"

import { use } from 'react';
import styles from './styles.module.scss';
import { X } from 'lucide-react';
import { OrderContext } from '@/providers/order';

export function OrderModal() {
    const { onRequestClose, order } = use(OrderContext);

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
                                        <span>{item.product.name} - <b>{item.amount}</b></span>
                                        <span className={styles.description}>{item.product.description}</span>
                                    </section>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.containerButton}>
                        <button>
                            Concluir pedido
                        </button>
                    </div>
                </article>
            </section>
        </dialog>
    );
}