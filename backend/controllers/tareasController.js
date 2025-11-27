let tareas =[
    {id:"1", titulo: `Practicar programacion`, descripcion: `Practicar programacion por 4hs`, completa: false, creada: Date() }
]

const generarID=()=>Date.now().toString();

const listarTereas=(req, res)=>{
    res.json(tareas);
}

const crearTarea=(req, res)=>{
    const{titulo, descripcion}=req.body
    if (!titulo||titulo.trim()===``){
        return res.json({menssage:`Es obligatorio ponerle el titulo a la tarea`});
    }
    let nuevaTarea={
        id:generarID(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        completa: false,
        creada: Date()
    }
    tareas.push(nuevaTarea);
    res.json(nuevaTarea);
}

const actualizarTarea=(req, res)=>{
    const {id}=req.params;
    const {titulo, descripcion, completa}=req.body;
    const tareaid=tareas.findIndex(t=>t.id===id);
    if (tareaid===-1){
        return res.json({menssage: `No se encuentra la tarea con id: ${id}`});
    }

    if(titulo!==undefined){
        tareas[tareaid].titulo=titulo.trim();
    }
    if(descripcion!==undefined){
        tareas[tareaid].descripcion=descripcion.trim();
    }
    if(completa!==undefined){
        tareas[tareaid].completa=completa;
    }
    res.json(tareas[tareaid]);
}

const borrarTarea=(req, res)=>{
    const {id}=req.params;
    const tareaId=tareas.findIndex(t=>t.id===id);

    if(tareaId===-1){
        return res.json({mnsg: `No se encuentra la tarea con el id:${id}`});
    }
    tareas=tareas.filter(t=>t.id!==id);
    res.json({ message: `Tarea ${id} eliminada` });
}

export {listarTereas, crearTarea, actualizarTarea, borrarTarea};