import StartUp from "./src/startUp";

const startUp = new StartUp();

startUp.Init().catch((error) => {
  console.error("Error during startup:", error);
});
