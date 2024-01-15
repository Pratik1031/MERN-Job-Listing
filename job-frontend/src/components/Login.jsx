import React, { useContext, useState } from 'react';
import styles from '../styles/login.module.css';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '..';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../App';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      toast.success(data.message);
      setLoading(false);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={'/'} />;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container}>
          <div className={styles.left_part}>
            <form onSubmit={loginHandler} className={styles.form}>
              <p className={styles.create_accnt}>Already have an account?</p>

              <p className={styles.bio}>Your personal job finder is here</p>
              <br />
              <input
                required
                autoComplete='current-mobile'
                type='email'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
              <br />
              <input
                required
                autoComplete='current-password'
                type='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
              <br />
              <br />
              <button>{loading ? 'Wait...' : 'Sign in'}</button>
              <br />
              <br />
              <p style={{ color: '#525252' }}>
                Don’t have an account?{' '}
                <Link
                  to={'/register'}
                  style={{ fontWeight: '700', color: 'black' }}
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
          <div className={styles.right_part}>
            {/* using image here  */}
            <p>Your Personal Job Finder</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
