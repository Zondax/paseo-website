import { URLS } from "./urls";

interface FAQItem {
	readonly question: string;
	readonly answer: string;
}

// FAQ Content
export const FAQ_CONTENT = {
	title: "Frequently Asked Questions",
	description: "Find answers to common questions about Paseo Network",
	items: [
		{
			question: "How do I obtain coretime in Paseo?",
			answer: `One can obtain coretime in Paseo by participating on coretime sales, just like in production. After getting some tokens from the faucet one can easily participate in sales via: ${URLS.regionXHub}`,
		},
		{
			question:
				"I want to test new Polkadot features that aren't yet on Polkadot, can I do this on Paseo?",
			answer:
				"Only after they have been included in a runtime release by the polkadot fellowship. One of the key ways to keep Paseo stable is by only deploying code that has been deemed of certain quality by the Polkadot fellows.",
		},
		{
			question: "Who is managing Paseo?",
			answer: `The maintainers of the testnet are a distributed group of contributors taking care of the testnet runtimes and its infrastructure. The exact list can be seen at: ${URLS.githubGovernance}/`,
		},
		{
			question: "Are there any SLAs for incident management?",
			answer: `Yes, find them at: ${URLS.githubSLA}`,
		},
		{
			question:
				"Will it be possible to access the logs from the Relay and System chains?",
			answer: `Yes, most infrastructure providers send logs to a centralized logging service that can be accessed at: ${URLS.grafanaLogs}`,
		},
		{
			question: "I am a bit lost or I need further support, what do I do?",
			answer: `The best ways of contacting the involved contributors are: Open an issue at: ${URLS.githubSupport} or Join the public paseo matrix room: ${URLS.matrixSupport}`,
		},
		{
			question: "My balance was reduced to 5K PAS suddenly, what's going on?",
			answer:
				"All accounts have an upper bound of 5K PAS, so we reduce all balances to that amount periodically. This is done to ensure the network integrity and the good use of the resources available in Paseo by limiting the economic power of anonymous actors. If there's a good reason, feel free to submit a PR requesting to whitelist your account. Paseo is a common good for the ecosystem and we must take care of it all together!",
		},
	] as const satisfies readonly FAQItem[],
};
