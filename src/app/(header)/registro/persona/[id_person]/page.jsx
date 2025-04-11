export default function Registro({ params}) {
   const { id_person } = params

   console.log(id_person)
   
   return (
      <div className="container mx-auto py-8 space-y-10">
         <h1 className="text-center text-4xl font-bold text-white">ver datos de la persona</h1>

         <p>id de la persona: {id_person}</p>
      </div>
   );
}