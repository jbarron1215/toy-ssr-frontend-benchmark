export const ssr = true

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const res = await fetch('http://127.0.0.1:3210/api/hello')
  const data = await res.json()
  return data
}