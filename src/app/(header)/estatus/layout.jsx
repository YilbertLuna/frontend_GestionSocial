export default function Layout({ children }) {
    return (
      <div className="relative antialiased min-h-dvh bg-cover bg-no-repeat bg-center bg-[url(../../public/framebackground.jpg)]">
        {children}
    </div>
    )
  }