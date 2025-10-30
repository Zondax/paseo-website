import { describe, expect, it } from "vitest";
import { cn } from "../utils";

describe("cn utility function", () => {
	describe("basic functionality", () => {
		it("should merge single class name", () => {
			const result = cn("text-red-500");
			expect(result).toBe("text-red-500");
		});

		it("should merge multiple class names", () => {
			const result = cn("text-red-500", "bg-blue-500");
			expect(result).toBe("text-red-500 bg-blue-500");
		});

		it("should handle empty strings", () => {
			const result = cn("", "text-red-500", "");
			expect(result).toBe("text-red-500");
		});

		it("should handle undefined values", () => {
			const result = cn(undefined, "text-red-500", undefined);
			expect(result).toBe("text-red-500");
		});

		it("should handle null values", () => {
			const result = cn(null, "text-red-500", null);
			expect(result).toBe("text-red-500");
		});
	});

	describe("conditional classes", () => {
		it("should handle conditional classes with boolean", () => {
			const result = cn("text-red-500", true && "bg-blue-500");
			expect(result).toBe("text-red-500 bg-blue-500");
		});

		it("should filter out false conditional classes", () => {
			const result = cn("text-red-500", false && "bg-blue-500");
			expect(result).toBe("text-red-500");
		});

		it("should handle object syntax", () => {
			const result = cn({
				"text-red-500": true,
				"bg-blue-500": false,
				"p-4": true,
			});
			expect(result).toBe("text-red-500 p-4");
		});

		it("should handle mixed conditional and regular classes", () => {
			const isActive = true;
			const isDisabled = false;
			const result = cn(
				"base-class",
				isActive && "active-class",
				isDisabled && "disabled-class",
			);
			expect(result).toBe("base-class active-class");
		});
	});

	describe("Tailwind merge functionality", () => {
		it("should merge conflicting Tailwind classes (last one wins)", () => {
			const result = cn("px-2", "px-4");
			expect(result).toBe("px-4");
		});

		it("should merge conflicting text colors", () => {
			const result = cn("text-red-500", "text-blue-500");
			expect(result).toBe("text-blue-500");
		});

		it("should merge conflicting background colors", () => {
			const result = cn("bg-red-500", "bg-blue-500");
			expect(result).toBe("bg-blue-500");
		});

		it("should keep non-conflicting classes", () => {
			const result = cn("px-2", "py-4", "px-8");
			expect(result).toBe("py-4 px-8");
		});

		it("should handle responsive prefixes", () => {
			const result = cn("px-2", "md:px-4", "lg:px-6");
			expect(result).toBe("px-2 md:px-4 lg:px-6");
		});

		it("should merge same responsive classes", () => {
			const result = cn("md:px-2", "md:px-4");
			expect(result).toBe("md:px-4");
		});
	});

	describe("array inputs", () => {
		it("should handle array of class names", () => {
			const result = cn(["text-red-500", "bg-blue-500"]);
			expect(result).toBe("text-red-500 bg-blue-500");
		});

		it("should handle nested arrays", () => {
			const result = cn(["text-red-500", ["bg-blue-500", "p-4"]]);
			expect(result).toBe("text-red-500 bg-blue-500 p-4");
		});

		it("should handle mixed arrays and strings", () => {
			const result = cn("text-red-500", ["bg-blue-500", "p-4"], "m-2");
			expect(result).toBe("text-red-500 bg-blue-500 p-4 m-2");
		});
	});

	describe("complex real-world scenarios", () => {
		it("should handle button variant classes", () => {
			const variant = "primary";
			const size = "lg";
			const result = cn(
				"inline-flex items-center justify-center rounded-md",
				{
					"bg-blue-500 text-white": variant === "primary",
					"bg-gray-200 text-gray-800": variant === "secondary",
				},
				{
					"px-4 py-2 text-sm": size === "sm",
					"px-6 py-3 text-base": size === "lg",
				},
			);
			expect(result).toContain("bg-blue-500");
			expect(result).toContain("px-6");
			expect(result).toContain("py-3");
		});

		it("should handle card component classes with states", () => {
			const isHovered = true;
			const isSelected = false;
			const result = cn(
				"rounded-lg border p-4",
				"transition-all duration-200",
				isHovered && "shadow-lg",
				isSelected && "border-blue-500",
			);
			expect(result).toContain("shadow-lg");
			expect(result).not.toContain("border-blue-500");
		});

		it("should override base classes with props", () => {
			const baseClasses = "px-4 py-2 bg-gray-100";
			const customClasses = "bg-blue-500 rounded-lg";
			const result = cn(baseClasses, customClasses);
			// tailwind-merge overrides bg-gray-100 with bg-blue-500
			expect(result).toContain("px-4");
			expect(result).toContain("py-2");
			expect(result).toContain("rounded-lg");
			expect(result).toContain("bg-blue-500");
			expect(result).not.toContain("bg-gray-100");
		});
	});

	describe("edge cases", () => {
		it("should handle no arguments", () => {
			const result = cn();
			expect(result).toBe("");
		});

		it("should handle only falsy values", () => {
			const result = cn(false, null, undefined, "");
			expect(result).toBe("");
		});

		it("should handle very long class strings", () => {
			const longClasses = Array(100).fill("text-red-500").join(" ");
			const result = cn(longClasses);
			expect(result).toBe("text-red-500");
		});

		it("should handle special characters in custom classes", () => {
			const result = cn("[&>svg]:w-4", "[&>svg]:h-4");
			expect(result).toBe("[&>svg]:w-4 [&>svg]:h-4");
		});
	});
});
