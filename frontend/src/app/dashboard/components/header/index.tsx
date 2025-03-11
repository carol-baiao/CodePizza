"use client"

import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logoImg from '/public/logo.svg'
import { LogOutIcon, MenuIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const router = useRouter();

    async function handleLogout() {
        deleteCookie("session", { path: "/" });

        router.replace("/"); // substitui a rota atual por essa nova rota
    }

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image
                        alt='Logo CodePizza'
                        src={logoImg}
                        width={190}
                        height={60}
                        priority={true}
                        quality={100}
                    />
                </Link>

                <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <XIcon size={32} color='#FFF'/> : <MenuIcon size={32} color='#FFF'/>}
                </button>

                <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
                    <Link href="/dashboard/category">Categoria</Link>
                    <Link href="/dashboard/menu">Cardápio</Link>

                    <form action={handleLogout}>
                        <button type='submit'>
                            <LogOutIcon size={24} color='#FFF'/>
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}