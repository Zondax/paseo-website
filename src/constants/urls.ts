// Centralized URL constants - Single source of truth
export const URLS = {
	// External Services
	validatorLogs: "https://validators.paseo.site",
	grafanaLogs: "https://grafana.paseo.site/",
	regionXHub: "https://hub.regionx.tech/?network=paseo",

	// Documentation
	docs: "https://docs.paseo.network",
	docsGovernance: "https://docs.paseo.network/governance",

	// GitHub - Paseo Network
	github: "https://github.com/paseo-network",
	githubChainSpecs: "https://github.com/paseo-network/paseo-chain-specs",
	githubGovernance: "https://github.com/paseo-network/paseo-action-submission",
	githubSupport: "https://github.com/paseo-network/support",
	githubSLA:
		"https://github.com/paseo-network/paseo-action-submission/blob/main/pas/PAS-2-core-support-model.md",

	// Social Media
	twitter: "https://x.com/PaseoTestnet",

	// Matrix
	matrixSupport: "https://matrix.to/#/#paseo-testnet-support:parity.io",
	matrixAnnouncements: "https://matrix.to/#/#paseo-announcements:matrix.org",

	// Polkadot
	polkadotEcosystem: "https://polkadot.com",
	polkadotWikiAsyncBacking:
		"https://wiki.polkadot.com/learn/learn-async-backing/#asynchronous-backing",
	polkadotFellowsAgileCoretime:
		"https://polkadot-fellows.github.io/RFCs/approved/0001-agile-coretime.html?highlight=agile#rfc-1-agile-coretime",
	polkadotFellowsElasticScaling:
		"https://polkadot-fellows.github.io/RFCs/approved/0103-introduce-core-index-commitment.html?highlight=Elastic%20scaling#summary",

	// Zondax
	zondax: "https://zondax.ch",
	zondaxPrivacy: "https://zondax.ch/privacy-policy",
	zondaxTerms: "https://zondax.ch/terms-of-use",

	// Chain Specs - R2 Storage
	chainSpecsBase: "https://paseo-r2.zondax.ch/chain-specs",
	chainSpecs: {
		relayChain: "https://paseo-r2.zondax.ch/chain-specs/paseo.raw.json",
		assetHub: "https://paseo-r2.zondax.ch/chain-specs/paseo-asset-hub.json",
		bridgeHub:
			"https://paseo-r2.zondax.ch/chain-specs/paseo-bridge-hub.raw.json",
		coretime: "https://paseo-r2.zondax.ch/chain-specs/paseo-coretime.raw.json",
		people: "https://paseo-r2.zondax.ch/chain-specs/paseo-people.raw.json",
		collectives:
			"https://paseo-r2.zondax.ch/chain-specs/paseo-collectives.raw.json",
	},

	// Resources
	faucet: "https://faucet.polkadot.io/",
	onPop: "https://onpop.io/",
	pdp: "https://www.deploypolkadot.xyz/",
	polkadotParachainsGuide:
		"https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/",
	polkadotSmartContracts: "https://docs.polkadot.com/develop/smart-contracts/",
	passetHubExplorer: "https://blockscout-passet-hub.parity-testnet.parity.io/",

	// RPC Endpoints
	passetHubRpc: {
		ibp: "wss://passet-hub-paseo.ibp.network",
		polkadot: "wss://testnet-passet-hub-eth-rpc.polkadot.io",
	},
} as const;
