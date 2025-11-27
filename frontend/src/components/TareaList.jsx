import { useState, useEffect, useCallback } from 'react'
import TareaItem from './TareaItem.jsx'
import TareaForm from './tareaForm.jsx'

export default function TareaList(){
    const [tareas, setTareas]= useState([])
    const [loading, setLoading]=useState(true)
    const [error, setError]=useState(null)

    const API_URL=import.meta.env.VITE_API_URL

    const fetchTareas= useCallback(async()=>{
        try{
            const res=await fetch(`${API_URL}/tarea`)
            if(!res.ok)throw new Error(`Se produjo un error al cargar las tareas`)
            const data=await res.json()
            setTareas(data)
            setError(null)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }, [API_URL])
    useEffect(()=>{
        fetchTareas()
    }, [fetchTareas])

    if(loading)return<p className="text-center text-xl">Cargando... Por favor espere</p>
    if(error) return<p className="text-canter text-red-600">Error: {error}</p>

    return (
        <>
        <TareaForm guardarTarea={fetchTareas}/>
        <div className="mt-10">
            <h2 className="text-2x1 font-semibold mb-4">Sus tareas: ({tareas.length})</h2>
            {tareas.length===0 ?(
                <p className="text-red-600 text-center py-10">Todavia no se han creado tareas</p>
            ):(
                <div className="space-y-4">
                    {tareas.map(tarea=>(
                        <TareaItem key={tarea.id} tarea={tarea} tareaChange={fetchTareas}/>
                    ))}
                </div>
            )}
        </div>
        </>
    )
}