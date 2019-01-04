# Deploying Smart Contract on AION

> Handy code to deploy Smart Contract on [AION]: https://aion.network blockchain.

## Getting Started

- Install Dependencies using `npm install`
- Run `index.js` file using `npm run start`

### NOTE:

Be sure to add your own credentials into a `credentials.js` file with the following variables.

- `PRIVATE_KEY` Either create a wallet programatically, or use [AIWA]: https://getaiwa.com to create a wallet and then grab testnet Aion from the [faucet]: https://faucets.blockxlabs.com/aion
- `NODESMITH_API` Use Nodesmith to obtain an endpoint to access the blockchain [here]: https://nodesmith.io/

Example 

```
export const PRIVATE_KEY = [YOUR_PRIVATE_KEY];
export const NODESMITH_API = [YOUR_NODESMITH_API_URL_WITH_KEY]
```
