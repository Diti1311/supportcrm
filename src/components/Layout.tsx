import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from './ui/Button';
import { LayoutDashboard, PlusCircle, Ticket as TicketIcon } from 'lucide-react';
import { Toaster } from './ui/Sonner';
export function Layout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-lg text-slate-900">
          
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <TicketIcon className="h-5 w-5" />
          </div>
          Support CRM
        </Link>
        <nav className="ml-6 flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`transition-colors hover:text-foreground/80 ${location.pathname === '/' ? 'text-foreground' : 'text-foreground/60'}`}>
            
            Dashboard
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button
  asChild
  className="min-w-[160px] h-10 flex items-center justify-center gap-2"
>
  <Link
    to="/tickets/new"
    className="flex items-center justify-center gap-2"
  >
    <PlusCircle className="h-4 w-4 shrink-0" />
    <span>Create Ticket</span>
  </Link>
</Button>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>);

}