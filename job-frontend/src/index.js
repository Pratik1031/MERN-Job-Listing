import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createContext } from 'react';

export const Context = createContext();

const Wrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [job_id, setJob_id] = useState('');

  const [company_name, setCompany_name] = useState('');
  const [company_logo, setCompany_logo] = useState('');
  const [job_position, setJob_position] = useState('');
  const [monthly_salary, setMonthly_salary] = useState('');
  const [job_type, setJob_type] = useState('');
  const [job_duration, setJob_duration] = useState('');
  const [remote_office, setRemote_office] = useState('');
  const [location, setLocation] = useState('');
  const [job_description, setJob_description] = useState('');
  const [about_company, setAbout_company] = useState('');
  const [skills, setSkills] = useState('');
  const [information, setInformation] = useState('');
  const [formEdit, setFormEdit] = useState(false);
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        job_id,
        setJob_id,
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
        formEdit,
        setFormEdit,
      }}
    >
      <App />
    </Context.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Wrapper></Wrapper>);
