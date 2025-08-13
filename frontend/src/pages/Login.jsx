import React, {useState} from 'react';

export default function Login() {
  const [email, setEmail] = useState('manager@greencart.test');
  const [password, setPassword] = useState('Password123!');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(import.meta.env.VITE_API_URL + '/auth/login', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email,password})
    });
    const j = await res.json();
    if (res.ok) {
      localStorage.setItem('token', j.token);
      setMsg('Login successful — token saved. Go to Dashboard.');
    } else {
      setMsg('Login failed: ' + (j.error || JSON.stringify(j)));
    }
  };

  return (<div style={{padding:20}}>
    <h2>Manager Login</h2>
    <form onSubmit={submit}>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' /></div>
      <div><input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' /></div>
      <button type='submit'>Login</button>
    </form>
    <p>{msg}</p>
    <p>Seeded account: manager@greencart.test / Password123!</p>
  </div>);
}
