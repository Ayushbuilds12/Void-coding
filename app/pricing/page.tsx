import Link from 'next/link'

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">Pricing for Void</h1>
          <p className="mt-2 text-gray-600">Simple, predictable pricing for individuals and teams.</p>
        </div>

        <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="mt-2 text-3xl font-extrabold">$0<span className="text-base font-medium">/mo</span></p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>1 Project</li>
              <li>Basic Domains</li>
              <li>Community support</li>
            </ul>
            <Link href="/login" className="mt-6 inline-block w-full text-center bg-gray-100 py-2 rounded-md font-medium">Get started</Link>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Pro</h3>
            <p className="mt-2 text-3xl font-extrabold">$12<span className="text-base font-medium">/mo</span></p>
            <ul className="mt-4 space-y-2">
              <li>Unlimited Projects</li>
              <li>Custom Domains</li>
              <li>Priority support</li>
            </ul>
            <Link href="/login" className="mt-6 inline-block w-full text-center bg-white text-indigo-700 py-2 rounded-md font-medium">Start Pro</Link>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">Enterprise</h3>
            <p className="mt-2 text-3xl font-extrabold">Contact us</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>Custom pricing</li>
              <li>SSO & advanced security</li>
              <li>Dedicated support</li>
            </ul>
            <Link href="/contact" className="mt-6 inline-block w-full text-center bg-gray-100 py-2 rounded-md font-medium">Contact sales</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
