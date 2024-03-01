import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <>
      <main className="bg-slate-300 max-w-full min-h-screen">
        <Outlet />
      </main>
    </>
  )
}
