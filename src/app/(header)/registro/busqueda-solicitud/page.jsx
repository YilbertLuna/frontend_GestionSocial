import SearchTramites from "@/components/search/searchTramites"

export default function SearchTramite() {
   return (
      <div className="container mx-auto py-8 space-y-10">
         <h1 className="text-center text-4xl font-bold text-white">Buscar tramite</h1>
         <SearchTramites/>
      </div>
   )
}