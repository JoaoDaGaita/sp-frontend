import { Toaster } from "@/components/ui/toaster"
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <>
      <main className="bg-slate-300 max-w-full min-h-screen">
        <Outlet />
        <Toaster />
      </main>
    </>
  )
}
