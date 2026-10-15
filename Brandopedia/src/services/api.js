
// Android emulator: 10.0.2.2
// Physical phone: use your computer's LAN IP.
// Replace with the correct address for your setup.
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

console.log(process.env.EXPO_PUBLIC_API_URL)
export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export async function apiPost(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
