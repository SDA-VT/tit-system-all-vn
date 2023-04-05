import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import DrawerHome from "./homes";
import Login from "./login";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>TIT All System</title>
        <meta name="description" content="TIT All System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
      </Head>
      <main>
        <div>
          <Login />
        </div>
      </main>
    </>
  );
}
