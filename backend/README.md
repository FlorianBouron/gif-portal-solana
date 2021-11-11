## Handy command lines

Configure Solana locally
```bash
solana config set --url localhost
```

Configure Solana to devnet
```bash
solana config set --url devnet
```

Check your Solana configuration
```bash
solana config get
```

Get an aidrop of SOL
```bash
solana airdrop 5
```

Check balance
```bash
solana balance
```

Get program ID
```bash
solana address -k target/deploy/backend-keypair.json
```

## Anchor.toml configurations
In order to switch from localnet to devnet or vice-versa.
Change `[programs.localnet]` to `[programs.devnet]`.

Then, run:
```bash
anchor build
```
And change the `backend = ` line with your program ID.
Then, run:
```bash
anchor build
```