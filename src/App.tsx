import React from 'react';
import { useWeb3React } from '@web3-react/core';

import { Navbar } from './components/Navbar';
import { AbiForm } from './components/AbiForm';

export const App = () => {
  const { active } = useWeb3React();

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <h1 className="title">Custom ABI</h1>
          {active ? <AbiForm /> : null}
        </div>
      </section>
    </>
  );
};
