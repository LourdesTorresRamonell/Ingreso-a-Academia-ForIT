export default function TareaItem({ tarea, tareaChange}){
    const API_URL=import.meta.env.VITE_API_URL
    const toggleComplete=async()=>{
        await fetch(`${API_URL}/tarea/${tarea.id}`, {
            method:'PUT',
            headers:{'Content-Type': 'application/json' },
            body: JSON.stringify({completa: !tarea.completa})
        })
        tareaChange()
    }
    const borrarTarea=async()=>{
        if(!confirm('¿Estas seguro de eliminar esta tarea?'))return
        await fetch(`${API_URL}/tarea/${tarea.id}`, {method: 'DELETE'})
        tareaChange()
    }

    return(
        <div className={`p-5 rounded-lg shadow bg-white ${tarea.completa ? `opacity-75` : ""}`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className={`text-xl font-semibold ${tarea.completa ? `line-through` : ``}`}>
                        {tarea.titulo}
                    </h3>
                    {tarea.descripcion && <p className="text-gray-600 my-1">{tarea.descripcion}</p>}
                    <small className="text-gray-500">Creada: {new Date(tarea.creada).toLocaleDateString()}</small>
                </div>

                <div className="flex gap-3 ml-4">
                    <button
                    onClick={toggleComplete}
                    className={`px-4 py-2 rounded ${tarea.completa ? "bg-gray-400" : "bg-green-600"} text-white hover:opacity-90`}
                    >{tarea.completa ? `Completada` : `Pendiente`}
                    </button>

                    <button
                    onClick={borrarTarea}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >Eliminar </button>
                </div>
            </div>
        </div>
    )
}