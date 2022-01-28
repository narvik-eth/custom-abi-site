import React from 'react';
import { useWeb3React } from '@web3-react/core';

import { AbiForm } from './components/AbiForm';
import { Connect } from './components/Connect';

export const App = () => {
  const { active } = useWeb3React();

  return (
    <>
      <div>Custom ABI</div>
      <Connect />
      {active ? <AbiForm /> : null}
    </>
  );
};
