export default function ApplicationInfo ({onPrev, sendData}) {
  return (
    <div>
      <h1>Informacion de la aplicacion</h1>
      <div className="flex gap-3">
        <button onClick={() => onPrev()}>atras</button>
        <button onClick={() => sendData()}>enviar datos</button>
      </div>
    </div>
  )
}