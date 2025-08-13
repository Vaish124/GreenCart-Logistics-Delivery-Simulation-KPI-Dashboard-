import React, {useEffect, useState} from 'react';

export default function Management() {
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [orders, setOrders] = useState([]);

  async function loadAll() {
    const token = localStorage.getItem('token');
    const [drRes, rtRes, orRes] = await Promise.all([
      fetch(import.meta.env.VITE_API_URL + '/drivers', {headers:{Authorization:'Bearer '+token}}),
      fetch(import.meta.env.VITE_API_URL + '/routes', {headers:{Authorization:'Bearer '+token}}),
      fetch(import.meta.env.VITE_API_URL + '/orders', {headers:{Authorization:'Bearer '+token}})
    ]);
    if (drRes.ok) setDrivers(await drRes.json());
    if (rtRes.ok) setRoutes(await rtRes.json());
    if (orRes.ok) setOrders(await orRes.json());
  }

  useEffect(()=>{ loadAll(); }, []);

  return (<div style={{padding:20}}>
    <h2>Management</h2>
    <h3>Drivers</h3>
    <pre>{JSON.stringify(drivers, null, 2)}</pre>
    <h3>Routes</h3>
    <pre>{JSON.stringify(routes, null, 2)}</pre>
    <h3>Orders</h3>
    <pre>{JSON.stringify(orders, null, 2)}</pre>
    <p>Use the API endpoints to create/update/delete. This UI is intentionally minimal for the assessment.</p>
  </div>);
}
