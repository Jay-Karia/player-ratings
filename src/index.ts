import { input, Separator } from "@inquirer/prompts";
import { select } from "@inquirer/prompts";
import { Positions } from "./types.js";

const position: Positions = await select({
  message: "Select the position played",
  choices: [
    {
      name: "Goalkeeper (GK)",
      value: "GK",
    },
    {
      name: "Defender (CB)",
      value: "CB",
    },
    {
      name: "Midfielder (CM)",
      value: "CM",
    },
    {
      name: "Attacker (ST)",
      value: "ST",
    },
  ],
});

const goalsScored = await input({
  message: "Enter the number of goals scored:",
  validate: (input) => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed) || parsed < 0) {
      return "Please enter a valid non-negative number";
    }
    return true;
  },
});

const assists = await input({
  message: "Enter the number of assists:",
  validate: (input) => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed) || parsed < 0) {
      return "Please enter a valid non-negative number";
    }
    return true;
  },
});

const shots = await input({
  message: "Enter the number of shots:",
  validate: (input) => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed) || parsed < 0) {
      return "Please enter a valid non-negative number";
    }
    return true;
  },
});

const shotsOnTarget = await input({
  message: "Enter the number of shots on target:",
  validate: (input) => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed) || parsed < 0) {
      return "Please enter a valid non-negative number";
    }
    return true;
  },
});

let keeperSaves;
if (position === "GK") {
  keeperSaves = await input({
    message: "Enter the number of keeper saves:",
    validate: (input) => {
      const parsed = parseInt(input, 10);
      if (isNaN(parsed) || parsed < 0) {
        return "Please enter a valid non-negative number";
      }
      return true;
    },
  });
}

const tacklesWon = await input({
  message: "Enter the number of tackles won:",
  validate: (input) => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed) || parsed < 0) {
      return "Please enter a valid non-negative number";
    }
    return true;
  },
});

const keyPasses = await input({
  message: "Enter the number of key passes:",
  validate: (input) => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed) || parsed < 0) {
      return "Please enter a valid non-negative number";
    }
    return true;
  },
});

const teamGoals = await input({
  message: "Enter the total number of team goals:",
  validate: (input) => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed) || parsed < 0) {
      return "Please enter a valid non-negative number";
    }
    return true;
  },
});

console.log("\nPlayer Statistics:");
console.log(`Position: ${position}`);
console.log(`Goals Scored: ${goalsScored}`);
console.log(`Assists: ${assists}`);
console.log(`Shots: ${shots}`);
console.log(`Shots on Target: ${shotsOnTarget}`);
if (position === "GK") {
  console.log(`Keeper Saves: ${keeperSaves}`);
}
console.log(`Tackles Won: ${tacklesWon}`);
console.log(`Key Passes: ${keyPasses}`);
console.log(`Team Goals: ${teamGoals}`);
