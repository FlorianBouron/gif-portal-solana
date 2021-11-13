## How to build the project
Start by installing the node packages with `yarn`:
```bash
yarn
```

Run:
```bash
yarn build
```

Access the program ID with the following command:
```bash
yarn keygen
```
Copy the key and paste it in `Anchor.toml` and `declare_id!` of `lib.rs`.

Run:
```bash
yarn build
```

Deploy it:
```bash
yarn deploy
```

## Useful scripts
Request Solana (SOL) on devnet
```bash
solana airdrop 5 INSERT_YOUR_PHANTOM_PUBLIC_ADDRESS_HERE  --url https://api.devnet.solana.com
```