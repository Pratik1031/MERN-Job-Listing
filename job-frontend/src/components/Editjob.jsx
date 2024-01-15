import React, { useContext, useEffect, useRef } from 'react';
import styles from '../styles/addJob.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import axios from 'axios';
import { server } from '../App';
import toast from 'react-hot-toast';

const Editjob = () => {
  const {
    company_name,
    setCompany_name,
    company_logo,
    setCompany_logo,
    job_position,
    setJob_position,
    monthly_salary,
    setMonthly_salary,
    job_type,
    setJob_type,
    job_duration,
    setJob_duration,
    remote_office,
    setRemote_office,
    location,
    setLocation,
    job_description,
    setJob_description,
    about_company,
    setAbout_company,
    skills,
    setSkills,
    information,
    setInformation,
    setLoading,
    setIsAuthenticated,
    job_id,
    loading,
  } = useContext(Context);

  const formRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const getSpecificJobApi = async () => {
    try {
      const { data } = await axios(`${server}/job/${id}`, {
        withCredentials: true,
      });
      setCompany_name(data.job.company_name);
      setCompany_logo(data.job.company_logo);
      setJob_position(data.job.job_position);
      setMonthly_salary(data.job.monthly_salary);
      setJob_type(data.job.job_type);
      setJob_duration(data.job.job_duration);
      setRemote_office(data.job.remote_office);
      setLocation(data.job.location);
      setJob_description(data.job.job_description);
      setAbout_company(data.job.about_company);
      setSkills(data.job.skills);
      setInformation(data.job.information);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const SaveJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(
        `${server}/update-job/${id}`,
        {
          company_name,
          company_logo,
          job_position,
          monthly_salary,
          job_type,
          job_duration,
          remote_office,
          location,
          job_description,
          about_company,
          skills,
          information,
        },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setIsAuthenticated(true);
      setLoading(false);
      formRef.current.reset();
      toast.success(data.message);
      navigate('/');
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getSpecificJobApi();
  }, [job_id]);

  return (
    <div className={styles.container}>
      <div className={styles.left_part}>
        <form ref={formRef} onSubmit={SaveJob} className={styles.form}>
          <p className={styles.heading}>Edit job description</p>
          <br />
          <div className={styles.pAndInput}>
            <p>Company Name</p>
            <input
              value={company_name}
              required
              type='text'
              name='company_name'
              onChange={(e) => setCompany_name(e.target.value)}
              placeholder='Enter your company name here'
            />
          </div>
          <div className={styles.pAndInput}>
            <p>Add logo URL</p>
            <input
              value={company_logo}
              required
              type='text'
              name='company_logo'
              onChange={(e) => setCompany_logo(e.target.value)}
              placeholder='Enter the link'
            />
          </div>
          <div className={styles.pAndInput}>
            <p>Job position</p>
            <input
              value={job_position}
              required
              type='text'
              name='job_position'
              onChange={(e) => setJob_position(e.target.value)}
              placeholder='Enter job position'
            />
          </div>
          <div className={styles.pAndInput}>
            <p>Monthly salary</p>
            <input
              value={monthly_salary}
              required
              type='text'
              name='monthly_salary'
              onChange={(e) => setMonthly_salary(e.target.value)}
              placeholder='Enter Amount in rupees'
            />
          </div>
          <div className={styles.pAndSelect}>
            <p>Job Type</p>
            <select
              value={job_type}
              required
              name='job_type'
              onChange={(e) => setJob_type(e.target.value)}
            >
              <option value=''>Select</option>
              <option value='full-time'>Full Time</option>
              <option value='part-time'>Part Time</option>
            </select>
          </div>
          <div className={styles.pAndSelect}>
            <p>Duration</p>
            <select
              value={job_duration}
              required
              name='job_duration'
              onChange={(e) => setJob_duration(e.target.value)}
            >
              <option value=''>Select</option>
              <option value='6 month'>6 month</option>
              <option value='1 year'>1 year</option>
              <option value='2 year'>2 year</option>
            </select>
          </div>
          <div className={styles.pAndSelect}>
            <p>Remote/office</p>
            <select
              value={remote_office}
              required
              name='remote_office'
              onChange={(e) => setRemote_office(e.target.value)}
            >
              <option value=''>Select</option>
              <option value='remote'>Remote</option>
              <option value='office'>Office</option>
            </select>
          </div>
          <div className={styles.pAndInput}>
            <p>Location</p>
            <input
              value={location}
              required
              type='text'
              name='location'
              onChange={(e) => setLocation(e.target.value)}
              placeholder='Enter Location'
            />
          </div>
          <div className={styles.pAndInput}>
            <p>Job Description</p>
            <textarea
              value={job_description}
              rows={4}
              className={styles.textArea}
              required
              type='text'
              name='job_description'
              onChange={(e) => setJob_description(e.target.value)}
              placeholder='Enter Location'
            />
          </div>
          <div className={styles.pAndInput}>
            <p>About Company</p>
            <textarea
              value={about_company}
              rows={4}
              className={styles.textArea}
              required
              type='text'
              name='about_company'
              onChange={(e) => setAbout_company(e.target.value)}
              placeholder='Type about your company'
            />
          </div>
          <div className={styles.pAndInput}>
            <p>Skills Required</p>
            <input
              value={skills}
              required
              type='text'
              name='skills'
              onChange={(e) => setSkills(e.target.value)}
              placeholder='Enter the must have skills'
            />
          </div>
          <div className={styles.pAndInput}>
            <p>Information</p>
            <input
              value={information}
              required
              type='text'
              name='information'
              onChange={(e) => setInformation(e.target.value)}
              placeholder='Enter the additional information'
            />
          </div>
          <button>{loading ? 'Saving...' : 'Save'}</button>
          <input onClick={() => navigate('/')} type='button' value='Cancel' />
        </form>
      </div>
      <div className={styles.right_part}>
        {/* using image here  */}
        <p>Recruiter edit job details here</p>
      </div>
    </div>
  );
};

export default Editjob;
