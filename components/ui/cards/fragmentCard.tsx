interface FragementCardProps {
	variant: "default";
	fragmentId: string;
	fragmentContent: string;
	fragmentStrength: number;
	date: string;
}

export function FragementCard({
	variant = "default",
	date,
	fragmentId,
}: FragementCardProps) {}
