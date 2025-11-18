import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProviderCard from './components/ProviderCard'
import HowItWorks from './components/HowItWorks'
import CTA from './components/CTA'

function Home() {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchProviders = async (city) => {
    setLoading(true)
    setError('')
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/providers${city ? `?city=${encodeURIComponent(city)}` : ''}`)
      if (!res.ok) throw new Error('Kan aanbieders niet laden')
      const data = await res.json()
      setProviders(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProviders('') }, [])

  return (
    <main>
      <Hero onSearch={fetchProviders} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12" aria-label="Aanbieders in de buurt">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Aanbieders</h2>
          {loading && <span className="text-slate-500 text-sm">Bezig met laden…</span>}
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((p) => (
            <ProviderCard key={p.id} provider={p} onSelect={() => {}} />
          ))}
          {!loading && providers.length === 0 && (
            <p className="text-slate-600">Geen aanbieders gevonden. Probeer een andere locatie.</p>
          )}
        </div>
      </section>

      <HowItWorks type="user" />
      <CTA />
    </main>
  )
}

function UserPage() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900">Voor gebruikers</h1>
        <p className="mt-3 text-slate-700 max-w-2xl">
          Upload je document, kies een aanbieder in de buurt en betaal per pagina. Geen wachtrijen, geen gedoe met openingstijden.
        </p>
      </section>
      <HowItWorks type="user" />
      <CTA />
    </main>
  )
}

function ProviderPage() {
  const [form, setForm] = useState({ display_name: '', city: '', description: '', price_per_page: '0.10', color_supported: true, duplex: true })
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Bezig met opslaan…')
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/providers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price_per_page: parseFloat(form.price_per_page)
        })
      })
      if (!res.ok) throw new Error('Opslaan mislukt')
      const data = await res.json()
      setStatus('✅ Aangemeld! Je staat nu in de zoekresultaten.')
      setForm({ display_name: '', city: '', description: '', price_per_page: '0.10', color_supported: true, duplex: true })
    } catch (e) {
      setStatus(`❌ ${e.message}`)
    }
  }

  return (
    <main>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900">Verdien bij met je printer</h1>
        <p className="mt-3 text-slate-700">
          Meld je aan als aanbieder. Bepaal je prijs en beschikbaarheid en help je buurtgenoten.
        </p>

        <form onSubmit={submit} className="mt-8 grid gap-4 bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200">
          <label className="grid gap-1">
            <span className="text-sm text-slate-700">Publieke naam</span>
            <input value={form.display_name} onChange={(e)=>setForm(f=>({...f, display_name:e.target.value}))} required className="px-3 py-2 rounded-lg border border-slate-300" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-slate-700">Stad / buurt</span>
            <input value={form.city} onChange={(e)=>setForm(f=>({...f, city:e.target.value}))} required className="px-3 py-2 rounded-lg border border-slate-300" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-slate-700">Beschrijving (optioneel)</span>
            <textarea value={form.description} onChange={(e)=>setForm(f=>({...f, description:e.target.value}))} rows={3} className="px-3 py-2 rounded-lg border border-slate-300" />
          </label>
          <div className="grid sm:grid-cols-3 gap-4">
            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Prijs per pagina (€)</span>
              <input type="number" min="0" step="0.01" value={form.price_per_page} onChange={(e)=>setForm(f=>({...f, price_per_page:e.target.value}))} required className="px-3 py-2 rounded-lg border border-slate-300" />
            </label>
            <label className="flex items-center gap-2 mt-6">
              <input type="checkbox" checked={form.color_supported} onChange={(e)=>setForm(f=>({...f, color_supported:e.target.checked}))} />
              <span className="text-slate-700">Kleur</span>
            </label>
            <label className="flex items-center gap-2 mt-6">
              <input type="checkbox" checked={form.duplex} onChange={(e)=>setForm(f=>({...f, duplex:e.target.checked}))} />
              <span className="text-slate-700">Duplex</span>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Aanmelden</button>
            <span className="text-sm text-slate-600" role="status">{status}</span>
          </div>
        </form>
      </section>
      <HowItWorks type="provider" />
      <CTA />
    </main>
  )
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      {children}
      <footer className="py-10 text-center text-slate-500">© {new Date().getFullYear()} Localprint · Lokaal, vriendelijk en duurzaam</footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/zo-werkt-het" element={<Layout><UserPage /></Layout>} />
      <Route path="/aanbieden" element={<Layout><ProviderPage /></Layout>} />
    </Routes>
  )
}

export default App
