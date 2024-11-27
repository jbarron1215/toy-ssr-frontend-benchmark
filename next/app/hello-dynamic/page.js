// hello-dynamic
// used just to get this out of the static page generation of next
import { headers } from "next/headers";
export default async function Page() {
  const headersList = await headers();
  return <div>Hello World from Page!</div>;
}
