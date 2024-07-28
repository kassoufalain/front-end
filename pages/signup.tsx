/*import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import '../styles/signup.css'; // Import your signup.css file here

const Signup: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // State for theme

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userData = { email, password };
      const response = await axios.post('http://localhost:5000/api/auth/signup', userData);

      // Store userId in localStorage
      localStorage.setItem('userId', response.data.token);

      // Assuming response is in correct format
      console.log('Signup successful:', response.data);

      // Redirect to login page after successful signup
      router.push('/login');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Signup failed');
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
            {/* Use your theme toggle icon here }
            <img src="Untitled-1.png" alt="theme selector" />
          </button>
          <img className="icon user-profile" src="profile photo.png" alt="profile photo" />
        </div>
      </div>
      <div className="container">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignup}>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <p>Already have an account? <Link href="/login">Login</Link></p>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
*/




import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../styles/auth.css'; // Ensure this is the correct path to your CSS file

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Assuming you have a theme and toggleTheme in your application
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Replace this with your theme management logic

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userData = { email, password };
      const response = await axios.post('http://localhost:5000/api/auth/signup', userData);

      // Store userId in localStorage
      localStorage.setItem('userId', response.data.token);

      // Assuming response is in correct format
      console.log('Signup successful:', response.data);

      // Redirect to login page after successful signup
      router.push('/login');
    } catch (err: any) {
      console.error('Signup error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    }
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
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignup}>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <p>Already have an account? <Link href="/login">Login</Link></p>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
