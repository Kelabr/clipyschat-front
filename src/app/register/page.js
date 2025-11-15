'use client'

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

export default function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e){
    e.preventDefault()

    const newUser = {name, email, date, password}

    await fetch("http://localhost:3001/login", {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      credentials: "include",
      body: JSON.stringify(newUser)
    })

  }


  return (
    <main className="h-screen flex md:justify-center md:items-center">
      <div className="max-w-[456px] pt-6 px-5 md:inset-shadow-2xs rounded-2xl md:p-4 md:shadow-lg fade-in">
        <div className="flex flex-col items-center px-7 ">
            <Image
              className="mb-2"
              src="/clipyschat.svg"
              alt="Logo com escrita Clipychat"
              width={150}
              height={100}
            />
            <p className="font-medium text-[#726b6b] text-center leading-5">Logue e converse com quem você quer</p>
        </div>
        <form className="mt-7" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-medium">Nome</label>
            <input type="text" placeholder="Joh doh" className="border-2 rounded-sm pl-2" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>            
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-medium">Email</label>
            <input placeholder="joh@email.com" type="email" className="border-2 rounded-sm pl-2" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-medium">Nascimento</label>
            <input type="date" className="border-2 rounded-sm pl-2" value={date} onChange={(e) => setDate(e.target.value)}/>
          </div>          
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-medium">password</label>
            <input placeholder="********" type="password" className="border-2 rounded-sm pl-2" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="w-full bg-black text-white p-1 font-bold rounded-sm">Entrar</button>
        </form>
        <div className="flex justify-center mt-6">
          <p className="text-[#726b6b]">Faça seu login <Link className="text-black underline" href="/login">aqui</Link></p>
        </div>
      </div>
    </main>
  );
}
