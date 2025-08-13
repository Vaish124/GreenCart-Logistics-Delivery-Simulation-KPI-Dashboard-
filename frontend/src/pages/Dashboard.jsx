import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL}/kpi`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setKpi(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading KPIs...</p>;
  if (!kpi) return <p>Failed to load KPI data</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>KPI Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        <KpiCard title="Total Orders" value={kpi.totalOrders ?? 0} />
        <KpiCard title="On-Time Delivery %" value={`${kpi.onTimePercent ?? 0}%`} />
        <KpiCard title="Total Profit" value={`₹${kpi.totalProfit ?? '0.00'}`} />
        <KpiCard title="Total Fuel Cost" value={`₹${kpi.totalFuelCost ?? '0.00'}`} />
        <KpiCard title="Avg Delivery Time" value={`${kpi.avgDeliveryTime ?? 0} min`} />
        <KpiCard title="Top Driver" value={kpi.topDriver || 'N/A'} />
      </div>
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div style={{
      flex: '1 1 200px',
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 20,
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h4 style={{ margin: 0, marginBottom: 10 }}>{title}</h4>
      <p style={{ fontSize: 20, fontWeight: 'bold', margin: 0 }}>{value}</p>
    </div>
  );
}
