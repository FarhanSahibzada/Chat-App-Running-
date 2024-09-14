import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { useState } from 'react'
import Login from './component/Login'
import Loading from './component/loading'
import NotFound from './component/Notfound'
import Home from './component/Home'
import Sign from './component/Sign'
import Chat from './component/Chat'
import Myshop from './component/Myshop'
import Profile from './component/Profile'
import Mycart from './component/Mycart'
import Cartshow from './component/Cartshow'
import Location from './component/Location'
function App() {
  let rout = createBrowserRouter([
    { path:"*", element:<NotFound/>},
    { path:"/", element:<Loading/>   },
    { path:"/home", element:<Home/>},
    { path:"/Myshop", element:<Myshop/>},
    { path:"/Profile", element:<Profile/>},
    { path:"/Location", element:<Location/>},
    { path:"/Cartshow", element:<Cartshow/>},
    { path:"/Mycart", element:<Mycart/>},
    { path:"/Chat", element:<Chat/>},
     { path:"/Login", element:<Login/>   },
     { path:"/Sign", element:<Sign/>   },
])
  return (
   <RouterProvider router={rout}/>
  )
}

export default App
