import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { useState } from 'react'
import Sign from './component/sign'
import Login from './component/Login'
import Loading from './component/loading'
import NotFound from './component/Notfound'
import Home from './component/Home'


function App() {

  let rout = createBrowserRouter([
    { path:"*", element:<NotFound/>},
    { path:"/", element:<Loading/>   },
    { path:"/home", element:<Home/>},
     { path:"/Login", element:<Login/>   },
     { path:"/Sign", element:<Sign/>   },
])
  return (
    
  <RouterProvider router={rout}/>
  )
}

export default App
