import styles from './styles.module.scss'
import { Button } from '@/app/dashboard/components/button'
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';

export default function Category() {
    async function handleRegisterCategory(formData: FormData) {
        "use server"
        const name = formData.get('name') as string;

        if(name.trim() === "") return; 

        const data = {
            name: name,
        }

        const token = await getCookieServer();

        await api.post('/category', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <main className={styles.container}>
            <h1>Nova categoria</h1>

            <form className={styles.form} action={handleRegisterCategory}>
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