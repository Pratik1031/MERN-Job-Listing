import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/home.module.css';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../assets/searchIcon.png';
import { Keyword } from './Keyword';
import Jobcards from './Jobcards';

import { Context } from '..';
import axios from 'axios';
import { server } from '../App';
import toast from 'react-hot-toast';
import Loader from './Loader';
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    setCompany_name,
    setCompany_logo,
    setJob_position,
    setMonthly_salary,
    setJob_type,
    setJob_duration,
    setRemote_office,
    setLocation,
    setJob_description,
    setAbout_company,
    setSkills,
    setInformation,
    setFormEdit,
  } = useContext(Context);

  const [job_title, setJob_title] = useState('');
  const [skillsArr, setSkillsArr] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState({});

  const searchJobApi = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/searchJob`,
        { job_position: job_title, skills: skillsArr },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setLoading(false);
      setJobs(data.jobs);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const getAllJobsApi = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/getAllJobs`, {
        withCredentials: true,
      });

      setLoading(false);
      setJobs(data.jobs);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

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

  const addSkills = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill !== '') {
      if (!skillsArr.includes(selectedSkill)) {
        setSkillsArr([...skillsArr, selectedSkill]);
      }
    }
  };

  const goToAddJobPage = () => {
    setCompany_name('');
    setCompany_logo('');
    setJob_position('');
    setMonthly_salary('');
    setJob_type('');
    setJob_duration('');
    setRemote_office('');
    setLocation('');
    setJob_description('');
    setAbout_company('');
    setSkills('');
    setInformation('');
    setFormEdit(false);
    navigate('/add-job');
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    const inputValue = e.target.parentElement.querySelector('input').value;

    if (inputValue.length === 0 && skillsArr.length === 0) {
      return getAllJobsApi();
    }

    setJob_title(inputValue);
    searchJobApi();
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick(e);
    }
  };

  useEffect(() => {
    if (job_title.length === 0 && skillsArr.length === 0) {
      getAllJobsApi();
    } else {
      searchJobApi();
    }
  }, [skillsArr]);

  useEffect(() => {
    getMyProfileApi();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Navbar name={user.name?.split(' ')[0]}></Navbar>

        <main className={styles.main}>
          <div className={styles.searchArea}>
            <div className={styles.search}>
              <img
                onClick={handleSearchClick}
                src={searchIcon}
                alt=''
                role='button'
              />
              <input
                onChange={(e) => setJob_title(e.target.value)}
                value={job_title}
                onKeyDown={handleEnterPress}
                type='text'
                placeholder='Type any job title'
              />
            </div>
            <div className={styles.wrapper}>
              <select
                onChange={addSkills}
                className={styles.select}
                name='Skills'
                value={skillsArr.join(',')}
              >
                <option value=''>Skills</option>
                <option value='html'>HTML</option>
                <option value='css'>CSS</option>
                <option value='javascript'>JavaScript</option>
                <option value='react'>React</option>
                <option value='nodejs'>NodeJs</option>
                <option value='express'>Express</option>
                <option value='mongodb'>MongoDB</option>
                <option value='python'>python</option>
              </select>
              <div className={styles.keywords}>
                {skillsArr
                  ? skillsArr.map((skill, idx) => (
                      <Keyword
                        id={idx}
                        setSkillsArr={setSkillsArr}
                        key={idx}
                        skill={skill}
                      ></Keyword>
                    ))
                  : null}
              </div>
              {isAuthenticated ? (
                <button onClick={goToAddJobPage} className={styles.addjob}>
                  + Add Job
                </button>
              ) : null}
              <p
                onClick={() => {
                  setSkillsArr([]);
                  setJob_title('');
                }}
                className={styles.clear}
              >
                Clear
              </p>
            </div>
          </div>
          <br />
          <br />

          {loading ? (
            <Loader />
          ) : (
            <>
              {jobs
                ? jobs.map((e, idx) => (
                    <Jobcards
                      key={idx}
                      id={e._id}
                      position={e.job_position}
                      name={e.company_name}
                      logo={e.company_logo}
                      salary={e.monthly_salary}
                      location={e.location}
                      remote_office={e.remote_office}
                      type={e.job_type}
                      skills={e.skills}
                    ></Jobcards>
                  ))
                : null}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
