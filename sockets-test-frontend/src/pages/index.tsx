import React, { useEffect, useState } from "react";
import Head from "next/head";
import useSocket from "hooks/use-socket";

const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<string>>([]);
  const socket = useSocket("http://localhost:4000");

  useEffect((): void => {
    socket?.on("receive-message", (message: string) => {
      setMessages((messages) => [...messages, message]);
    });
  }, [socket]);

  return (
    <>
      <Head>
        <title>Monopoly wit options</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <input value={name} onChange={({ target }) => setName(target.value)} />
        <input value={room} onChange={({ target }) => setRoom(target.value)} />
        <button onClick={() => socket?.emit("join-room", { name, room })}>
          Join Room
        </button>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
        <input
          type="text"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <button
          onClick={() => {
            socket?.emit("send-message", message);
            setMessage("");
          }}
        >
          Send
        </button>
      </main>
    </>
  );
};

export default Home;
