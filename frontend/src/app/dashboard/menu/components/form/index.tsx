"use client"

import { ChangeEvent, useState } from 'react';
import styles from './styles.module.scss';
import { UploadCloud } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { Button } from '@/app/dashboard/components/button';

interface CategoryProps {
    id: string;
    name: string;
}

interface handleRegisterProps {
    image: File,
    category_id: string;
    formData: FormData;
}

interface Props {
    categories: CategoryProps[];
    handleRegisterProduct: ({ image, category_id, formData }: handleRegisterProps) => Promise<boolean>;
}

export function Form({ categories, handleRegisterProduct }: Props) {
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");

    async function handleRegister(formData: FormData) {
        if(!image) {
            toast.error("Imagem do produto é obrigatória!");
            return;
        }

        const categoryIndex = formData.get("category");

        const category_id = categories[Number(categoryIndex)].id;

        const success = await handleRegisterProduct({ image, category_id, formData });

        if(success) toast.success("Produto cadastrado com sucesso!");
        else toast.error("Falha ao cadastrar o produto.");

        setPreviewImage("");
    }

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if(event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            
            if(image.type !== "image/jpeg" && image.type !== "image/png") {
                toast.error("Formato inválido.");
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image));
        }
    }

    return(
        <main className={styles.container}>
            <h1>Novo produto</h1>

            <form className={styles.form} action={handleRegister}>
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color='#FFF'/>
                    </span>

                    <input 
                        type="file" 
                        name='file'
                        accept='image/png, image/jpeg'
                        onChange={handleFile}
                    />

                    {previewImage && (
                        <Image
                            alt='Imagem de preview'
                            src={previewImage}
                            className={styles.preview}
                            fill={true}
                            quality={100}
                            priority={true}
                        />
                    )}
                </label>

                <select name="category">
                    {categories.map( (category, index) => (
                        <option key={category.id} value={index}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input 
                    type="text" 
                    name="name" 
                    placeholder='Digite o nome do produto'
                    required
                    className={styles.input}
                />

                <input 
                    type="text" 
                    name="price" 
                    placeholder='Digite o preço do produto'
                    required
                    className={styles.input}
                />

                <textarea 
                    name="description" 
                    placeholder='Digite a descrição do produto'
                    required
                    className={styles.input}
                ></textarea>

                <Button name='Cadastrar produto'/>
            </form>
        </main>
    )
}