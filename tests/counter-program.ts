import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CounterProgram } from "../target/types/counter_program";

describe("counter-program", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.counterProgram as Program<CounterProgram>;

  const counter = anchor.web3.Keypair.generate();
  //console.log("counter", counter.publicKey.toBase58());
  const counterPubkey = "8fBUStiXCPUEit1hT3fcAZVagubhxqR4hqqKT6FxeiBH";

  it("Is initialized!", async () => {
    const tx = await program.methods.initialize().accounts({
      counter: counter.publicKey,
    }).signers([counter]).rpc();
    console.log("Your transaction signature", tx);
  });

  it("Is incremented!", async () => {
    const tx = await program.methods.increment().accounts({
      counter: counterPubkey,
    }).rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch counter", async () => {
    const counterAccount = await program.account.counter.fetch(counterPubkey);
    console.log("counterAccount", counterAccount);
  })
});
