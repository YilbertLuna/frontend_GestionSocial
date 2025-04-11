export default function Search ({submitInputValue, search, empiti, errorMessage, placeholder}) {
    return (
        <form onSubmit={ e => {
            e.preventDefault()
            submitInputValue()
         }} className="flex flex-row items-center justify-center w-full">
            <div className="flex bg-white border rounded-lg gap-3 p-3">
               <div className="felx justify-center items-center w-full">
                  <input
                     ref={search}
                     className="w-[340px] border rounded-lg p-3 focus:outline-none"
                     type="text" 
                     placeholder={placeholder}/>
               </div>
               {empiti && <p className="text-red-500 text-xs">Ingresa un dato</p>}
               {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>} 
               <div className="flex justify-center items-center">
                  <button
                     type="submit" 
                     className="border border-gray-300 rounded-lg p-3">
                     Buscar
                  </button>
               </div>
            </div>
         </form>
    )
}