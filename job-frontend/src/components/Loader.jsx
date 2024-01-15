import React, { useContext } from 'react';
import { PropagateLoader } from 'react-spinners';
import { Context } from '..';

const Loader = () => {
  const { loading } = useContext(Context);

  return (
    <div
      style={{
        position: 'fixed',
        top: '70%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <PropagateLoader
        color={'#36d7b7'}
        loading={loading}
        size={20}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default Loader;
