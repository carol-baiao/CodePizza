import styles from './styles.module.scss';
import { X } from 'lucide-react';

export function OrderModal() {
    return (
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack}>
                    <X size={40} color='#FF3F4b' />
                </button>

                <article className={styles.container}>
                    <div className={styles.header}>
                        <h2>Detalhes do pedido</h2>

                        <span className={styles.table}>
                            Mesa
                        </span>
                    </div>

                    <div className={styles.listItems}>
                        <section className={styles.item}>
                            <span>item tal</span>
                            <span className={styles.description}>descrição tal</span>
                        </section>

                        <section className={styles.item}>
                            <span>item tal</span>
                            <span className={styles.description}>descrição tal</span>
                        </section>

                        <section className={styles.item}>
                            <span>item tal</span>
                            <span className={styles.description}>descrição tal</span>
                        </section>
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