import React, { useContext } from 'react';
import styles from '../styles/navbar.module.css';
import helmentMan from '../assets/helmetMan.png';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../App';
import axios from 'axios';
import { Context } from '../index';
import toast from 'react-hot-toast';

const Navbar = ({ name }) => {
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, setLoading } =
    useContext(Context);

  const logoutApi = async () => {
    try {
      const { data } = await axios.get(`${server}/logout`, {
        withCredentials: true,
      });
      setLoading(false);
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      setIsAuthenticated(true);
      toast.error(error.response.data.message);
    }
  };

  return (
    <header className={styles.header}>
      <p className={styles.logo}>Jobfinder</p>
      <div
        className={`${styles.buttons} ${
          isAuthenticated ? styles.logoutWidth : styles.btnWidth
        }`}
      >
        {isAuthenticated ? (
          <>
            <Link onClick={() => logoutApi()} className={styles.logout}>
              Logout
            </Link>
            <span className={styles.greet}>Hello! {name}</span>
            <img className={styles.recruiter_img} src={helmentMan} alt='' />
          </>
        ) : (
          <>
            <button className={styles.login} onClick={() => navigate('/login')}>
              Login
            </button>
            <button
              className={styles.register}
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
