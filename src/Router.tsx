import { Route, Routes } from 'react-router-dom'
import { Users } from "./pages/Users"
import { DefaultLayout } from "./layout/DefaultLauout"
import { Home } from "./pages/Home"
import { Detail } from "./pages/Detail"

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/users/:since?" element={<Users />} />
        <Route index path="/" element={<Home />} />
        <Route path="/details/:login/:id" element={<Detail />} />
      </Route>
    </Routes>
  )
}
