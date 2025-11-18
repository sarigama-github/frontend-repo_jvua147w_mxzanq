function ProviderCard({ provider, onSelect }) {
  return (
    <button onClick={() => onSelect?.(provider)} className="text-left w-full group">
      <div className="p-5 rounded-xl bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md transition">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold text-slate-800 group-hover:text-slate-900">{provider.display_name}</h4>
            <p className="text-sm text-slate-500">{provider.city}</p>
          </div>
          <div className="text-right">
            <div className="text-indigo-600 font-semibold">€{provider.price_per_page.toFixed(2)} / pagina</div>
            <div className="text-sm text-amber-500">★ {provider.rating?.toFixed(1) || '0.0'} ({provider.reviews_count})</div>
          </div>
        </div>
        <p className="mt-2 text-slate-600 text-sm line-clamp-2">{provider.description || 'Betrouwbare buurtprinter'}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          {provider.color_supported ? <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700">Kleur</span> : <span className="px-2 py-1 rounded bg-slate-100">Zwart-wit</span>}
          {provider.duplex && <span className="px-2 py-1 rounded bg-blue-50 text-blue-700">Duplex</span>}
        </div>
      </div>
    </button>
  )
}

export default ProviderCard
