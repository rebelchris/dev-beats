import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import { searchPlaylists } from '../lib/spotify';
import { useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
  console.log(session?.token);
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const people = [{ name: 'chris' }, { name: 'nick' }];
  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlists');
    const { items } = await res.json();
    console.log(items);
    setList(items);
    setShow(true);
  };

  if (session) {
    return (
      <>
        Signed in as {session?.session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={() => getMyPlaylists()}>Get searchPlaylists</button>
        {list.map((item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <img src={item.images[0]?.url} />
          </div>
        ))}
        {show ? 'Show' : 'hide'}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
