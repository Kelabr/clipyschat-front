'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  async function handleSubmit(e){
    e.preventDefault()

    const user = {email, password}

    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(user)
    })

    if(!response.ok){
      alert("Erro ao fazer login")
      return
    }

    router.push("/chat")

  }

  return (
    <main className="h-screen flex md:justify-center md:items-center">
      <div className="max-w-[456px] pt-12 px-5 md:inset-shadow-2xs rounded-2xl md:p-4 md:shadow-lg fade-in">
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
            <label className="mb-2 font-medium">Email</label>
            <input placeholder="joh@email.com" type="email" className="border-2 rounded-sm pl-2" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-medium">password</label>
            <input placeholder="*******" type="password" className="border-2 rounded-sm pl-2" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="w-full bg-black text-white p-1 font-bold rounded-sm">Entrar</button>
        </form>
        <div className="flex justify-center mt-6">
          <p className="text-[#726b6b]">Registre-se para conversar <Link className="text-black underline" href="/register">aqui</Link></p>
        </div>
      </div>
    </main>
  );
}
