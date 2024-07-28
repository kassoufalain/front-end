/*import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import '../styles/signup.css'; // Import your signup.css file here

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // State for theme

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);

      // Store token in localStorage

      localStorage.setItem('token', response.data.token);
      console.log(response.data.token);

      // Assuming response is in correct format
      console.log('Login successful:', response.data);

      // Redirect to notes page after successful login
      router.push('/notes');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme === 'light' ? 'light-mode' : 'dark-mode'}>
      <div className="header">
        <div className="logo">
          <h1>TO DO APP</h1>
          <p>Stop Procrastinating, Start Organizing</p>
        </div>
        <div className="icons">
          <button id="theme-toggle" className="theme-toggle" onClick={toggleTheme}>
           // {/* Use your theme toggle icon here 
            <img src="Untitled-1.png" alt="theme selector" />
          </button>
          <img className="icon user-profile" src="profile photo.png" alt="profile photo" />
        </div>
      </div>
      <div className="container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p>Don't have an account? <Link href="/signup">Signup</Link></p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

 */


import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../styles/auth.css'; // Import your login CSS file if needed

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // State for theme
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('unique_token', response.data.token); // Store the token as userId
      console.log('login successful>>', response.data.token);
      console.log('Login successful:', response.data);

      // Redirect to notes page
      router.push('/notes');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response ? err.response.data.error : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme === 'light' ? 'light-mode' : 'dark-mode'}>
      <div className="header">
        <div className="logo">
          <h1>TO DO APP</h1>
          <p>Stop Procrastinating, Start Organizing</p>
        </div>
        <div className="icons">
          <button id="theme-toggle" className="theme-toggle" onClick={toggleTheme}>
            <img src="Untitled-1.png" alt="theme selector" />
          </button>
          <img className="icon user-profile" src="profile photo.png" alt="profile photo" />
        </div>
      </div>
      <div className="container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
            <p>Don't have an account? <Link href="/signup">Sign up</Link></p>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
