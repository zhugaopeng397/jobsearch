import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import Searchbar from '../components/searchbar';
import Maincontainer from '../components/maincontainer';

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Searchbar />
      <Maincontainer />
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}

// export const getServerSideProps = async () => {
//   const res = await fetch('http://localhost:3000/jobs')
//   const repo = await res.json()
//   console.log("getServerSideProps====",repo);
//   return { props: { repo } }
// }
