'use client';

import styles from '../styles.module.scss';
import { Button } from '@/app/dashboard/components/button';
import { toast } from 'react-hot-toast';

interface CategoryFormProps {
    handleRegisterCategory: (formData: FormData) => Promise<boolean>;
}

export default function CategoryForm({ handleRegisterCategory }: CategoryFormProps) {
    async function handleRegister(formData: FormData) {
        const success = await handleRegisterCategory(formData); 

        if(!success) {
            toast.error("Erro ao registrar categoria");
            return;
        }

        toast.success("Categoria registrada com sucesso");
    }

    return(
        <main className={styles.container}>
            <h1>Nova categoria</h1>

            <form className={styles.form} action={handleRegister}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="nome da categoria"
                    required
                    className={styles.input} 
                />

                <Button name='Cadastrar'/>
            </form>
        </main>
    )
}