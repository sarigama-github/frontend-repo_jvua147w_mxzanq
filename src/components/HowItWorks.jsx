function HowItWorks({ type = 'user' }) {
  const isUser = type === 'user'
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{isUser ? 'Zo werkt het (voor gebruikers)' : 'Word aanbieder in 3 stappen'}</h2>
          <ol className="space-y-4 text-slate-700">
            {isUser ? (
              <>
                <li>
                  <span className="font-semibold">1. Zoek een printer</span> – Vul je locatie in en kies een aanbieder in de buurt.
                </li>
                <li>
                  <span className="font-semibold">2. Upload & betaal veilig</span> – Betaal per pagina, goedkoper dan de meeste printshops.
                </li>
                <li>
                  <span className="font-semibold">3. Haal op in de buurt</span> – Je print ligt snel klaar bij een betrouwbaar buurtlid.
                </li>
              </>
            ) : (
              <>
                <li>
                  <span className="font-semibold">1. Meld je printer aan</span> – Stel je prijs per pagina in en beschrijf je printer.
                </li>
                <li>
                  <span className="font-semibold">2. Ontvang verzoeken</span> – Kies zelf welke opdrachten je aanneemt.
                </li>
                <li>
                  <span className="font-semibold">3. Verdien bij</span> – Uitbetaling maandelijks, jij bepaalt je beschikbaarheid.
                </li>
              </>
            )}
          </ol>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4">Waarom Localprint?</h3>
          <ul className="grid gap-3 text-slate-700">
            <li className="flex gap-2"><span className="text-amber-500">★</span> Altijd een printer in jouw buurt</li>
            <li className="flex gap-2"><span className="text-amber-500">★</span> Goedkoper dan printshops</li>
            <li className="flex gap-2"><span className="text-amber-500">★</span> Geen gedoe met openingstijden</li>
            <li className="flex gap-2"><span className="text-amber-500">★</span> Privacy gegarandeerd</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
