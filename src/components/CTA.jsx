function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-10 overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl"/>
        <div className="grid md:grid-cols-2 gap-8 items-center relative">
          <div>
            <h3 className="text-2xl font-bold">Doe mee met Localprint</h3>
            <p className="mt-2 text-white/80">Word aanbieder of laat vandaag nog iets printen bij een buur.</p>
          </div>
          <div className="flex gap-3 md:justify-end">
            <a href="/zo-werkt-het" className="px-4 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90">Ik wil iets printen</a>
            <a href="/aanbieden" className="px-4 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 font-semibold">Ik wil aanbieden</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
