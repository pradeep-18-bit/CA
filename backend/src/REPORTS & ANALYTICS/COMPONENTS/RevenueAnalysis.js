// RevenueAnalysis.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

/* ===========================
   CONFIG / HELPERS
   =========================== */

const INVOICES_API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices";
const CLIENTS_API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients";
const NUM_MONTHS = 6;

const parseDateSafe = (v) => {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};
const getMonthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
const shortMonthLabel = (date) => date.toLocaleString("en-US", { month: "short" });

const getLastNMonths = (n, end = new Date()) => {
  const out = [];
  const base = new Date(end.getFullYear(), end.getMonth(), 1);
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
    out.push({
      key: getMonthKey(d),
      date: d,
      label: `${shortMonthLabel(d)} ${d.getFullYear()}`,
      short: shortMonthLabel(d),
    });
  }
  return out;
};

const safeParseInvoiceItems = (invoiceItems) => {
  try {
    const arr = typeof invoiceItems === "string" ? JSON.parse(invoiceItems || "[]") : invoiceItems || [];
    if (!Array.isArray(arr)) return [];
    return arr.map((it) => ({
      service: (it.servicedescription || it.itemname || it.servicedesc || "Other").trim(),
      amount: Number(it.amount ?? it.rate ?? 0) || 0,
    }));
  } catch {
    return [];
  }
};

const formatINR = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "₹0";
  return `₹${Number(num).toLocaleString("en-IN")}`;
};

/* aggregate builder reused from before */
const buildChartData = (invoices, clients, months) => {
  const mMap = {};
  months.forEach((m) => (mMap[m.key] = { key: m.key, label: m.short, paid: 0, pending: 0, total: 0, newActive: 0, newInactive: 0 }));

  (invoices || []).forEach((inv) => {
    const d = parseDateSafe(inv.invoiceDate) || parseDateSafe(inv.createdAt) || parseDateSafe(inv.invoice_date) || null;
    if (!d) return;
    const key = getMonthKey(d);
    if (!mMap[key]) return;
    let amt = 0;
    const items = safeParseInvoiceItems(inv.invoiceItems);
    if (items.length) amt = items.reduce((s, it) => s + (Number(it.amount) || 0), 0);
    if (!amt) amt = Number(inv.amount || 0) || 0;
    const status = String(inv.status || "").toLowerCase();
    if (status === "paid" || status === "completed") mMap[key].paid += amt;
    else mMap[key].pending += amt;
    mMap[key].total += amt;
  });

  const newActive = {};
  const newInactive = {};
  Object.keys(mMap).forEach((k) => {
    newActive[k] = 0;
    newInactive[k] = 0;
  });

  (clients || []).forEach((c) => {
    const d = parseDateSafe(c.createdAt) || parseDateSafe(c.lastActivity) || null;
    if (!d) return;
    const key = getMonthKey(d);
    if (!newActive.hasOwnProperty(key)) return;
    const st = String(c.status || "").toLowerCase();
    if (st === "active") newActive[key] += 1;
    else newInactive[key] += 1;
  });

  let cumActive = 0;
  let cumInactive = 0;
  const ordered = months.map((m) => {
    cumActive += newActive[m.key] || 0;
    cumInactive += newInactive[m.key] || 0;
    return {
      monthKey: m.key,
      monthLabel: m.label,
      monthShort: m.short,
      paid: Math.round(mMap[m.key].paid || 0),
      pending: Math.round(mMap[m.key].pending || 0),
      total: Math.round(mMap[m.key].total || 0),
      newActive: newActive[m.key] || 0,
      newInactive: newInactive[m.key] || 0,
      activeCumulative: cumActive,
      inactiveCumulative: cumInactive,
    };
  });

  return ordered;
};

/* ===========================
   STYLES (JS objects)
   =========================== */

const palette = {
  navy: "#072A60",
  teal: "#10B981",
  orange: "#F59E0B",
  warmRed: "#E11D48",
  surface: "#ffffff",
  subtle: "#6b7280",
  faintGrid: "#f3f4f6",
};

