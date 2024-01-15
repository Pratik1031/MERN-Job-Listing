import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/viewdetails.module.css';
import Navbar from './Navbar';
import salaryImg from '../assets/salaryImg.png';
import durationImg from '../assets/durationImg.png';
import axios from 'axios';
import { Context } from '..';
import { server } from '../App';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const Viewdetails = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setLoading,
    setFormEdit,
    job_id,
    setJob_id,
  } = useContext(Context);

  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getMyProfileApi = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/me`, {
        withCredentials: true,
      });
      setLoading(false);
      setUser(data.profile);
      setIsAuthenticated(true);
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
    }
  };

  const getSpecificJobApi = async () => {
    try {
      const { data } = await axios(`${server}/job/${id}`, {
        withCredentials: true,
      });
      setSkills(data.job.skills);
      setCompany(data.job);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEditBtn = (e) => {
    navigate(`/edit-job/${id}`);
    setJob_id(job_id);
    setFormEdit(true);
  };

  useEffect(() => {
    getMyProfileApi();
    getSpecificJobApi();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar name={user.name?.split(' ')[0]}></Navbar>
      <section className={styles.company_short_info}>
        {company.job_position} {company.job_type} job at {company.company_name}
      </section>

      <main className={styles.jobDetails}>
        <div className={styles.section_1}>
          <span className={styles.old}>1w ago</span>
          <span className={styles.dot}>.</span>
          <span className={styles.job_type}>{company.job_type}</span>
          <img src={company.company_logo} alt='company logo' />
          <span>{company.company_name}</span>
        </div>
        <br />
        <div className={styles.section_2}>
          <div>
            <h1>{company.job_position}</h1>
            <span>{company.location} | India</span>
          </div>
          {isAuthenticated ? (
            <button onClick={handleEditBtn}>Edit job</button>
          ) : null}
        </div>
        <br />
        <br />
        <div className={styles.section_3}>
          <div className={styles.salary}>
            <div className={styles.img_text}>
              <img src={salaryImg} alt='' />
              <span>Stipend</span>
            </div>
            <span>Rs {company.monthly_salary}/month</span>
          </div>
          <div className={styles.duration}>
            <div className={styles.img_text}>
              <img src={durationImg} alt='' />
              <span>Duration</span>
            </div>
            <span>{company.job_duration}</span>
          </div>
        </div>

        <br />
        <br />

        <div className={styles.section_4}>
          <h2>About Company</h2>
          <br />
          <span>{company.about_company}</span>
        </div>
        <br />
        <br />
        <div className={styles.section_5}>
          <h2>About the job/internship</h2>
          <br />
          <span>{company.job_description}</span>
        </div>

        <br />
        <br />

        <div className={styles.section_6}>
          <h2>Skill(s) required</h2>
          <br />
          <div className={styles.allSkills}>
            {skills
              ? skills.map((e, idx) => (
                  <div key={idx} className={styles.skills_div}>
                    {e}
                  </div>
                ))
              : null}
          </div>
        </div>

        <br />
        <br />

        <div className={styles.section_6}>
          <h2>Additional Information</h2>
          <br />
          <span>{company.information}</span>
        </div>
      </main>
    </div>
  );
};

export default Viewdetails;
