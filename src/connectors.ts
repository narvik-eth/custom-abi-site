import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

const RPC_URLS = {
  80001: 'https://matic-mumbai.chainstacklabs.com',
};

export const network = new NetworkConnector({
  urls: { 80001: RPC_URLS[80001] },
  defaultChainId: 80001,
});

export const injected = new InjectedConnector({
  supportedChainIds: [80001],
});
