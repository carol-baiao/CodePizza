import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';
import CategoryForm from './components/form';

export default function Category() {
    async function handleRegisterCategory(formData: FormData): Promise<boolean> {
        "use server"
        const name = formData.get('name')?.toString().trim();

        if(name === "") return false;

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
            return false;
        })

        return true;
    }

    return(
        <CategoryForm handleRegisterCategory={handleRegisterCategory}/>
    )
}