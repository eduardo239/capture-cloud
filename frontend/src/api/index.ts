export async function sendTask(task: string): Promise<void> {
  const res = await fetch('http://localhost:5000/send', {
    method: 'POST',
    headers: {
      'X-API-Key': 'sua-chave-secreta-aqui',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  });

  if (!res.ok) {
    throw new Error(`Failed to send task: ${res.status}`);
  }
}
