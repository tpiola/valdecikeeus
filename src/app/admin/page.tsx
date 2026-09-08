import {
  getOrderRepository,
  getPersistenceUnavailableMessage,
  isDatabaseConfigured,
  isDevFileAdapterEnabled,
  isMercadoPagoConfigured,
} from "@/lib/commerce";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const ordersRepo = getOrderRepository();
  const orders = ordersRepo ? await ordersRepo.list(100) : [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Admin</p>
      <h1 className="mt-2 text-3xl font-bold">Pedidos</h1>
      <p className="mt-2 text-sm text-muted">Área protegida — não indexar. Sem vazamento público.</p>

      <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface p-4 text-sm sm:grid-cols-3">
        <div>
          <p className="text-muted">Banco / Supabase</p>
          <p className="font-bold">{isDatabaseConfigured() ? "configurado" : "ausente"}</p>
        </div>
        <div>
          <p className="text-muted">Dev file adapter</p>
          <p className="font-bold">{isDevFileAdapterEnabled() ? "ativo (dev)" : "off"}</p>
        </div>
        <div>
          <p className="text-muted">Mercado Pago</p>
          <p className="font-bold">{isMercadoPagoConfigured() ? "configurado" : "ausente"}</p>
        </div>
      </div>

      {!ordersRepo ? (
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
          <p className="font-bold">Nenhum pedido listável neste ambiente</p>
          <p className="mt-2">{getPersistenceUnavailableMessage()}</p>
          <p className="mt-3">
            Veja <code>docs/commerce-setup.md</code> no repositório.
          </p>
        </div>
      ) : orders.length === 0 ? (
        <p className="mt-8 text-muted">Nenhum pedido ainda.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Criado</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(o.createdAt).toLocaleString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                    })}
                  </td>
                  <td className="px-4 py-3 font-semibold">{o.status}</td>
                  <td className="px-4 py-3">
                    <div>{o.customer.name}</div>
                    <div className="text-xs text-muted">{o.customer.email}</div>
                  </td>
                  <td className="px-4 py-3">R$ {o.total.toFixed(2).replace(".", ",")}</td>
                  <td className="px-4 py-3 font-mono text-xs">{o.id.slice(0, 8)}…</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
