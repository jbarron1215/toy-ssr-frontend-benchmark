// simple component
import dynamic from "next/dynamic";

const SayHello = dynamic(() => import("./header-hello"), {
  loading: () => <p>loading...</p>,
});

export default SayHello;
