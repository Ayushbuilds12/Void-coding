import { createServerSupabaseClient } from '../../lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: projects } = await supabase.from('projects').select('*').eq('user_id', user.id).order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>

      <div className="mt-6">
        <section className="mb-6">
          <h2 className="text-lg font-semibold">Create project</h2>
          {/* Client form to create project */}
          <div className="mt-4">
            {/* The CreateProjectForm client component will POST to /api/projects */}
            <form id="create-project-form" action="/api/projects" method="post" className="grid gap-2 sm:grid-cols-2">
              <input name="name" placeholder="Project name" className="p-2 border rounded-md" required />
              <input name="description" placeholder="Short description" className="p-2 border rounded-md" />
              <button type="submit" className="col-span-full inline-flex items-center rounded-md bg-indigo-600 text-white px-4 py-2">Create</button>
            </form>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold">View projects</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects?.map((p: any) => (
              <div key={p.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{p.description}</p>
              </div>
            ))}
            {(!projects || projects.length === 0) && <div className="text-sm text-gray-500">No projects yet.</div>}
          </div>
        </section>
      </div>
    </div>
  )
}
