
export default async function Page() {
  const res = await fetch('http://127.0.0.1:3210/api/hello', { next: { revalidate: 3600 } })
  const data = await res.json()
  return <div>{data.text}</div>
}