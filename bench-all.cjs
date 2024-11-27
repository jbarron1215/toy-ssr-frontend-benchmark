// -----------------------------------------------------------------------------
// Copyright @ 2024 Pau Sanchez
//
// Tests all endpoints assuming all servers are launched through docker compose
// at predefined ports.
//
// MIT License
// -----------------------------------------------------------------------------
const os = require("os");
const fs = require("fs");
const util = require("util");
const { exec } = require("child_process");
const autocannon = require("autocannon");
const libUtil = require("./libs/util.cjs");

const execAsync = util.promisify(exec);

const AUTOCANNON = "autocannon";
const WRK = "wrk";

// -----------------------------------------------------------------------------
// g_testConfig Global configuraiton to keep things simple
// -----------------------------------------------------------------------------
const g_testConfig = {
  warmup: parseInt(process.env.BENCH_WARMUP || true),
  connections: parseInt(process.env.BENCH_CONNECTIONS || 100),
  pipelining: 1,
  duration: parseInt(process.env.BENCH_DURATION || 10),
};

// -----------------------------------------------------------------------------
// benchmarkUrlWithAutocannon
// -----------------------------------------------------------------------------
async function benchmarkUrlWithAutocannon(config, url) {
  const autocannonConfig = {
    ...config,
    url,
  };
  const result = await autocannon(autocannonConfig);

  return {
    duration: result.duration,
    errors: result.errors + result.timeouts,
    latency: result.latency.p99_9,
    requests: result.requests.p99_9,
    throughput: result.throughput.p99_9,
  };
}

// -----------------------------------------------------------------------------
// benchmarkUrlWithWrk
// -----------------------------------------------------------------------------
async function benchmarkUrlWithWrk(config, url) {
  const command = [
    "wrk",
    "-s",
    "wrk-json.lua",
    "--timeout",
    "2s",
    "-t",
    "1",
    "-c",
    config.connections,
    "-d",
    config.duration + "s",
    url,
  ];

  const { stdout } = await execAsync(command.join(" "));
  const data = JSON.parse(stdout.toString().split("JSON Output:")[1]);
  return {
    duration: data.duration_in_microseconds / 1e6,
    errors:
      data.connect_errors +
      data.read_errors +
      data.write_errors +
      data.http_errors +
      data.timeouts,
    latency: data.latency_p99_9,
    requests: data.requests_per_sec,
    throughput: data.bytes_transfer_per_sec,
  };
}

// -----------------------------------------------------------------------------
// testFramework
//
// Start & stop test server and perform HTTP requests to measure performance
// -----------------------------------------------------------------------------
async function testFramework(loadTestingTool, framework, config) {
  const path = config.path.replace(/^\/+/, "");

  // warmup for 1 second
  if (config.warmup)
    await benchmarkUrlWithAutocannon(
      { ...config, duration: 1 },
      `http://localhost:${config.port}/${path}`
    );

  let result = {};
  switch (loadTestingTool) {
    case AUTOCANNON:
      result = await benchmarkUrlWithAutocannon(
        config,
        `http://localhost:${config.port}/${path}`
      );
      break;

    case WRK:
    default:
      result = await benchmarkUrlWithWrk(
        config,
        `http://localhost:${config.port}/${path}`
      );
      break;
  }

  return {
    name: framework.name,
    version: framework.version,
    ...result,
  };
}

// -----------------------------------------------------------------------------
// main
// -----------------------------------------------------------------------------
async function main() {
  const frameworks = [
    // { name: "fastify", port: 3210, version : '4.28'},
    // { name: "angular", port: 3001, version : '18.0'},
    { name: "next", port: 3002, version: "15" },
    // { name: "nuxt", port: 3003, version : '3.11'},
    // { name: "svelte", port: 3004, version: '4.2'},
  ];

  console.log(" ");
  console.log("Configuration: ");
  console.log("  Node Version: ", process.version);
  console.log("  CPU Model:    ", os.cpus()[0].model);
  console.log("  Duration:     ", g_testConfig.duration, "s");
  console.log("  Connections:  ", g_testConfig.connections);
  console.log(" ");

  await libUtil.setup();
  /* FIXME!  await execAsync("docker-compose up -d");
  await new Promise((x) => setTimeout(x, 10*1000)) // wait for servers to start
*/

  const endpoints = {
    staticPage: "/hello",
    staticPageWithComponent: "/hello-component",
    dynamicPage: "/hello-dynamic",
    pageWithDynamicComponent: "/hello-dynamic-component",
    pageWithLazyLoadedDynamicComponent: "/hello-dynamic-component-import",
    pageWithFetch: "/hello-fetch",
    pageWithFetchCached: "/hello-fetch-cache",
    apiRouteHandler: "/api",
    // NOTE: some frameworks only use cache on the client and not on the server
  };

  const allResults = [];
  for (const [pathName, pathToTest] of Object.entries(endpoints)) {
    if (
      process.env.BENCH_FILTER &&
      !pathName.includes(process.env.BENCH_FILTER)
    )
      continue;

    const results = [];
    for (const framework of frameworks) {
      // NOTE: only react has proper server-side cache implementation so far
      if (pathName === "helloFetchCache" && framework.name !== "next") continue;

      console.error(`Testing ${framework.name} (${pathName})...`);

      const result = await testFramework(WRK, framework, {
        ...g_testConfig,
        port: framework.port,
        path: pathToTest,
      });
      result.framework = result.name;
      results.push(result);
      allResults.push({
        ...result,
        name: `${result.name} (${pathName})`,
      });
    }

    console.log(libUtil.generateMarkdownTable(results) + "\n\n");
  }

  console.log("All:");
  console.log(libUtil.generateMarkdownTable(allResults) + "\n\n");
  // FIXME!  await execAsync("docker-compose down");

  // save output
  fs.writeFileSync("last-result.json", JSON.stringify(allResults, null, 2));
}

main();
