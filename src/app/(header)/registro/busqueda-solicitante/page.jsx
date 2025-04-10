import SearchPersons from "@/components/search/searchPersons"

export default function BuscarPersonas() {
  return (
    <div className="container mx-auto py-8 space-y-10">
      <h1 className="text-center text-4xl font-bold text-white">Busqueda de solicitante</h1>
      <SearchPersons />
    </div>
  )
}