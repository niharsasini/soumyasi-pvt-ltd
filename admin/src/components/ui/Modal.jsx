'use client'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Modal({
  isOpen, onClose, title, children, size = 'md'
}) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center
      justify-center p-4">
      <div className="absolute inset-0 bg-black/60
        backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-admin-card border
        border-admin-border rounded-2xl w-full ${sizes[size]}
        max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between
          p-6 border-b border-admin-border">
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center
              rounded-lg text-slate-400 hover:text-white
              hover:bg-admin-hover transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
