import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const { pathname } = useLocation()
  const linkBase = 'text-slate-700 hover:text-slate-900 transition-colors'
  const active = 'text-slate-900 font-medium'

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 shadow ring-1 ring-slate-200" />
            <span className="font-semibold text-slate-900 text-lg">Localprint</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`${linkBase} ${pathname === '/' ? active : ''}`}>Home</Link>
            <Link to="/zo-werkt-het" className={`${linkBase} ${pathname === '/zo-werkt-het' ? active : ''}`}>Voor gebruikers</Link>
            <Link to="/aanbieden" className={`${linkBase} ${pathname === '/aanbieden' ? active : ''}`}>Voor aanbieders</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/zo-werkt-het" className="px-3 py-2 text-sm rounded-lg border border-slate-300 text-slate-900 bg-white hover:bg-slate-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              Iets printen
            </Link>
            <Link to="/aanbieden" className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              Word aanbieder
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
