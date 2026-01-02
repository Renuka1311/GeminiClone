export default async function run(prompt) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  if (!res.ok) return null;
  return data.text;
}
