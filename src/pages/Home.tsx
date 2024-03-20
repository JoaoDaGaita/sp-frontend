import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="container relative">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Shaw and Partners full-stack challenge
        </h1>
        <span className="max-w-[750px] text-center text-3xl">
          Github Users
        </span>
        <div className="flex items-center justify-center space-x-4 py-4 md:pb-10">
          <Link to="/users" className="border border-slate-400 rounded text-sm hover:bg-slate-400 font-bold h-9 px-4 py-2">Users</Link>
        </div>
      </section>
    </div>
  )
}
