'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"

export default function FormLoginUser() {
    const {register, handleSubmit, formState: { errors }} = useForm()   
    const [error, setError] = useState()
    const router = useRouter()

    const onSubmit = handleSubmit( async(data) => {
        const res = await fetch(`http://localhost:3030/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
        })
        const response = await res.json()
        console.log(response)

        if(res.ok) {
        router.push('/')
        } else {
        setError(response.message || 'Error en la autenticación')
        }

        router.refresh()
    })

    return (
        <form action="" className="flex flex-col p-10 space-y-8 bg-white/50 rounded-md"
            onSubmit={onSubmit}>
        {error && <p className="text-red-500">Error en la autenticación: {error}</p>}
        <div className="flex flex-col space-y-4">
          <input className={`focus:outline-none p-2 rounded-lg ${errors.username && 'border-red-500'}`} 
                 type="text" placeholder="enter username"
                 {...register("username", {
                   required: {
                     value: true,
                     message: "Please enter your username"
                   }
                 })}
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          
          <input className={`focus:outline-none p-2 rounded-lg ${errors.password && 'border-red-500'}`} 
                 type="password" placeholder="enter password" 
                 {...register("password", {
                   required: {
                     value: true,
                     message: "Please enter your password"
                   }
                 })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" className="underline underline-offset-1">Iniciar Sesión</button>
      </form>
    )
}