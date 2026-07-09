'use client'

import ProjectsClient from '../components/ProjectsClient'

export default function DashboardPage() {
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
          <ProjectsClient />
        </section>
      </div>
    </div>
  )
}
