import React from 'react';
import styles from '../styles/keyword.module.css';

const Keyword = ({ skill, setSkillsArr, id }) => {
  const handleCross = () => {
    setSkillsArr((prevSkillsArr) => {
      const updatedSkillsArr = [...prevSkillsArr];
      updatedSkillsArr.splice(id, 1);
      return updatedSkillsArr;
    });
    console.log(id);
  };
  return (
    <>
      <div className={styles.parent}>
        <span>{skill}</span>
        <div onClick={handleCross} className={styles.cross}>
          ╳
        </div>
      </div>
    </>
  );
};

const SkillBox = ({ skill }) => {
  return <div className={styles.skillbox}>{skill}</div>;
};

export { Keyword, SkillBox };
