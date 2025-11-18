import { useState } from 'react'

function Hero({ onSearch }) {
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <section className="relative overflow-hidden">
      {/* High-contrast light background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-slate-50"/>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Print snel bij iemand om de hoek
            </h1>
            <p className="mt-5 text-slate-700 text-lg">
              Altijd een printer in jouw buurt. Sneller, goedkoper en zonder gedoe met openingstijden.
            </p>

            <form onSubmit={submit} className="mt-8 bg-white rounded-xl p-2 flex gap-2 ring-1 ring-slate-300 shadow-sm">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Voer je locatie in (bijv. Amsterdam, Utrecht)"
                className="flex-1 bg-white placeholder-slate-400 text-slate-900 px-4 py-3 focus:outline-none"
                aria-label="Zoek een printer bij jou in de buurt"
              />
              <button className="px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                Zoeken
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-slate-700">
              <div className="flex items-center gap-2"><span className="text-amber-500" aria-hidden>★</span> Goedkoper dan printshops</div>
              <div className="flex items-center gap-2"><span className="text-amber-500" aria-hidden>★</span> Privacy gegarandeerd</div>
              <div className="flex items-center gap-2"><span className="text-amber-500" aria-hidden>★</span> Lokaal en duurzaam</div>
            </div>
          </div>

          <div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-slate-900 font-semibold mb-4">Zoekresultaten in de buurt</h3>
              <div className="grid gap-3" aria-live="polite">
                <p className="text-slate-600">Voer je locatie in om aanbieders te zien.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
