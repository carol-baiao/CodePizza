"use client"

import { ChangeEvent, useState } from 'react';
import styles from './styles.module.scss';
import { UploadCloud } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export function Form() {
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");

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

            <form className={styles.form} action="">
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color='#FFF'/>
                    </span>

                    <input 
                        type="file" 
                        name="" 
                        accept='image/png, image/jpeg'
                        required 
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
            </form>
        </main>
    )
}