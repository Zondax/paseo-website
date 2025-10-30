import { Droplets, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function FaucetSection() {
	return (
		<section id="faucet" className="section-secondary py-16">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
						Get Test Tokens
					</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						Need test tokens to get started on Paseo? Use the Paseo faucet to
						receive free testnet tokens for development and testing.
					</p>
				</div>

				<div className="flex justify-center">
					<Card className="w-full max-w-md">
						<CardHeader className="text-center">
							<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
								<Droplets className="w-6 h-6 text-primary" />
							</div>
							<CardTitle className="text-xl">Paseo Faucet</CardTitle>
							<CardDescription>
								Get free PAS tokens for testing and development on the Paseo
								testnet
							</CardDescription>
						</CardHeader>
						<CardContent className="text-center">
							<Button asChild className="w-full" size="lg">
								<a
									href="https://faucet.polkadot.io/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Get Test Tokens
									<ExternalLink className="ml-2 h-4 w-4" />
								</a>
							</Button>
							<p className="text-sm text-muted-foreground mt-4">
								Simply connect your wallet and request tokens to start building
								on Paseo
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
