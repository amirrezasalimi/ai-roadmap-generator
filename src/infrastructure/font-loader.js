import { Inter } from '@next/font/google';

const inter = Inter({
    subsets: ['latin'],
})

const FontLoader = () => {
    return (
        <style jsx global>{`
        :root {
          --inter-font: ${inter.style.fontFamily};
        }
      `}</style>
    )
}

export default FontLoader;