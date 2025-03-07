import styles from './page.module.scss'
import logoImg from '/public/logo.svg';
import Image  from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api'
import { redirect } from 'next/navigation';

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

      console.log(response.data);
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
