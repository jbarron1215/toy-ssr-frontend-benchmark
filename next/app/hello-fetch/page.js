// used just to get this out of the static page generation of next
import { headers } from "next/headers";
// helloFetch
export default async function Page() {
  const headersList = await headers();
  const res = await fetch("http://127.0.0.1:3210/api/hello");
  const data = await res.json();
  return <div>{data.text}</div>;
}
