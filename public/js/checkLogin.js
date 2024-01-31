
// window.addEventListener('load', handleUpdated);

detectEthereumProvider().then(async (provider) => {

  if (provider) {
    startApp(provider); // Initialize your app
  } else {
    console.log('Please install MetaMask!');
  }
})

let userSeen = null;
let currentAccount = null;

function startApp(provider) {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }

  ethereum
    .request({ method: 'eth_accounts' })
    .then((accounts) => {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        // Do any other work!
        console.log(currentAccount)

        console.log('cookies:')
        document.cookie = `auth=${currentAccount}`;
        console.log(document.cookie)
      }
    })
    .catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
    });

  console.log(provider)
  // Access the decentralized web!
  const currElem = document.getElementById('currAcc');
  currElem.innerText = currentAccount;
}

ethereum.on('accountsChanged', (accounts) => {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // Do any other work!
    console.log(currentAccount)

    console.log('cookies:')
    document.cookie = `auth=${currentAccount}`;
    console.log(document.cookie)
  }
  const currElem = document.getElementById('currAcc');
  currElem.innerText = currentAccount;
} );

function validateForm() {
  let x = document.getElementById('detailsConfirmation').value;
  if (x === "NO") {
    alert("Please fill the details carefully ");
    return false;
  }
}


