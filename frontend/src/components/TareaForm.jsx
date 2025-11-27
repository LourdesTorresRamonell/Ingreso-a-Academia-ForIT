import { useState, useEffect, useEffectEvent } from 'react'

export default function TareaForm({ editarTarea=null, guardarTarea}){
    const [titulo, setTitulo]= useState('')
    const [descripcion, setDescripcion]= useState('')

    const syncForm=useEffectEvent((tarea)=>{
        if (tarea){
            setTitulo(tarea.titulo || '')
            setDescripcion(tarea.descripcion|| '')
        }else{
            setTitulo('')
            setDescripcion('')
        }
    })

    useEffect(()=>{
        syncForm(editarTarea)
    }, [editarTarea])

    const API_URL= import.meta.env.VITE_API_URL

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!titulo.trim()){
            alert('El titulo es obligatorio')
            return
        }
        const body={ titulo:titulo.trim(), descripcion:descripcion.trim()}
        try{
            if(editarTarea){
                await fetch(`${API_URL}/tarea/${editarTarea.id}`,{
                    method:'PUT',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                } )
            }else{
                await fetch (`${API_URL}/tarea/`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json'}, 
                    body: JSON.stringify(body)
                })
            }

            setTitulo('')
            setDescripcion('')
            guardarTarea()
        }catch(err){
            alert(`Se produjo un error al guardar la tarea: ${err.message}`)
        }
    }
    return(
        <div className='bg-white rounded-x1 shadow-lg p-8 mb-10'>
            <h2 className='text-2x1 font-bold text-gray-800 mb-6'>
                {editarTarea ? `Editar tarea` : `Crear tarea`}
            </h2>
            <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb10'>Titulo *</label>
                    <input 
                    type='text'
                    value={titulo}
                    onChange={(e)=>setTitulo(e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Escribe un titulo...'
                    required/>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Descripcion </label>
                    <textarea
                    value={descripcion}
                    onChange={(e)=>setDescripcion(e.target.value)}
                    rows="3"
                    className='w-full px-4 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                    placeholder='Escribe una descripcion...'/>
                </div>
                <div className='flex gap-3'>
                    <button
                    type='submit'
                    className='bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-md'>
                        {editarTarea ? 'Actualizar tarea' : 'Crear tarea'}
                    </button>
                    {editarTarea&&(
                        <button
                        type='button'
                        onClick={()=>guardarTarea()}
                        className='bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600'
                        > Cancelar </button>
                    )}
                </div>
            </form>
        </div>
    )
}