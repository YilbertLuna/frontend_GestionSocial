import ListProcessApproved from "@/components/listProcessApproved"

export default function BuscarPersonas() {
  return (
    <div className="container mx-auto py-8 space-y-10">
      <h1 className="text-center text-4xl font-bold text-white">Generar lista de tramites aprobados</h1>
      
      <ListProcessApproved />
    </div>
  )
}