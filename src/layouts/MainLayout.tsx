import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Github } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--color-bg-secondary)]/95 backdrop-blur border-b-2 border-[var(--color-border)] shadow-xl">
        <div className="w-full max-w-[1600px] mx-auto" style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div className="px-16 sm:px-20 md:px-24 lg:px-32 xl:px-40 2xl:px-52">
            <div className="flex items-center justify-between h-20 lg:h-24">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-4 group">
                <div className="p-2.5 lg:p-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg group-hover:scale-105 transition-transform shadow-lg">
                  <BookOpen className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div>
                  <span className="font-bold text-lg lg:text-xl text-[var(--color-text-primary)]">BeeOrder</span>
                  <span className="text-base lg:text-lg text-[var(--color-text-muted)]"> Docs</span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8 lg:gap-10">
                <NavLink to="/" active={location.pathname === '/'}>
                  <Home className="w-5 h-5" />
                  <span className="text-base lg:text-lg">Features</span>
                </NavLink>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-base lg:text-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors font-medium"
                >
                  <Github className="w-5 h-5" />
                  Source
                </a>
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
            <div className="w-full max-w-[1600px] mx-auto" style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
              <nav className="px-16 sm:px-20 md:px-24 lg:px-32 xl:px-40 2xl:px-52 py-6 space-y-3">
              <Link
                to="/"
                className={cn(
                  'flex items-center gap-3 px-6 py-3 rounded-xl transition-all text-base font-medium',
                  location.pathname === '/'
                    ? 'bg-[var(--color-primary)] text-white shadow-lg'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                Features
              </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="py-8 lg:py-12 xl:py-16">
        <div className="w-full max-w-[1600px] mx-auto" style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div className="px-16 sm:px-20 md:px-24 lg:px-32 xl:px-40 2xl:px-52">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-lg">
        <div className="w-full max-w-[1600px] mx-auto" style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div className="px-16 sm:px-20 md:px-24 lg:px-32 xl:px-40 2xl:px-52 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-base lg:text-lg text-[var(--color-text-muted)] font-medium">
              © {new Date().getFullYear()} BeeOrder Documentation Portal
            </div>
            <div className="flex items-center gap-4 lg:gap-6 text-base lg:text-lg text-[var(--color-text-muted)]">
              <span className="font-medium">Flutter Feature Documentation</span>
              <span className="text-[var(--color-text-muted)]">•</span>
              <span className="font-medium">Built with React + Vite</span>
            </div>
          </div>
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
        'flex items-center gap-2.5 font-semibold transition-all px-4 py-2 rounded-lg',
        active
          ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
      )}
    >
      {children}
    </Link>
  );
}

