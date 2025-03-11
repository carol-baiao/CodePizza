import styles from './page.module.scss'
import logoImg from '/public/logo.svg';
import Image  from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function Home() {

  async function handleLogin(formData: FormData) {
    "use server"

    const email = formData.get('email');
    const password = formData.get('password');

    if(email === "" || password === "") {
      return;
    }

    try {
      const response = await api.post("/session", {
        email,
        password
      })

      if(!response.data.token) {
        return;
      }

      const expressTime = 60 * 60 * 24 * 30 * 1000; // passando 30 dias pra expirar cookie
      const cookieStore = await cookies();

      cookieStore.set("session", response.data.token, {
        maxAge: expressTime, 
        path: "/", // em quais caminhos quero acessar o cookie
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production', // para permitir utilização no localhost
      });
    } catch (err) {
      console.log(err);
      return;
    }

    redirect('/dashboard');
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo CodePizza" className={styles.logo}/>
      

        <section className={styles.login}>
          <form action={handleLogin}>
            <input 
              type="email"
              required
              name='email'
              placeholder="digite seu email"
              className={styles.input}
            />

            <input 
              type="password"
              required
              name='password'
              placeholder="digite sua senha"
              className={styles.input}
            />

            <button type='submit'>Acessar</button>
          </form>

          <Link href='/signup' className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  );
}
