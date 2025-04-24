export default function ModalSucess ({closeModal, title, message}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">{title}</h2>
              <p className="mb-4">{message}</p>
              <button 
                onClick={closeModal} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Cerrar
              </button>
            </div>
        </div>
    )
}