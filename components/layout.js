import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Topbar from './topbar';
import Document from 'next/document';
import {useRef} from 'react';

const name = 'Anunannki';
export const siteTitle = 'Job Search Web3 DApp';

export default function Layout({ children, home }) {
  return (
    <div className={styles.job}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Job Search Web3 DApp"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{siteTitle}</title>
      </Head>
      <header className={styles.header}>
        <Topbar /> 
      </header>
      <main id="wrapper" className={styles.wrapper}>{children}</main>
    </div>
  );
}