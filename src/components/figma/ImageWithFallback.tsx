"use client";

import Image from "next/image";
import type React from "react";
import { useState } from "react";

export function ImageWithFallback(
	props: React.ComponentPropsWithoutRef<typeof Image>,
) {
	const [didError, setDidError] = useState(false);

	const handleError = () => {
		setDidError(true);
	};

	return didError ? (
		<div
			className={`inline-block bg-gray-100 text-center align-middle ${props.className ?? ""}`}
			style={props.style}
		>
			<div className="flex items-center justify-center w-full h-full">
				<Image
					width={100}
					height={100}
					{...props}
					data-original-url={props.src}
				/>
			</div>
		</div>
	) : (
		<Image {...props} onError={handleError} />
	);
}
