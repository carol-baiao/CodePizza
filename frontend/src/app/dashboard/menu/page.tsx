import { Form } from "./components/form";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

interface RegisterProps {
    image: File,
    category_id: string,
    formData: FormData,
}

export default async function Menu() {
    const token = await getCookieServer();

    const response = await api.get("/category", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    async function handleRegisterProduct({ image, category_id, formData }: RegisterProps): Promise<boolean> {
        "use server"

        const categoryIndex = formData.get("category");
        const name = formData.get("name")?.toString().trim();
        const price = formData.get("price")?.toString().trim();
        const description = formData.get("description")?.toString().trim();

        if(!name || !categoryIndex || !price || !description || !image) {
            return false;
        }

        const data = new FormData();
        data.append("name", name);
        data.append("price", price);
        data.append("description", description);
        data.append("category_id", category_id);
        data.append("file", image);

        const token = await getCookieServer();

        await api.post("/product", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err) => {
            console.error(err);
            return false;
        })

        return true;
    }

    return(
        <main>
            <Form categories={response.data} handleRegisterProduct={handleRegisterProduct}/>
        </main>
    )
}