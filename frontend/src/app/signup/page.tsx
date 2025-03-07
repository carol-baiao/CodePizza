import styles from '../page.module.scss'
import logoImg from '/public/logo.svg';
import Image  from 'next/image';
import Link from 'next/link';

export default function Signup() {
    return(
        <>
            <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo CodePizza" className={styles.logo}/>
      

        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <form>
            <input 
              type="text"
              required
              name='name'
              placeholder="digite seu nome"
              className={styles.input}
            />
            
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

            <button type='submit'>Cadastrar</button>
          </form>

          <Link href='/' className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>
        </section>
      </div>
        </>
    )
}