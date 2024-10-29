import { Web3 } from 'web3';
import { Chain, EnsPlugin } from '@namespace-ens/web3-plugin-ens';

// your Ethereum node RPC URL (e.g., Alchemy)
const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/NM40N05dKxMaIcSXMNw81-FOThQ07dxc');

// Register the ENS Plugin
web3.registerPlugin(new EnsPlugin(Chain.Sepolia)); // Use Chain.Mainnet for Mainnet

// Ethereum private key for private connections
web3.eth.accounts.wallet.add('0x9673488150c05380c2d245a4b7926252132489ecc9f19fd3513e926993cce2d1');

// Example function to register an ENS domain
async function registerEnsDomain() {
  const registrationRequest = {
    label: 'malima', // The domain label (e.g., myname for myname.eth)
    owner: '0x3D054C3CB85c9044421a4b5FC9c2A10478b26Ed7',
    durationInSeconds: 31536000, // 1 year
    secret: 'random_secret_string',
    resolver: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41', // ENS PublicResolver
    setAsPrimary: true,
    fuses: 0
  };

  // Commit the registration request
  await web3.ens.commit(registrationRequest);

  console.log('Commit submitted. Waiting 1 minute before registration...');

  // Wait at least 1 minute before proceeding with the registration
  setTimeout(async () => {
    await web3.ens.registerEnsDomain(registrationRequest);
    console.log('ENS domain registered successfully!');
  }, 60000);
}

// Call the function to register the ENS domain
registerEnsDomain().catch(console.error);
