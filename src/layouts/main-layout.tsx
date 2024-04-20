import { Outlet } from 'react-router-dom'

import { Navbar } from '@/components/Navbar'

export function MainLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Navbar />
      <section className="flex flex-col sm:gap-4 py-4 sm:pl-14">
        <main className="px-6">
          <Outlet />
        </main>
      </section>
    </div>
  )
}
