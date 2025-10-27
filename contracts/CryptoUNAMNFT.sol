// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CryptoUNAMNFT is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 private _nextTokenId = 1;

    // Estructura para almacenar información del perfil cripto
    struct CryptoProfile {
        string name;
        string cryptoType;
        string description;
        uint8 innovation;
        uint8 risk;
        uint8 community;
        uint8 technology;
        uint8 decentralization;
        string rarity;
        string investmentStyle;
        string riskTolerance;
        uint256 mintedAt;
    }

    // Mapeo de token ID a perfil cripto
    mapping(uint256 => CryptoProfile) public cryptoProfiles;
    
    // Mapeo de dirección a tokens minteados
    mapping(address => uint256[]) public ownerTokens;
    
    // Mapeo de tipo cripto a cantidad minteada
    mapping(string => uint256) public cryptoTypeCount;
    
    // Precio de minteo (en wei)
    uint256 public mintPrice = 0.001 ether;
    
    // Límite de NFTs por dirección
    uint256 public maxMintsPerAddress = 5;
    
    // Mapeo de dirección a cantidad minteada
    mapping(address => uint256) public addressMintCount;

    // Eventos
    event NFTCreated(
        uint256 indexed tokenId,
        address indexed owner,
        string cryptoType,
        string rarity
    );
    
    event ProfileUpdated(
        uint256 indexed tokenId,
        string cryptoType,
        string rarity
    );

    constructor() ERC721("CryptoUNAM Embajadores", "CUNFT") Ownable(msg.sender) {}

    /**
     * @dev Función para mintear un NFT con perfil cripto
     * @param to Dirección que recibirá el NFT
     * @param profile Datos del perfil cripto
     * @param metadataURI URI de los metadatos del NFT
     */
    function mintNFT(
        address to,
        CryptoProfile memory profile,
        string memory metadataURI
    ) public payable {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(addressMintCount[to] < maxMintsPerAddress, "Max mints per address exceeded");
        require(bytes(profile.name).length > 0, "Profile name cannot be empty");
        require(bytes(profile.cryptoType).length > 0, "Crypto type cannot be empty");

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        // Almacenar el perfil cripto
        cryptoProfiles[tokenId] = CryptoProfile({
            name: profile.name,
            cryptoType: profile.cryptoType,
            description: profile.description,
            innovation: profile.innovation,
            risk: profile.risk,
            community: profile.community,
            technology: profile.technology,
            decentralization: profile.decentralization,
            rarity: profile.rarity,
            investmentStyle: profile.investmentStyle,
            riskTolerance: profile.riskTolerance,
            mintedAt: block.timestamp
        });

        // Actualizar contadores
        ownerTokens[to].push(tokenId);
        cryptoTypeCount[profile.cryptoType]++;
        addressMintCount[to]++;

        // Mintear el NFT
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);

        emit NFTCreated(tokenId, to, profile.cryptoType, profile.rarity);
    }

    /**
     * @dev Función para obtener todos los NFTs de una dirección
     * @param owner Dirección del propietario
     * @return Array de token IDs
     */
    function getOwnerNFTs(address owner) public view returns (uint256[] memory) {
        return ownerTokens[owner];
    }

    /**
     * @dev Función para obtener información completa de un NFT
     * @param tokenId ID del token
     * @return Perfil cripto completo
     */
    function getNFTProfile(uint256 tokenId) public view returns (CryptoProfile memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return cryptoProfiles[tokenId];
    }

    /**
     * @dev Función para obtener todos los propietarios únicos
     * @return Array de direcciones de propietarios
     */
    function getAllOwners() public view returns (address[] memory) {
        uint256 totalSupply = totalSupply();
        address[] memory owners = new address[](totalSupply);
        
        for (uint256 i = 0; i < totalSupply; i++) {
            owners[i] = ownerOf(i);
        }
        
        return owners;
    }

    /**
     * @dev Función para obtener estadísticas de minteo por tipo cripto
     * @param cryptoType Tipo de cripto
     * @return Cantidad minteada de ese tipo
     */
    function getCryptoTypeStats(string memory cryptoType) public view returns (uint256) {
        return cryptoTypeCount[cryptoType];
    }

    /**
     * @dev Función para obtener estadísticas generales
     * @return totalSupplyCount Cantidad total de NFTs minteados
     * @return totalOwners Cantidad de propietarios únicos
     */
    function getStats() public view returns (uint256 totalSupplyCount, uint256 totalOwners) {
        totalSupplyCount = totalSupply();
        
        // Contar propietarios únicos
        address[] memory allOwners = getAllOwners();
        uint256 uniqueOwners = 0;
        
        for (uint256 i = 0; i < allOwners.length; i++) {
            bool isUnique = true;
            for (uint256 j = 0; j < i; j++) {
                if (allOwners[i] == allOwners[j]) {
                    isUnique = false;
                    break;
                }
            }
            if (isUnique) {
                uniqueOwners++;
            }
        }
        
        totalOwners = uniqueOwners;
    }

    /**
     * @dev Función para verificar si una dirección puede mintear más NFTs
     * @param user Dirección a verificar
     * @return canMint Si puede mintear
     * @return remaining Cantidad restante que puede mintear
     */
    function canUserMint(address user) public view returns (bool canMint, uint256 remaining) {
        uint256 currentCount = addressMintCount[user];
        canMint = currentCount < maxMintsPerAddress;
        remaining = maxMintsPerAddress > currentCount ? maxMintsPerAddress - currentCount : 0;
    }

    /**
     * @dev Función para obtener información de un propietario específico
     * @param owner Dirección del propietario
     * @return tokenIds Array de token IDs
     * @return profiles Array de perfiles cripto
     */
    function getOwnerInfo(address owner) public view returns (
        uint256[] memory tokenIds,
        CryptoProfile[] memory profiles
    ) {
        tokenIds = ownerTokens[owner];
        profiles = new CryptoProfile[](tokenIds.length);
        
        for (uint256 i = 0; i < tokenIds.length; i++) {
            profiles[i] = cryptoProfiles[tokenIds[i]];
        }
    }

    // Funciones de administración (solo owner)

    /**
     * @dev Función para cambiar el precio de minteo
     * @param newPrice Nuevo precio en wei
     */
    function setMintPrice(uint256 newPrice) public onlyOwner {
        mintPrice = newPrice;
    }

    /**
     * @dev Función para cambiar el límite de minteo por dirección
     * @param newLimit Nuevo límite
     */
    function setMaxMintsPerAddress(uint256 newLimit) public onlyOwner {
        maxMintsPerAddress = newLimit;
    }

    /**
     * @dev Función para retirar fondos del contrato
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        payable(owner()).transfer(balance);
    }

    // Funciones requeridas por las extensiones

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
