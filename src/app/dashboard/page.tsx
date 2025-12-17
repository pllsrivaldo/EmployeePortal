import { createClient } from '../../../utils/supabase/server'
import { signout } from '@/app/auth/actions'
import { redirect } from 'next/navigation'

type Announcement = {
  id: number
  title: string
  content: string
  created_at: string
}

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Ambil Data User
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Fetch Data
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Navbar Premium */}
      <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-gray-900">PortalKaryawan</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Signed in as</p>
              <p className="text-sm font-bold text-gray-900">{user.email}</p>
            </div>
            
            <form action={signout}>
              <button className="group relative flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 active:translate-y-0.5">
                <span>Logout</span>
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 pb-12 pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Dashboard Overview</h1>
          <p className="mt-2 max-w-2xl text-lg text-gray-500">
            Selamat datang kembali! Berikut adalah update terbaru perusahaan untuk Anda.
          </p>
        </div>
      </div>

      {/* Konten Utama */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
           <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
             </svg>
           </span>
           <h2 className="text-xl font-bold text-gray-900">Pengumuman Terbaru</h2>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements?.map((item: any) => (
            <div 
              key={item.id} 
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
              
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    Info
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="flex-grow text-sm leading-relaxed text-gray-600">
                  {item.content}
                </p>
              </div>
              <div className="mt-auto border-t border-gray-100 bg-gray-50/50 px-6 py-3">
                 <span className="text-xs font-medium text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                   Baca selengkapnya &rarr;
                 </span>
              </div>
            </div>
          ))}

          {(!announcements || announcements.length === 0) && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">Tidak ada pengumuman</h3>
              <p className="mt-1 text-sm text-gray-500">Belum ada info terbaru dari manajemen.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}