'use client'
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <form action="" className="flex flex-col p-10 space-y-8 bg-white/50 rounded-md"
        onSubmit={handleClick}>
        <input className="focus:outline-none p-2 rounded-lg" type="text" placeholder="enter username" />
        <input className="focus:outline-none p-2 rounded-lg" type="password" placeholder="enter password" />
        <button type="submit" className="underline underline-offset-1">Iniciar Sesión</button>
      </form>
    </div>
  );
}
