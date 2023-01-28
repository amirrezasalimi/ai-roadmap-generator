import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Flow() {
  return (
    <main className={styles.main}>
      flow
    </main>
  )
}
