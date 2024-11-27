// hello-dynamic-component
import SayHello from "./say-hello";

export default async function Page() {
  return <SayHello text={"Hello World Component!"} />;
}