const containerStyle = {
  fontFamily: "Inter, Roboto, system-ui, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial",
  color: "#0f172a",
  padding: 0,
};

const cardStyle = {
  background: palette.surface,
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
  marginBottom: 18,
};

const sectionTitle = {
  margin: "0 0 10px 0",
  fontSize: 18,
  fontWeight: 700,
  color: palette.navy,
};

/* ===========================
   Custom Tooltips (styled)
   =========================== */

const RevenueTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const paidObj = payload.find((p) => p.name === "Paid");
  const pendingObj = payload.find((p) => p.name === "Pending");
  return (
    <div style={{ background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 8px 20px rgba(2,6,23,0.08)", minWidth: 180 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: palette.navy }}>{label}</div>
      <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: palette.navy, fontWeight: 600 }}>Paid</div>
          <div style={{ fontWeight: 800 }}>{formatINR(paidObj ? paidObj.value : 0)}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: palette.orange, fontWeight: 600 }}>Pending</div>
          <div style={{ fontWeight: 800 }}>{formatINR(pendingObj ? pendingObj.value : 0)}</div>
        </div>
        <div style={{ height: 1, background: "#f3f4f6", marginTop: 8 }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <div style={{ color: palette.subtle }}>Total</div>
          <div style={{ fontSize: 14, fontWeight: 900 }}>{formatINR((paidObj?.value || 0) + (pendingObj?.value || 0))}</div>
        </div>
      </div>
    </div>
  );
};

const ClientTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const activeObj = payload.find((p) => p.name === "Active (cumulative)");
  const inactiveObj = payload.find((p) => p.name === "Inactive (cumulative)");
  return (
    <div style={{ background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 8px 20px rgba(2,6,23,0.08)", minWidth: 160 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: palette.navy }}>{label}</div>
      <div style={{ marginTop: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: palette.teal, fontWeight: 600 }}>Active</div>
          <div style={{ fontWeight: 800 }}>{activeObj ? activeObj.value : 0}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <div style={{ color: palette.warmRed, fontWeight: 600 }}>Inactive</div>
          <div style={{ fontWeight: 800 }}>{inactiveObj ? inactiveObj.value : 0}</div>
        </div>
      </div>
    </div>
  );
};

/* ===========================
   MAIN COMPONENT
   =========================== */

const RevenueAnalysis = () => {
  const months = useMemo(() => getLastNMonths(NUM_MONTHS), []);
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch data
  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [invRes, clientRes] = await Promise.all([
          fetch(INVOICES_API, { headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" } }),
          fetch(CLIENTS_API, { headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" } }),
        ]);
        if (!mounted) return;
        if (invRes.ok) {
          const inv = await invRes.json();
          setInvoices(Array.isArray(inv) ? inv : []);
        } else {
          setInvoices([]);
          console.warn("Invoices fetch failed", invRes.status);
        }
        if (clientRes.ok) {
          const c = await clientRes.json();
          setClients(Array.isArray(c) ? c : []);
        } else {
          setClients([]);
          console.warn("Clients fetch failed", clientRes.status);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load revenue data.");
        setInvoices([]);
        setClients([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAll();
    return () => {
      mounted = false;
    };
  }, []);

  const chartData = useMemo(() => buildChartData(invoices, clients, months), [invoices, clients, months]);

  const revenueBreakdown = useMemo(() => {
    const map = {};
    (invoices || []).forEach((inv) => {
      const items = safeParseInvoiceItems(inv.invoiceItems);
      if (items.length === 0) {
        const svc = (inv.servicedescription || inv.servicedesc || "Other").trim();
        const amt = Number(inv.amount || 0) || 0;
        map[svc] = (map[svc] || 0) + amt;
      } else {
        items.forEach((it) => {
          map[it.service] = (map[it.service] || 0) + (Number(it.amount) || 0);
        });
      }
    });
    return Object.keys(map).map((k) => ({ title: k, value: Math.round(map[k]) })).sort((a, b) => b.value - a.value);
  }, [invoices]);

  const breakdownTotal = revenueBreakdown.reduce((s, r) => s + r.value, 0) || 1;

  /* ===========================
     RENDER
     =========================== */

  return (
    <div style={containerStyle}>
      {/* Revenue Trends */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h4 style={sectionTitle}>Revenue Trends</h4>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "stretch", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minHeight: 320, minWidth: 360 }}>
            <div style={{ width: "100%", height: 320 }}>
              {loading ? (
                <div style={{ padding: 20, color: palette.subtle }}>Loading revenue chart…</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 12 }}>

  {/* Gradients + Shadow */}
  <defs>
    <linearGradient id="pendingGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FBBF24" stopOpacity={0.98} />
      <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.9} />
    </linearGradient>

    <linearGradient id="paidGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#0F3B82" stopOpacity={1} />
      <stop offset="100%" stopColor="#07306A" stopOpacity={0.9} />
    </linearGradient>

    <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.06" />
    </filter>
  </defs>

  <CartesianGrid strokeDasharray="3 3" stroke={palette.faintGrid} vertical={false} />
  <XAxis dataKey="monthShort" axisLine={false} tickLine={false} />

  {/* -------------------------
      UPDATED: THOUSANDS FORMAT
     ------------------------- */}
  <YAxis
    axisLine={false}
    tickLine={false}
    tickFormatter={(v) => {
      if (v >= 1000) return (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + "K";
      return v;
    }}
  />

  <Tooltip content={<RevenueTooltip />} />
  <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingTop: 4 }} />

  {/* -------------------------
      UPDATED: SIDE-BY-SIDE BARS
     ------------------------- */}

  <Bar
    dataKey="pending"
    name="Pending"
    barSize={55}
    radius={[10, 10, 4, 4]}
    fill="url(#pendingGrad)"
    isAnimationActive
    animationDuration={900}
    style={{ filter: "url(#barShadow)" }}
  >
    <LabelList
      dataKey="pending"
      position="top"
      style={{ fill: "#444", fontWeight: 600, fontSize: 12 }}
      formatter={(v) => (v ? formatINR(v) : "")}
    />
  </Bar>

  <Bar
    dataKey="paid"
    name="Paid"
    barSize={55}
    radius={[10, 10, 4, 4]}
    fill="url(#paidGrad)"
    isAnimationActive
    animationDuration={900}
    style={{ filter: "url(#barShadow)" }}
  >
    <LabelList
      dataKey="paid"
      position="top"
      style={{ fill: "#222", fontWeight: 700, fontSize: 12 }}
      formatter={(v) => (v ? formatINR(v) : "")}
    />
  </Bar>

</ComposedChart>

                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* small metric column */}
          <div style={{ width: 240, display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                padding: 12,
                borderRadius: 10,
                background: "linear-gradient(180deg, rgba(7,42,96,0.06), rgba(255,255,255,0.6))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              <div style={{ fontSize: 12, color: palette.subtle }}>Total (window)</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: palette.navy }}>
                {formatINR(chartData.reduce((s, r) => s + (r.total || 0), 0))}
              </div>
              <div style={{ fontSize: 12, color: palette.subtle, marginTop: 6 }}>Paid vs Pending breakdown</div>
            </div>

            <div style={{ padding: 12, borderRadius: 10, background: "#fff", boxShadow: "0 6px 14px rgba(2,6,23,0.04)" }}>
              <div style={{ fontSize: 12, color: palette.subtle }}>Highest month</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: palette.navy }}>
                {chartData.length ? chartData.reduce((acc, cur) => (cur.total > acc.total ? cur : acc), chartData[0]).monthLabel : "—"}
              </div>
              <div style={{ marginTop: 6, color: palette.subtle }}>
                {chartData.length ? formatINR(chartData.reduce((acc, cur) => (cur.total > acc.total ? cur : acc), chartData[0]).total) : ""}
              </div>
            </div>

            <div style={{ padding: 12, borderRadius: 10, background: "#fff" }}>
              <div style={{ fontSize: 12, color: palette.subtle }}>Average monthly</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: palette.navy }}>
                {chartData.length ? formatINR(Math.round(chartData.reduce((s, r) => s + (r.total || 0), 0) / chartData.length || 0)) : "—"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Growth */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h4 style={sectionTitle}>Client Growth (cumulative)</h4>
        </div>

        <div style={{ width: "100%", height: 300 }}>
          {loading ? (
            <div style={{ padding: 20, color: palette.subtle }}>Loading client chart…</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 12, right: 20, left: -8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={palette.faintGrid} vertical={false} />
                <XAxis dataKey="monthShort" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<ClientTooltip />} />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="inactiveCumulative"
                  name="Inactive (cumulative)"
                  stroke={palette.warmRed}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive
                  animationDuration={700}
                />
                <Line
                  type="monotone"
                  dataKey="activeCumulative"
                  name="Active (cumulative)"
                  stroke={palette.teal}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive
                  animationDuration={700}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* KPI chips */}
        <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
          <div style={{ padding: "10px 12px", borderRadius: 10, background: "#fff", minWidth: 160, boxShadow: "0 6px 12px rgba(2,6,23,0.03)" }}>
            <div style={{ fontSize: 12, color: palette.subtle }}>Active (total)</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: palette.teal }}>{chartData.length ? chartData[chartData.length - 1].activeCumulative : 0}</div>
          </div>

          <div style={{ padding: "10px 12px", borderRadius: 10, background: "#fff", minWidth: 160, boxShadow: "0 6px 12px rgba(2,6,23,0.03)" }}>
            <div style={{ fontSize: 12, color: palette.subtle }}>Inactive (total)</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: palette.warmRed }}>{chartData.length ? chartData[chartData.length - 1].inactiveCumulative : 0}</div>
          </div>

          <div style={{ padding: "10px 12px", borderRadius: 10, background: "#fff", minWidth: 160, boxShadow: "0 6px 12px rgba(2,6,23,0.03)" }}>
            <div style={{ fontSize: 12, color: palette.subtle }}>New Active (latest)</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: palette.navy }}>{chartData.length ? chartData[chartData.length - 1].newActive : 0}</div>
          </div>

          <div style={{ padding: "10px 12px", borderRadius: 10, background: "#fff", minWidth: 160, boxShadow: "0 6px 12px rgba(2,6,23,0.03)" }}>
            <div style={{ fontSize: 12, color: palette.subtle }}>New Inactive (latest)</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: palette.subtle }}>{chartData.length ? chartData[chartData.length - 1].newInactive : 0}</div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div style={cardStyle}>
        <div style={{ marginBottom: 10 }}>
          <h4 style={sectionTitle}>Revenue Breakdown by Service</h4>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 }}>
          {loading ? (
            <div style={{ padding: 12, borderRadius: 8, background: "#fff" }}>Loading…</div>
          ) : revenueBreakdown.length === 0 ? (
            <div style={{ padding: 12, borderRadius: 8, background: "#fff" }}>No revenue breakdown found</div>
          ) : (
            revenueBreakdown.map((r, i) => {
              const pct = Math.round((r.value / breakdownTotal) * 1000) / 10;
              return (
                <div key={i} style={{ padding: 12, borderRadius: 10, background: "#fff", boxShadow: "0 6px 14px rgba(2,6,23,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 700 }}>{r.title}</div>
                    <div style={{ fontWeight: 800, color: palette.navy }}>{formatINR(r.value)}</div>
                  </div>
                  <div style={{ marginTop: 8, color: palette.subtle, fontSize: 13 }}>{pct}% of revenue</div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {error && <div style={{ color: "crimson", marginTop: 12 }}>{error}</div>}
    </div>
  );
};

export default RevenueAnalysis;
