# Space Station
### Branches
**THIS IS THE PRODUCTION BRANCH. THIS BRANCH WILL NOT WORK FOR YOUR DEPLOYMENTS WITHOUT CUSTIMIZATION. PLEASE USE THE MAIN BRANCH**

## Overview
Web application for bridging assets to & from Ethereum & Gravity Bridge. This is a fork of Space Station by Cosmostation, now maintained, managed and updated by Chanddra Station (so many stations). 

## Deploy your own
One of the main focuses of our fork is to allow any end user to fork the application and launch it locally so anyone can bridge assets easily regardless of if Chandra Stations front end is up.

*1 Fork the repo
*2 Enable Github Pages on your fork
*3 Update the `package.json` file with your homepage address. It will be `https://<your_github_username>.gitthub.io/space-station`
*4 Once you create a pull request and merge it the application will build and deploy itself to the endpoint above

### Rate Limiting
Your deployment will be heavily rate limited. We are pulling gas estimates from Ether Scan and token prices from either CoinGecko or Coin Maraket Cap in addition to the gravity chain api. The deployment managed by Chandra Station is less rate limited.

## Gravity Bridge
### Contract Info
#### Gravity Bridge Contract
* Ethereum: [0xa4108aA1Ec4967F8b52220a4f7e94A8201F2D906](https://etherscan.io/address/0xa4108aA1Ec4967F8b52220a4f7e94A8201F2D906)
* Goerli: [0xace45Cd2d490a0A180e50144D8dd0c7EB9A4215f](https://goerli.etherscan.io/address/0xace45Cd2d490a0A180e50144D8dd0c7EB9A4215f)

#### Deployments
* Chihuahua Huahua: https://etherscan.io/tx/0xcc7f2466f479acdf46c72e369bc8d1f9219c4e0db7e3f77eddf65d2e9adbd8e4
* Stargaze Star: https://etherscan.io/tx/0x31d208ec2e310123187be448151b0c44124b4dd453efbe271a6a91e6033f2717
* Cosmos Atom: https://etherscan.io/tx/0x50b17862b4821a573e6a2899cee92a472484993dcbceb29e4e0b1acb80d7d493
* Comdex Comdex: https://etherscan.io/tx/0xd9216a20e4a7b073334a3fcf42c0554888fd6784ed5573e2f0a0de82d86a1280
* cheqd Cheq: https://etherscan.io/tx/0x2dfa2f824f3307ab5657707de5491c7406fa0dc475ad9378b6f47420c3696103
* Nyx NYM: https://etherscan.io/tx/0xa0ad4a72d9a28a8eb6269d2676431bf1ed0944ad5cd0e4b941ab4da91cb663c5

## Add New Chain
Please refer to this [PR](https://github.com/cosmostation/space-station/pull/12)
