const { create } = require("@web3-storage/w3up-client");

const start = async () => {
  const client = await create();

  await client.setCurrentSpace(
    "did:key:z6MknvgByK1c33Lneb5a4XRE9ZcbF65nrUiytGWNsF9Da9r3"
  );
};

start();
