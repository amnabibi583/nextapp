type Todo = { title: string; completed: boolean };

async function getHealth(): Promise<Todo> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', { next: { revalidate: 60 } });
  if (!response.ok) throw new Error(`Health service returned ${response.status}`);
  return response.json();
}

export default async function Health() {
  let todo: Todo | null = null;
  try { todo = await getHealth(); } catch { todo = null; }
  if (!todo) return <main className="main"><p className="eyebrow">System status</p><h1>Health Check</h1><div className="notice" style={{ borderColor: 'var(--emergency)' }}><h2>Service unavailable</h2><p>We could not reach the health service. Please try again later.</p></div></main>;
  return <main className="main"><p className="eyebrow">System status</p><h1>Health Check</h1><div className="notice"><h2>Service reachable</h2><p><strong>Todo:</strong> {todo.title}</p><p><strong>Status:</strong> {todo.completed ? 'Complete' : 'Pending'}</p></div></main>;
}
