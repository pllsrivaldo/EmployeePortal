'use client'

import { login } from '@/app/auth/actions'
import { useState, Suspense } from 'react' 
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams() // Ini yang bikin error kalau tanpa Suspense
  const successMessage = searchParams.get('message')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const res = await login(formData)
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      
      {/* Kartu Login dengan Efek Glass / Kaca */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] border border-white/20">
        
        {/* Header Biru */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white">
          <h1 className="text-3xl font-bold tracking-tight">Portal Karyawan</h1>
          <p className="mt-2 text-blue-100 text-sm">Masuk untuk mengakses dashboard</p>
        </div>

        <div className="p-8">
          {/* Pesan Sukses/Error */}
          {successMessage && (
             <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700 border border-green-200 flex items-center gap-2">
               ✅ {successMessage}
             </div>
          )}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200 flex items-center gap-2">
               ⚠️ {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Perusahaan</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="nama@perusahaan.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                name="password" 
                type="password" 
                required 
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Masuk Sekarang'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Karyawan baru?{' '}
            <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
              Daftar akun di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}