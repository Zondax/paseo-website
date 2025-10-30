import type { NextConfig } from "next";

// Define common security policy
const commonContentSecurityPolicy = {
	"default-src": "'self'",
	"script-src": "'self' 'unsafe-inline'",
	"style-src": "'self' 'unsafe-inline'",
	"style-src-elem": "'self' 'unsafe-inline'",
	"img-src": "'self' data:",
	"font-src": "'self' data:",
	"connect-src":
		"'self' https://api.github.com https://raw.githubusercontent.com",
	"frame-ancestors": "'self'",
	"base-uri": "'self'",
	"form-action": "'self'",
};

// Define environment specific security policies
const devContentSecurityPolicy = {
	...commonContentSecurityPolicy,
	"script-src": `${commonContentSecurityPolicy["script-src"]} 'unsafe-eval'`,
	"connect-src": `${commonContentSecurityPolicy["connect-src"]} ws:`,
};

const prodContentSecurityPolicy = {
	...commonContentSecurityPolicy,
};

// Assign the appropriate security policy based on the environment
const contentSecurityPolicy =
	process.env.NODE_ENV === "development"
		? devContentSecurityPolicy
		: prodContentSecurityPolicy;

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "X-DNS-Prefetch-Control",
						value: "on", // Performance
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains", // Security Baseline
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN", // Clickjacking protection
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff", // MIME type sniffing protection
					},
					{
						key: "Referrer-Policy",
						value: "origin-when-cross-origin", // Privacy
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()", // Privacy
					},
					{
						key: "Content-Security-Policy",
						value: Object.entries(contentSecurityPolicy)
							.map(([directive, value]) => `${directive} ${value}`)
							.join("; "),
					},
					{
						key: "Cross-Origin-Opener-Policy",
						value: "same-origin", // Cross-Origin Isolation
					},
				],
			},
		];
	},
};

export default nextConfig;
