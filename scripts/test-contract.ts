import { ethers } from "hardhat";

async function main() {
  // Dirección del contrato desplegado en Sepolia
  const contractAddress = "0x401e5f040842f487c875aac83d164ad3d62e7b36";
  
  console.log("🔍 Probando contrato CryptoUNAM NFT...");
  
  // Conectar al contrato
  const contract = await ethers.getContractAt("CryptoUNAMNFT", contractAddress);
  
  // Obtener información básica del contrato
  console.log("\n📊 Información del contrato:");
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const mintPrice = await contract.mintPrice();
  
  console.log("   Nombre:", name);
  console.log("   Símbolo:", symbol);
  console.log("   Suministro total:", totalSupply.toString());
  console.log("   Precio de minteo:", ethers.formatEther(mintPrice), "ETH");
  
  // Obtener estadísticas
  const [totalNFTs, totalOwners] = await contract.getStats();
  console.log("\n📈 Estadísticas:");
  console.log("   Total NFTs:", totalNFTs.toString());
  console.log("   Total propietarios:", totalOwners.toString());
  
  // Obtener todos los propietarios
  const allOwners = await contract.getAllOwners();
  console.log("\n👥 Propietarios:");
  allOwners.forEach((owner, index) => {
    console.log(`   ${index + 1}. ${owner}`);
  });
  
  // Ejemplo de perfil cripto para minteo
  const exampleProfile = {
    name: "Bitcoin Maximalist",
    cryptoType: "bitcoin-maximalist",
    description: "Crees firmemente en Bitcoin como la única criptomoneda necesaria.",
    innovation: 3,
    risk: 2,
    community: 7,
    technology: 4,
    decentralization: 9,
    rarity: "rare",
    investmentStyle: "HODL a largo plazo",
    riskTolerance: "conservative"
  };
  
  console.log("\n🎯 Ejemplo de perfil para minteo:");
  console.log("   Tipo:", exampleProfile.cryptoType);
  console.log("   Rareza:", exampleProfile.rarity);
  console.log("   Estilo de inversión:", exampleProfile.investmentStyle);
  
  // Verificar estadísticas por tipo cripto
  const bitcoinCount = await contract.getCryptoTypeStats("bitcoin-maximalist");
  console.log("\n📊 NFTs minteados por tipo:");
  console.log("   Bitcoin Maximalist:", bitcoinCount.toString());
  
  console.log("\n✅ Pruebas completadas!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
