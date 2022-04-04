import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  3: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  5: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  10: 'https://mainnet.optimism.io/',
  42: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  137: 'https://polygon-rpc.com/',
  250: 'https://rpc.ftm.tools',
  420: 'https://goerli.optimism.io/',
  42161: 'https://arb1.arbitrum.io/rpc',
  43114: 'https://api.avax.network/ext/bc/C/rpc',
  80001: 'https://matic-mumbai.chainstacklabs.com',
  421611: 'https://rinkeby.arbitrum.io/rpc',
  1666600000: 'https://api.harmony.one',
  1666700000: 'https://api.s0.b.hmny.io',
};

export const SCAN_EXPLORER: {
  [key: number]: string;
} = {
  1: 'https://etherscan.io',
  3: 'https://ropsten.etherscan.io',
  4: 'https://rinkeby.etherscan.io',
  5: 'https://goerli.etherscan.io',
  10: 'https://optimistic.etherscan.io',
  42: 'https://kovan.etherscan.io',
  56: 'https://bscscan.com',
  97: 'https://testnet.bscscan.com',
  137: 'https://polygonscan.com',
  250: 'https://ftmscan.com',
  420: 'https://optimism.io',
  42161: 'https://arbiscan.io',
  43114: 'https://snowtrace.io',
  80001: 'https://mumbai.polygonscan.com',
  421611: 'https://rinkeby-explorer.arbitrum.io',
  1666600000: 'https://explorer.harmony.one',
  1666700000: 'https://explorer.pops.one',
};

export const network = new NetworkConnector({
  urls: RPC_URLS,
  defaultChainId: 80001,
});

export const injected = new InjectedConnector({
  supportedChainIds: Object.keys(RPC_URLS).map((key) => parseInt(key, 10)),
});
