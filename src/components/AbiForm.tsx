import React, { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import { ContractFunction } from './ContractFunction';

export const AbiForm = () => {
  const { library } = useWeb3React();
  const [abi, setAbi] = useState(localStorage.getItem('abi') || '');
  const [address, setAddress] = useState(localStorage.getItem('address') || '');
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined,
  );

  const changeAbi = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('abi', e.target.value);
    setAbi(e.target.value);
  }, []);
  const changeAddress = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      localStorage.setItem('address', e.target.value);
      setAddress(e.target.value);
    },
    [],
  );
  useEffect(() => {
    if (address === '' || abi === '') return;
    const provider = new ethers.providers.Web3Provider(library.provider);
    setContract(new ethers.Contract(address, abi, provider.getSigner()));
  }, [address, abi, library]);

  return (
    <>
      <input
        type="text"
        value={address}
        onChange={changeAddress}
        placeholder="address"
      />
      <input type="text" value={abi} onChange={changeAbi} placeholder="abi" />
      <div>
        {contract !== undefined
          ? Object.keys(contract.functions)
              .sort()
              .map((name) => (
                <ContractFunction key={name} name={name} contract={contract} />
              ))
          : null}
      </div>
    </>
  );
};
