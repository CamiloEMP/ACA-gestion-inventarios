import { Outlet } from 'react-router-dom'

import { Navbar } from '@/components/Navbar'

export function MainLayout() {
  return (
    <div className="relative flex flex-col w-full h-full min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />

      <Navbar />
      <section className="flex flex-col flex-1 h-full py-4 sm:gap-4 sm:pl-14">
        <main className="h-full px-6">
          <Outlet />
        </main>
      </section>
    </div>
  )
}
