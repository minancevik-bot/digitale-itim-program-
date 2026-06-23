import { SiteHeader } from "@/components/site-header";
import { pricingPlans } from "@/lib/data";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">Paketler</h1>
        <p className="mt-3 text-slate-600">Ödeme entegrasyonu ilk MVP kapsamına dahil değildir; paket altyapısı hazır tutulur.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <section key={plan.name} className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold">{plan.name}</h2>
              <p className="mt-3 text-2xl font-bold text-brand-700">{plan.price}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-600">
                {plan.features.map((feature) => <li key={feature}>• {feature}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
