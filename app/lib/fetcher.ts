export default async function fetcher<JSON = any>(
  url: RequestInfo,
): Promise<JSON> {

  const header = {
    method: 'GET',
    headers: {
      'X-TBA-Auth-Key': `${process.env.NEXT_PUBLIC_TBA_SECRET}`,
    }
  };

  const res = await fetch(url, header);

  if (!res.ok) {
    const err = new Error(`${res.status}: ${res.statusText}`);
    throw err;
  }

  return res.json();
}