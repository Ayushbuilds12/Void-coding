import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <section className="container mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">Build real-world websites and projects</h1>
          <p className="mt-6 text-lg text-gray-600">Void Coding helps students and intermediate developers learn practical web development with hands-on tutorials and projects.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="inline-flex items-center justify-center rounded-md bg-black text-white px-5 py-3 font-medium hover:opacity-95">Get Started</Link>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-md border border-gray-200 px-5 py-3 text-gray-700 hover:bg-gray-50">Learn More</Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 shadow-lg">
            <div className="h-56 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white text-xl font-semibold">Welcome to Void</div>
            <div className="mt-4 text-sm text-gray-600">A modern, responsive Next.js + Tailwind starter.</div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">Learn by building</h3>
            <p className="mt-2 text-gray-600">Step-by-step projects that teach real skills.</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">Modern stack</h3>
            <p className="mt-2 text-gray-600">Next.js App Router, TypeScript, and Tailwind CSS.</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">Deploy quickly</h3>
            <p className="mt-2 text-gray-600">Deploy to Vercel with zero config.</p>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-gray-100">
        <div className="container mx-auto px-6 py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} Void Coding</div>
      </footer>
    </main>
  )
}
