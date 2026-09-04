'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout, getUser } from '@/lib/auth'
import {
  LayoutDashboard, Mail, Zap, MapPin, FolderOpen,
  FileText, Briefcase, Users, Settings, LogOut,
  ChevronRight
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/contacts', icon: Mail, label: 'Contact Enquiries', badge: 'contacts' },
  { href: '/dashboard/ev-partners', icon: Zap, label: 'EV Partners', badge: 'ev' },
  { href: '/dashboard/ev-stations', icon: MapPin, label: 'EV Stations' },
  { href: '/dashboard/projects', icon: FolderOpen, label: 'Projects' },
  { href: '/dashboard/blog', icon: FileText, label: 'Blog Posts' },
  { href: '/dashboard/careers', icon: Briefcase, label: 'Careers' },
  { href: '/dashboard/newsletter', icon: Users, label: 'Newsletter' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar({ stats = {} }) {
  const pathname = usePathname()
  const user = getUser()

  return (
    <div className="w-64 bg-admin-sidebar border-r
      border-admin-border flex flex-col h-screen
      sticky top-0">

      {/* Logo */}
      <div className="p-6 border-b border-admin-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/10
            border border-amber-500/20 rounded-xl
            flex items-center justify-center">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">
              Soumyashi Power
            </p>
            <p className="text-slate-500 text-[10px]">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ href, icon: Icon, label, badge }) => {
          const active = pathname === href ||
            (href !== '/dashboard' && pathname.startsWith(href))
          const badgeCount = badge === 'contacts'
            ? stats.contacts?.new
            : badge === 'ev'
            ? stats.ev_partners?.new
            : 0

          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5
                rounded-xl text-sm transition-all group
                ${active
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-admin-hover'
                }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0
                ${active ? 'text-amber-400' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="flex-1">{label}</span>
              {badgeCount > 0 && (
                <span className="bg-amber-500 text-black text-[10px]
                  font-bold px-1.5 py-0.5 rounded-full min-w-[18px]
                  text-center">
                  {badgeCount}
                </span>
              )}
              {active && (
                <ChevronRight className="w-3 h-3 text-amber-400" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-admin-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-amber-500/20 rounded-lg
            flex items-center justify-center">
            <span className="text-amber-400 text-xs font-bold">
              {user?.username?.[0]?.toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">
              {user?.username || 'Admin'}
            </p>
            <p className="text-slate-500 text-[10px]">
              {user?.is_superadmin ? 'Super Admin' : 'Admin'}
            </p>
          </div>
        </div>
        <button onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2
            rounded-xl text-slate-400 hover:text-red-400
            hover:bg-red-500/10 transition-all text-sm">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
