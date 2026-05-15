import { RouterProvider } from "react-router-dom"
import router from "./router"
import { Toaster } from "react-hot-toast"

const App = () => {

  return (
    <>
      <RouterProvider router={router}/>
      <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style:{
          background: '#111',
          color: '#fff',
          fontSize:'13px',
          letterSpacing: '0.3px'
        }
      }}/>
    </>
  )
}

export default App
