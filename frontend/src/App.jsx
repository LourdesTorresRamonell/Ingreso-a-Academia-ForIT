
import TareaList from './components/tareaList.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-4x1 front-bold">Challenge ForIT 2025</h1>
        <p className="mt-2">Lista de tareas full-stack</p>
      </header>
      <main className="max-w-4x1 mx-auto mt-8 px-4">
        <TareaList/>
      </main>
    </div>
  )
}

export default App