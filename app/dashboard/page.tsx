export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button className="inline-flex items-center rounded-md bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700">New Project</button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Project Alpha</h3>
          <p className="text-sm text-gray-600 mt-2">A sample project description.</p>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Project Beta</h3>
          <p className="text-sm text-gray-600 mt-2">Another example project.</p>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Project Gamma</h3>
          <p className="text-sm text-gray-600 mt-2">Staging project.</p>
        </div>
      </div>
    </div>
  )
}
