import React, { useCallback, useState } from 'react';
import { ethers } from 'ethers';

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

  const onCall = useCallback(() => {
    contract[name](...args).then((resp: any) => {
      try {
        setResp(resp.hash);
        resp.wait();
      } catch {
        try {
          setResp(resp.toString());
        } catch {
          setResp(resp);
        }
      }
    });
  }, [contract, name, args]);

  const changeArgs = useCallback(
    (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newArgs = [...args];
      newArgs[i] = e.target.value;
      setArgs(newArgs);
    },
    [args],
  );

  if (!(name.includes('(') && name.includes(')'))) return null;
  console.log(args);

  return (
    <div>
      <span>{name}</span>
      <span>
        {parseFunctionArgs(name).map((arg, i) => (
          <input
            key={`${name}-${i}`}
            value={args[i]}
            onChange={changeArgs(i)}
            type="text"
          />
        ))}
        <button onClick={onCall}>call</button>
        <span>{resp}</span>
      </span>
    </div>
  );
};
