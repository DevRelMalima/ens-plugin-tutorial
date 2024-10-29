import { Web3 } from 'web3';
import { Chain, EnsPlugin } from '@namespace-ens/web3-plugin-ens';

const web3 = new Web3('RPC_URL');
web3.registerPlugin(new EnsPlugin(Chain.Sepolia));
web3.eth.accounts.wallet.add('Youre_Private_Key');

const registrationRequest = {
    label: 'myname', // The domain label (e.g., myname for myname.eth)
    owner: '_your_wallet_address_',
    durationInSeconds: 31536000, // 1 year
    secret: 'random_secret_string',
    resolver: '0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63', // ENS PublicResolver
    setAsPrimary: true,
    fuses: 0
  };
  
  // Commit the registration request
  await web3.ens.commit(registrationRequest);
  
  // Wait at least 1 minute, then register
  setTimeout(async () => {
    await web3.ens.registerEnsDomain(registrationRequest);
    console.log('ENS domain registered successfully!');
  }, 60000);

  // Set text records for the ENS domain
await web3.ens.setTextRecords('malima.eth', [
    { key: 'email', value: 'samailamalima@gamil.com' },
    { key: 'twitter', value: '@_devrelmalima' }
  ], []);
  
  // Retrieve text records
  const records = await web3.ens.getTextRecords('myname.eth', ['email', 'twitter']);
  console.log(records);
  

// set and resolve an address for your ENS name
await web3.ens.setAddress('malima.eth', 'Your_Wallet_Address');
await web3.ens.getAddress('malima.eth');