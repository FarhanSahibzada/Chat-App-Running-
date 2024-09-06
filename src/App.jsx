import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { useState } from 'react'
import Login from './component/Login'
import Loading from './component/loading'
import NotFound from './component/Notfound'
import Home from './component/Home'
import Sign from './component/Sign'
import Chat from './component/Chat'

function App() {

  let rout = createBrowserRouter([
    { path:"*", element:<NotFound/>},
    { path:"/", element:<Loading/>   },
    { path:"/home", element:<Home/>},
    { path:"/Chat", element:<Chat/>},
     { path:"/Login", element:<Login/>   },
     { path:"/Sign", element:<Sign/>   },
])
  return (
   <RouterProvider router={rout}/>
  )
}

export default App
