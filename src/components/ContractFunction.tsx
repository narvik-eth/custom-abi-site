import React, { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import { SCAN_EXPLORER } from '../connectors';

const parseFunctionArgs = (name: string) => {
  let args = name.split('(')[1];
  if (args === undefined) return [];
  args = args.split(')')[0];
  if (args.length === 0) return [];
  return args.split(',');
};

export const ContractFunction: React.FC<{
  name: string;
  contract: ethers.Contract;
}> = ({ name, contract }) => {
  const [resp, setResp] = useState('');
  const [args, setArgs] = useState<string[]>([]);
  const { chainId } = useWeb3React();

  const onCall = useCallback(() => {
    if (chainId === undefined) return;

    contract[name](...args).then((resp: any) => {
      try {
        setResp(`${SCAN_EXPLORER[chainId]}/tx/${resp.hash}`);
        resp.wait();
      } catch {
        try {
          setResp(resp.toString());
        } catch {
          setResp(resp);
        }
      }
    });
  }, [contract, name, args, chainId]);

  const changeArgs = useCallback(
    (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newArgs = [...args];
      newArgs[i] = e.target.value;
      setArgs(newArgs);
    },
    [args],
  );

  if (!(name.includes('(') && name.includes(')'))) return null;

  return (
    <div>
      <hr />
      <h2 className="subtitle">{name}</h2>
      <span>
        <div className="columns">
          {parseFunctionArgs(name).map((arg, i) => (
            <div key={`${name}-${i}`} className="column">
              <input
                className="input"
                value={args[i]}
                onChange={changeArgs(i)}
                type="text"
              />
            </div>
          ))}
        </div>
        <button
          className="button is-link"
          onClick={onCall}
          style={{ marginTop: '10px' }}
        >
          Call
        </button>
      </span>
      {resp !== '' ? (
        <pre style={{ marginTop: '10px' }}>
          <code>{resp}</code>
        </pre>
      ) : null}
    </div>
  );
};
