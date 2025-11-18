import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const { pathname } = useLocation()
  const linkBase = 'text-slate-300 hover:text-white transition-colors'
  const active = 'text-white'

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/30 bg-white/10 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 shadow ring-1 ring-white/30" />
            <span className="font-semibold text-white text-lg">Localprint</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`${linkBase} ${pathname === '/' ? active : ''}`}>Home</Link>
            <Link to="/zo-werkt-het" className={`${linkBase} ${pathname === '/zo-werkt-het' ? active : ''}`}>Voor gebruikers</Link>
            <Link to="/aanbieden" className={`${linkBase} ${pathname === '/aanbieden' ? active : ''}`}>Voor aanbieders</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/zo-werkt-het" className="px-3 py-2 text-sm rounded-lg bg-white/10 text-white hover:bg-white/20 transition">Iets printen</Link>
            <Link to="/aanbieden" className="px-3 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">Word aanbieder</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
