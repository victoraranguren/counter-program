import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CounterProgram } from "../target/types/counter_program";
import { assert } from 'chai';
import * as programClient from "../clients/js/src/generated";
import { address, createSolanaRpc } from "@solana/kit";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
describe("counter-program", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.counterProgram as Program<CounterProgram>;

  const counter = anchor.web3.Keypair.generate();
  console.log("counter pb", counter.publicKey.toBase58());
  console.log("counter pv", counter.secretKey.toString());
  const counterPubkey = "84YBdMzM9qLxQVZ3RcAenoBKt4pzvWxhAzWE1BeYWgX6";

  it("Is initialized!", async () => {
    const tx = await program.methods.initialize().accounts({
      counter: counter.publicKey,
    }).signers([counter]).rpc();
    console.log("Your transaction signature", tx);
  });

  // it("Is incremented!", async () => {
  //   const tx = await program.methods.increment().accounts({
  //     counter: counterPubkey,
  //   }).rpc();
  //   console.log("Your transaction signature", tx);
  // });

  it("Fetch counter", async () => {
    const rpcLegacy = createSolanaRpc(anchor.AnchorProvider.env().connection.rpcEndpoint)

    const counterAccount = await programClient.fetchCounter(rpcLegacy, address(counter.publicKey.toBase58()));
    console.log("counterAccount", counterAccount);
  })
});
