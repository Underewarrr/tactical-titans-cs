import Link from "next/link";
import SideMenu from './components/SideMenu.d'
import Head from 'next/head';
export default function Index() {
  return (
    <>
    <SideMenu />
    <Head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2374470339153795"
     crossorigin="anonymous"></script>
    <title>Tactical Titans - CSGO Statistics</title>
    <meta name="description" content="Check out the statistics for your CSGO match with Tactical Titans" key="desc" />
    <meta property="og:title" content="CSGO Statistics" />
    <meta property="og:description" content="Looking for CSGO statistics? You've come to the right place!" />

        <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        />
      </Head>
    </>
  );
}
