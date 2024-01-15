import React, { useState } from 'react';
import styles from '../styles/register.module.css';
import { Link, Navigate } from 'react-router-dom';
import { server } from '../App';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { Context } from '../index';

const Register = () => {
  const { loading, setLoading, isAuthenticated, setIsAuthenticated } =
    useContext(Context);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const registerHandler = async (e) => {
    e.preventDefault();
    localStorage.setItem('Name', name);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/register`,
        { name, email, mobile, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
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
        <div className={styles.left_part}>
          <form onSubmit={registerHandler} className={styles.form}>
            <p className={styles.create_accnt}>Create an account</p>
            <p className={styles.bio}>Your personal job finder is here</p>
            <br />
            <input
              required
              type='text'
              name='name'
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
            />
            <br />
            <input
              required
              type='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            />
            <br />
            <input
              required
              autoComplete='current-mobile'
              type='text'
              name='mobile'
              onChange={(e) => setMobile(e.target.value)}
              placeholder='Mobile'
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
            <span>
              <input
                required
                type='checkbox'
                name='checkbox'
                style={{ marginRight: '10px', color: '#525252' }}
              />
              By creating an account, I agree to our terms of use and privacy
              policy
            </span>
            <br />
            <br />
            <button>{loading ? 'Creating...' : 'Create Account'}</button>
            <br />
            <br />
            <p style={{ color: '#525252' }}>
              Already have an account?{' '}
              <Link to={'/login'} style={{ fontWeight: '700', color: 'black' }}>
                Sign In
              </Link>
            </p>
          </form>
        </div>
        <div className={styles.right_part}>
          {/* using image here  */}
          <p>Your Personal Job Finder</p>
        </div>
      </div>
    </>
  );
};

export default Register;
