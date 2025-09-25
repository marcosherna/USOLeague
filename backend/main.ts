import "reflect-metadata";

import StartUp from "./src/startUp";
import container from "./src/container";

const application: StartUp = container.resolve(StartUp);

application.Init().catch((error) => {
  console.error("Error during startup:", error);
});
