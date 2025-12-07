import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col">
      {/* Header */}
      <header 
        className="sticky top-0 z-50 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]"
        style={{ paddingLeft: '80px', paddingRight: '80px' }}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-lg text-[var(--color-text-primary)]">BeeOrder</span>
              <span className="text-sm text-[var(--color-text-muted)]">Docs</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" active={location.pathname === '/'}>
              <Home className="w-4 h-4" />
              <span>Features</span>
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-4">
            <Link
              to="/"
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium',
                location.pathname === '/'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              Features
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
        'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all',
        active
          ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
      )}
    >
      {children}
    </Link>
  );
}
