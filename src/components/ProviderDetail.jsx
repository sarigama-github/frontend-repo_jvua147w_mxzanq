import { useEffect, useState } from 'react'

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="text-slate-500 w-32 shrink-0">{label}</span>
      <span className="text-slate-900">{value}</span>
    </div>
  )
}

export default function ProviderDetail({ providerId }) {
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [reviews, setReviews] = useState([])
  const [rLoading, setRLoading] = useState(false)
  const [rError, setRError] = useState('')

  useEffect(() => {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const fetchAll = async () => {
      setLoading(true)
      setError('')
      try {
        const [pRes, rRes] = await Promise.all([
          fetch(`${base}/api/providers/${providerId}`),
          fetch(`${base}/api/reviews?provider_id=${providerId}`)
        ])
        if (!pRes.ok) throw new Error('Kan aanbieder niet laden')
        const pData = await pRes.json()
        setProvider(pData)
        if (rRes.ok) setReviews(await rRes.json())
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    if (providerId) fetchAll()
  }, [providerId])

  const handleReviewSubmit = async (payload) => {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    setRLoading(true)
    setRError('')
    try {
      const res = await fetch(`${base}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, provider_id: providerId })
      })
      if (!res.ok) throw new Error('Review plaatsen mislukt')
      // Refresh reviews and provider aggregate
      const [rRes, pRes] = await Promise.all([
        fetch(`${base}/api/reviews?provider_id=${providerId}`),
        fetch(`${base}/api/providers/${providerId}`)
      ])
      if (rRes.ok) setReviews(await rRes.json())
      if (pRes.ok) setProvider(await pRes.json())
    } catch (e) {
      setRError(e.message)
    } finally {
      setRLoading(false)
    }
  }

  if (loading) return <p className="text-slate-600">Bezig met laden…</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!provider) return <p className="text-slate-600">Aanbieder niet gevonden.</p>

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{provider.display_name}</h1>
              <p className="text-slate-600">{provider.city}</p>
            </div>
            <div className="text-right">
              <div className="text-indigo-600 font-semibold">€{provider.price_per_page.toFixed(2)} / pagina</div>
              <div className="text-sm text-amber-600">★ {provider.rating?.toFixed(1)} ({provider.reviews_count})</div>
            </div>
          </div>
          {provider.description && (
            <p className="mt-3 text-slate-700">{provider.description}</p>
          )}
          <div className="mt-4 flex items-center gap-2 text-xs">
            {provider.color_supported ? <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700">Kleur</span> : <span className="px-2 py-1 rounded bg-slate-100">Zwart-wit</span>}
            {provider.duplex && <span className="px-2 py-1 rounded bg-blue-50 text-blue-700">Duplex</span>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Reviews</h2>
          {rError && <p className="text-red-600 mt-2">{rError}</p>}
          <ul className="mt-4 grid gap-4">
            {reviews.length === 0 && <li className="text-slate-600">Nog geen reviews.</li>}
            {reviews.map((r) => (
              <li key={r.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900">{r.reviewer_name}</strong>
                  <span className="text-amber-600">★ {r.rating}</span>
                </div>
                {r.comment && <p className="text-slate-700 mt-1">{r.comment}</p>}
              </li>
            ))}
          </ul>

          <ReviewForm onSubmit={handleReviewSubmit} loading={rLoading} />
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200 sticky top-24">
          <h2 className="text-lg font-semibold text-slate-900">Printverzoek</h2>
          <PrintRequestForm providerId={providerId} />
        </div>
      </div>
    </div>
  )
}

function ReviewForm({ onSubmit, loading }) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const handle = async (e) => {
    e.preventDefault()
    await onSubmit?.({ reviewer_name: name || 'Anoniem', rating: Number(rating), comment })
    setName('')
    setRating(5)
    setComment('')
  }

  return (
    <form onSubmit={handle} className="mt-6 grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="text-sm text-slate-700">Naam</span>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-300" placeholder="Jouw naam (optioneel)" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-slate-700">Beoordeling</span>
          <select value={rating} onChange={(e)=>setRating(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-300">
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>
      <label className="grid gap-1">
        <span className="text-sm text-slate-700">Opmerking</span>
        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} rows={3} className="px-3 py-2 rounded-lg border border-slate-300" placeholder="Vertel anderen over je ervaring" />
      </label>
      <button disabled={loading} className="justify-self-start px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60">
        {loading ? 'Verzenden…' : 'Plaats review'}
      </button>
    </form>
  )
}

function PrintRequestForm({ providerId }) {
  const [form, setForm] = useState({ requester_name: '', requester_email: '', pages: 1, color: 'bw', notes: '' })
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Versturen…')
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/print-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pages: Number(form.pages), provider_id: providerId })
      })
      if (!res.ok) throw new Error('Verzoek mislukt')
      setStatus('✅ Verzoek verzonden! De aanbieder neemt contact op.')
      setForm({ requester_name: '', requester_email: '', pages: 1, color: 'bw', notes: '' })
    } catch (e) {
      setStatus(`❌ ${e.message}`)
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 grid gap-3">
      <label className="grid gap-1">
        <span className="text-sm text-slate-700">Naam</span>
        <input value={form.requester_name} onChange={(e)=>setForm(f=>({...f, requester_name:e.target.value}))} required className="px-3 py-2 rounded-lg border border-slate-300" />
      </label>
      <label className="grid gap-1">
        <span className="text-sm text-slate-700">E-mail</span>
        <input type="email" value={form.requester_email} onChange={(e)=>setForm(f=>({...f, requester_email:e.target.value}))} required className="px-3 py-2 rounded-lg border border-slate-300" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="text-sm text-slate-700">Pagina's</span>
          <input type="number" min="1" value={form.pages} onChange={(e)=>setForm(f=>({...f, pages:e.target.value}))} required className="px-3 py-2 rounded-lg border border-slate-300" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-slate-700">Kleur</span>
          <select value={form.color} onChange={(e)=>setForm(f=>({...f, color:e.target.value}))} className="px-3 py-2 rounded-lg border border-slate-300">
            <option value="bw">Zwart-wit</option>
            <option value="color">Kleur</option>
          </select>
        </label>
      </div>
      <label className="grid gap-1">
        <span className="text-sm text-slate-700">Notities (optioneel)</span>
        <textarea rows={3} value={form.notes} onChange={(e)=>setForm(f=>({...f, notes:e.target.value}))} className="px-3 py-2 rounded-lg border border-slate-300" />
      </label>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Verstuur verzoek</button>
        <span className="text-sm text-slate-600" role="status">{status}</span>
      </div>
    </form>
  )
}
