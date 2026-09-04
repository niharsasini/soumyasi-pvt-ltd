'use client'
import { Bell, Search } from 'lucide-react'
import { getUser } from '@/lib/auth'

export default function Header({ title, subtitle }) {
  const user = getUser()

  return (
    <div className="flex items-center justify-between
      mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-400 text-sm mt-1">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2
            -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-admin-card border border-admin-border
              rounded-xl pl-9 pr-4 py-2 text-sm text-white
              placeholder:text-slate-600 focus:outline-none
              focus:border-amber-500/50 w-48"
          />
        </div>
        <button className="relative w-9 h-9 bg-admin-card
          border border-admin-border rounded-xl flex items-center
          justify-center text-slate-400 hover:text-white">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2
            bg-amber-500 rounded-full" />
        </button>
      </div>
    </div>
  )
}
