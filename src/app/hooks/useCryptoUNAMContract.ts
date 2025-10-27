'use client';

import { useWriteContract, useReadContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

// ABI completo del contrato desplegado
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ERC721EnumerableForbiddenBatchMint",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "ERC721OutOfBoundsIndex",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cryptoType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint8",
						"name": "innovation",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "risk",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "community",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "technology",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "decentralization",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "rarity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "investmentStyle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "riskTolerance",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "mintedAt",
						"type": "uint256"
					}
				],
				"internalType": "struct CryptoUNAMNFT.CryptoProfile",
				"name": "profile",
				"type": "tuple"
			},
			{
				"internalType": "string",
				"name": "metadataURI",
				"type": "string"
			}
		],
		"name": "mintNFT",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "cryptoType",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "rarity",
				"type": "string"
			}
		],
		"name": "NFTCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "cryptoType",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "rarity",
				"type": "string"
			}
		],
		"name": "ProfileUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newLimit",
				"type": "uint256"
			}
		],
		"name": "setMaxMintsPerAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			}
		],
		"name": "setMintPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressMintCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "canUserMint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "canMint",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "cryptoProfiles",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cryptoType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "innovation",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "risk",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "community",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "technology",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "decentralization",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "rarity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "investmentStyle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "riskTolerance",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "mintedAt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "cryptoTypeCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllOwners",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "cryptoType",
				"type": "string"
			}
		],
		"name": "getCryptoTypeStats",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getNFTProfile",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cryptoType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint8",
						"name": "innovation",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "risk",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "community",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "technology",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "decentralization",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "rarity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "investmentStyle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "riskTolerance",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "mintedAt",
						"type": "uint256"
					}
				],
				"internalType": "struct CryptoUNAMNFT.CryptoProfile",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "getOwnerInfo",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cryptoType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint8",
						"name": "innovation",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "risk",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "community",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "technology",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "decentralization",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "rarity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "investmentStyle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "riskTolerance",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "mintedAt",
						"type": "uint256"
					}
				],
				"internalType": "struct CryptoUNAMNFT.CryptoProfile[]",
				"name": "profiles",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "getOwnerNFTs",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStats",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalSupplyCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalOwners",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxMintsPerAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mintPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ownerTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] as const;

// Dirección del contrato desplegado en Sepolia
const CONTRACT_ADDRESS = '0x401e5f040842f487c875aac83d164ad3d62e7b36';

export interface ContractProfile {
  name: string;
  cryptoType: string;
  description: string;
  innovation: number;
  risk: number;
  community: number;
  technology: number;
  decentralization: number;
  rarity: string;
  investmentStyle: string;
  riskTolerance: string;
  mintedAt: bigint;
}

export function useCryptoUNAMContract() {
  const { address, isConnected } = useAccount();
  const [isMinting, setIsMinting] = useState(false);

  // Hook para escribir al contrato (mintear)
  const { writeContract, data: writeData, isPending: isMintingContract } = useWriteContract();

  // Leer precio de minteo
  const { data: mintPrice } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'mintPrice',
  });

  // Leer máximo de minteos por dirección
  const { data: maxMintsPerAddress } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'maxMintsPerAddress',
  });

  // Leer cantidad de minteos del usuario actual
  const { data: userMintCount, refetch: refetchUserMintCount } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'addressMintCount',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Leer NFTs del usuario actual
  const { data: userNFTs, refetch: refetchUserNFTs } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getOwnerNFTs',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Leer estadísticas del contrato
  const { data: stats } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getStats',
  });

  // Verificar si el usuario puede mintear
  const { data: canMintData } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'canUserMint',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const canMint = canMintData?.[0] || false;
  const remainingMints = canMintData?.[1] || 0;

  // Función para mintear NFT
  const handleMintNFT = async (profile: ContractProfile, metadataURI: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet no conectada');
    }

    if (!mintPrice) {
      throw new Error('No se pudo obtener el precio de minteo');
    }

    setIsMinting(true);
    
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'mintNFT',
        args: [address, profile as any, metadataURI],
        value: mintPrice,
      });
      
      // El hash se obtendrá a través de writeData después de la transacción
      return writeData;
      
    } catch (error) {
      console.error('Error minteando NFT:', error);
      throw error;
    } finally {
      setIsMinting(false);
    }
  };

  // Función para obtener el token ID después de mintear
  const getTokenIdFromTransaction = async (transactionHash: string): Promise<number | null> => {
    try {
      // Simular espera de confirmación
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // En una implementación real, aquí se parsearían los logs de la transacción
      // Por ahora retornamos un token ID simulado basado en el timestamp
      return Math.floor(Date.now() / 1000) % 10000;
    } catch (error) {
      console.error('Error obteniendo token ID:', error);
      return null;
    }
  };

  // Función para obtener perfil de un NFT específico
  const getNFTProfile = async (tokenId: number): Promise<ContractProfile | null> => {
    try {
      // Esta función debería usar useReadContract de manera diferente
      // Por ahora retornamos null ya que no podemos usar hooks dentro de funciones
      return null;
    } catch (error) {
      console.error('Error obteniendo perfil del NFT:', error);
      return null;
    }
  };

  // Función para obtener todos los propietarios
  const getAllOwners = async (): Promise<string[]> => {
    try {
      // Esta función debería usar useReadContract de manera diferente
      // Por ahora retornamos array vacío ya que no podemos usar hooks dentro de funciones
      return [];
    } catch (error) {
      console.error('Error obteniendo propietarios:', error);
      return [];
    }
  };

  // Función para cambiar el límite de minteos por dirección (solo owner)
  const setMaxMintsPerAddress = async (newLimit: number) => {
    if (!isConnected || !address) {
      throw new Error('Wallet no conectada');
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'setMaxMintsPerAddress',
        args: [BigInt(newLimit)],
      });
      
      // Refrescar datos del usuario
      await refetchUserMintCount();
      
    } catch (error) {
      console.error('Error cambiando límite de minteos:', error);
      throw error;
    }
  };

  return {
    // Estado
    isConnected,
    address,
    isMinting: isMinting || isMintingContract,
    writeData, // Hash de la transacción
    
    // Datos del contrato
    mintPrice,
    maxMintsPerAddress,
    userMintCount,
    userNFTs,
    stats,
    canMint,
    remainingMints,
    
    // Funciones
    mintNFT: handleMintNFT,
    getTokenIdFromTransaction,
    getNFTProfile,
    getAllOwners,
    setMaxMintsPerAddress,
    refetchUserNFTs,
    
    // Información del contrato
    contractAddress: CONTRACT_ADDRESS,
  };
}