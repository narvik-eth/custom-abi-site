import React, { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import { useStorage } from '../hooks/useStorage';
import { ContractFunction } from './ContractFunction';

export const AbiForm = () => {
  const { library, chainId } = useWeb3React();
  const [abi, setAbi] = useState(localStorage.getItem('abi') || '');
  const [address, setAddress] = useState(localStorage.getItem('address') || '');
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined,
  );
  const [storage, setStorage] = useStorage();

  const changeAbi = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAbi(e.target.value);
    localStorage.setItem('abi', e.target.value);
  }, []);
  const blurAbi = useCallback(() => {
    if (chainId === undefined || address === '') return;
    const newStorage = { ...storage };
    newStorage[chainId] ||= {};
    newStorage[chainId][address] = abi;
    setStorage(newStorage);
  }, [chainId, address, abi, storage, setStorage]);

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
    try {
      const contract = new ethers.Contract(address, abi, provider.getSigner());
      setContract(contract);
    } catch {}
  }, [address, abi, library]);

  const deleteKey = useCallback(
    (key: string) => () => {
      if (chainId === undefined || address === '') return;
      const newStorage = Object.assign({}, storage);
      delete newStorage[chainId][key];
      setStorage(newStorage);
    },
    [chainId, address, storage, setStorage],
  );

  return (
    <>
      {chainId !== undefined && storage[chainId] !== undefined ? (
        <>
          <select className="select">
            {Object.keys(storage[chainId]).map((key) => {
              return (
                <option key={key} value={storage[chainId][key]}>
                  {key}
                </option>
              );
            })}
          </select>
          <ul>
            {Object.keys(storage[chainId]).map((key) => (
              <li {...{ key }}>
                <span onClick={deleteKey(key)}>
                  {key}
                  <i className="fas fa-trash" />
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Address</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={address}
                onChange={changeAddress}
                placeholder="address"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">ABI</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={abi}
                onChange={changeAbi}
                onBlur={blurAbi}
                placeholder="abi"
              />
            </div>
          </div>
        </div>
      </div>
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
