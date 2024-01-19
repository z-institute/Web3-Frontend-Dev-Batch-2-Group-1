const hre = require("hardhat");

async function main() {
  await hre.run("compile");

  const SoulFactory = await hre.ethers.getContractFactory("SoulFactory");
  const soulFactory = await SoulFactory.deploy();

  await soulFactory.waitForDeployment();

  console.log(`SoulFactory deployed to ${soulFactory.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
