// simple component
import { headers } from "next/headers";

export default async function SayHello({ text }) {
  const headersList = await headers();
  return (
    <div>
      Hello World Component!
      {text}
    </div>
  );
}
