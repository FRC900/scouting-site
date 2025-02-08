export default function getHeaders() {
	const headers = new Headers();
	headers.append("X-TBA-Auth-Key", String(process.env.NEXT_PUBLIC_TBA_SECRET));
	headers.append("accept", "application/json");
	return headers;
}