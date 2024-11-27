// used just to get this out of the static page generation of next
import { headers } from "next/headers";
// helloFetch
export default async function SayHello(props) {
  const headersList = await headers();
  return <div>{props.text}</div>;
}
