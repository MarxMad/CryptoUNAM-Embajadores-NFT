import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Desplegando contrato CryptoUNAM NFT...");

  // Obtener el contrato factory
  const CryptoUNAMNFT = await ethers.getContractFactory("CryptoUNAMNFT");

  // Desplegar el contrato
  const cryptoUNAMNFT = await CryptoUNAMNFT.deploy();

  // Esperar a que se despliegue
  await cryptoUNAMNFT.waitForDeployment();

  const contractAddress = await cryptoUNAMNFT.getAddress();
  
  console.log("✅ Contrato desplegado exitosamente!");
  console.log("📍 Dirección del contrato:", contractAddress);
  console.log("🔗 Red:", "Sepolia Testnet");
  
  // Verificar información del contrato
  const name = await cryptoUNAMNFT.name();
  const symbol = await cryptoUNAMNFT.symbol();
  const mintPrice = await cryptoUNAMNFT.mintPrice();
  const maxMintsPerAddress = await cryptoUNAMNFT.maxMintsPerAddress();
  
  console.log("\n📋 Información del contrato:");
  console.log("   Nombre:", name);
  console.log("   Símbolo:", symbol);
  console.log("   Precio de minteo:", ethers.formatEther(mintPrice), "ETH");
  console.log("   Máximo minteos por dirección:", maxMintsPerAddress.toString());
  
  console.log("\n🎯 Próximos pasos:");
  console.log("   1. Copia la dirección del contrato:", contractAddress);
  console.log("   2. Actualiza el frontend con esta dirección");
  console.log("   3. Verifica el contrato en Etherscan (opcional)");
  
  return contractAddress;
}

// Ejecutar el script
main()
  .then((contractAddress) => {
    console.log("\n🎉 ¡Despliegue completado!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error durante el despliegue:", error);
    process.exit(1);
  });
