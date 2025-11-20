'use client'

import { useState, useEffect, useRef } from "react"
import BodyChat from "@/components/BodyChat"

export default function Chat(){
    const [input, setInput] = useState("")
    const wsRef = useRef(null)
    const [isConnected, setIsConnected] = useState(false)
    const [user, setUser] = useState("")

    useEffect(() => {
        async function loadUser() {
        try{
            const res = await fetch("http://localhost:3001/me", {
                credentials: "include"
            })

            if(!res.ok) return

            const data = await res.json()
            setUser(data.name)
        }catch(error){
            console.log("Error --", error)
        }

        }

        loadUser()
    }, [])

    useEffect(()=>{

        const ws = new WebSocket("ws://localhost:8000")
        wsRef.current = ws

        ws.onopen = () => {
            console.log("WS conectado")
            setIsConnected(true)   // <— Só renderiza BodyChat depois disso!
        }

        ws.onerror = (err) => console.log("ERRO WS:", err)

    }, [])

    function sendMessage(e) {
        e.preventDefault()

        const messageData = {
            name: user,
            text: input
        }

        wsRef.current?.send(JSON.stringify(messageData))

        setInput("")
    }

    return(
        <main className="h-screen flex">

            {/* Só renderiza BodyChat quando ws estiver pronto  */}
            {isConnected && user && <BodyChat ws={wsRef} name={user} />}

            <section className=" w-full  max-w-96 fixed bottom-0 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.15)]">
                <form onSubmit={sendMessage} className="flex p-1 gap-2">
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" required autoFocus className=" flex-1 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 "/>
                    <button type="submit">Enviar</button>
                </form>
            </section>
        </main>
    )
}
