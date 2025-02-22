export function getTBAHeaders() {
	const headers = new Headers();
	headers.append("X-TBA-Auth-Key", String(process.env.NEXT_PUBLIC_TBA_SECRET));
	headers.append("accept", "application/json");
	return headers;
}

export function getSBHeaders() {
	const headers = new Headers();
	// headers.append("Authorization", `Bearer ${process.env.NEXT_PUBLIC_SB_SECRET}`);
	headers.append("Accept", "application/json");
	return headers;
}