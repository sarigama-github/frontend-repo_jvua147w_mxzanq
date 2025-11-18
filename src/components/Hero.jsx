import { useState } from 'react'

function Hero({ onSearch }) {
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500"/>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"/>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"/>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Print snel bij iemand om de hoek
            </h1>
            <p className="mt-5 text-white/90 text-lg">
              Altijd een printer in jouw buurt. Sneller, goedkoper en zonder gedoe met openingstijden.
            </p>

            <form onSubmit={submit} className="mt-8 bg-white/10 backdrop-blur rounded-xl p-2 flex gap-2 ring-1 ring-white/30">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Voer je locatie in (bijv. Amsterdam, Utrecht)"
                className="flex-1 bg-transparent placeholder-white/70 text-white px-4 py-3 focus:outline-none"
                aria-label="Zoek een printer bij jou in de buurt"
              />
              <button className="px-4 py-3 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-white/90 transition">
                Zoeken
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2"><span className="text-yellow-300">★</span> Goedkoper dan printshops</div>
              <div className="flex items-center gap-2"><span className="text-yellow-300">★</span> Privacy gegarandeerd</div>
              <div className="flex items-center gap-2"><span className="text-yellow-300">★</span> Lokaal en duurzaam</div>
            </div>
          </div>

          <div>
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Zoekresultaten in de buurt</h3>
              <div className="grid gap-3" aria-live="polite">
                <p className="text-white/70">Voer je locatie in om aanbieders te zien.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
