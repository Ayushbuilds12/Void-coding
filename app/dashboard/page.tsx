import { createServerSupabaseClient } from '../../lib/supabaseServer'

export default async function DashboardPage() {
  // Server component renders a client-side Projects manager
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>

      <div className="mt-6">
        <section className="mb-6">
          <h2 className="text-lg font-semibold">Your projects</h2>
          <p className="mt-2 text-sm text-gray-600">Create and manage your projects for Void.</p>
        </section>

        <section>
          {/* ProjectsClient handles fetch/create/delete without full page reload */}
          {/* Client component imported dynamically via client file */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div id="projects-client" />
        </section>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `import('/_next/static/chunks/main.js')` }} />
    </div>
  )
}
