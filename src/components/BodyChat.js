'use client'

import { useEffect, useState } from "react"
import Message from "./Message"
import OtherMessage from "./OtherMessage"

export default function BodyChat({ws, name}){

    console.log(name)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const socket = ws.current

        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data)
            setMessages(prev => [...prev, msg])
        }
        return () => {
            socket.onmessage = null
        }

    }, [])

    return(
        <main className="flex flex-col flex-1 px-2 pt-2 justify-end pb-14">
            {messages.map((msg, index) => (
                msg.name === `${name}` ? (
                    <Message key={index} name={msg.name} text={msg.text}/>
                ) : (
                    <OtherMessage key={index} name={msg.name} text={msg.text}/>
                )
            ))}
        </main>
    )
}
