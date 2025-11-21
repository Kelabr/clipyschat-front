'use client'

import { useEffect, useState } from "react"


export default function Chat(){

    const [text, setText] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        async function handleAuth(){
            const response = await fetch("http://localhost:3001/session", {
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                credentials: "include"
            })


            const data = await response.json()

            localStorage.setItem("accessToken",data.accessToken )

            if(!response.ok){
                setText("Token exprirado")
            }



        }

        handleAuth()
    },[])

    return(
        <main>
            <p>{text}</p>
        </main>
    )

}