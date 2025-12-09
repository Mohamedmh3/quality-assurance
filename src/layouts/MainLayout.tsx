import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Home, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import logoUrl from '/logo.svg';

export function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col">
      {/* Header */}
      <header 
        className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--color-bg-secondary)]/80 border-b border-[var(--color-border)]/50 shadow-lg shadow-[var(--color-primary)]/5"
        style={{ paddingLeft: '80px', paddingRight: '80px' }}
      >
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-purple-500 to-pink-500 opacity-60" />
        
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group relative"
          >
            {/* Animated background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)]/30 via-purple-500/30 to-pink-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
            
            {/* Logo Container */}
            <div className="relative">
              {/* Logo SVG */}
              <img 
                src={logoUrl} 
                alt="BeeOrder Logo" 
                className="h-10 w-auto relative z-10 transition-all duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Text */}
            <div className="flex flex-col relative z-10">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  BeeOrder
                </span>
                <Sparkles className="w-4 h-4 text-[var(--color-primary)] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              </div>
              <span className="text-xs font-medium text-[var(--color-text-muted)] tracking-wide">
                Documentation
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" active={location.pathname === '/'}>
              <Home className="w-4 h-4" />
              <span>Features</span>
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-purple-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity" />
            {isMenuOpen ? (
              <X className="w-6 h-6 relative z-10" />
            ) : (
              <Menu className="w-6 h-6 relative z-10" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)]/50 bg-[var(--color-bg-secondary)]/95 backdrop-blur-xl py-4 animate-in slide-in-from-top duration-200">
            <Link
              to="/"
              className={cn(
                'flex items-center gap-3 px-6 py-4 mx-4 rounded-xl transition-all text-sm font-medium relative overflow-hidden group',
                location.pathname === '/'
                  ? 'bg-gradient-to-r from-[var(--color-primary)] to-purple-500 text-white shadow-lg shadow-[var(--color-primary)]/30'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {location.pathname === '/' && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              )}
              <Home className={cn(
                "w-5 h-5 relative z-10 transition-transform",
                location.pathname === '/' ? "text-white" : "group-hover:scale-110"
              )} />
              <span className="relative z-10 font-semibold">Features</span>
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main 
        className="py-8 lg:py-12 flex-1"
        style={{ paddingLeft: '80px', paddingRight: '80px' }}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <footer 
        className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-8"
        style={{ paddingLeft: '80px', paddingRight: '80px' }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
          <div>© {new Date().getFullYear()} BeeOrder Documentation Portal</div>
          <div className="flex items-center gap-4">
            <span>Flutter Feature Documentation</span>
            <span>•</span>
            <span>Built with React + Vite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
        active
          ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/15 hover:border-[var(--color-primary)]/30'
          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
      )}
    >
      {children}
    </Link>
  );
}
