export default function Button({
  children, variant = 'primary', size = 'md',
  icon: Icon, loading = false, className = '', ...props
}) {
  const variants = {
    primary: 'bg-amber-500 hover:bg-amber-400 text-black font-bold',
    secondary: 'border border-admin-border text-slate-400 hover:text-white hover:bg-admin-hover',
    danger: 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20',
    success: 'bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20',
    ghost: 'text-slate-400 hover:text-white hover:bg-admin-hover',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-sm',
  }

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`flex items-center justify-center gap-2 rounded-xl
        transition-all disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current/30
          border-t-current rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  )
}
