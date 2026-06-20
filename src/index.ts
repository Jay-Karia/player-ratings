import { input, select, Separator } from "@inquirer/prompts";
import chalk from "chalk";
import boxen from "boxen";
import ora from "ora";
import Table from "cli-table3";
import { Positions } from "./types.js";

type PlayerStats = {
  position: Positions;
  goalsScored: number;
  assists: number;
  shots: number;
  shotsOnTarget: number;
  keeperSaves: number;
  tacklesWon: number;
  keyPasses: number;
  teamGoals: number;
};

const validateNumber = (value: string) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return "Please enter a valid non-negative whole number";
  }
  return true;
};

const askNumber = async (message: string): Promise<number> => {
  const value = await input({
    message,
    validate: validateNumber,
  });
  return Number.parseInt(value, 10);
};

const positionLabel: Record<Positions, string> = {
  GK: "Goalkeeper",
  CB: "Defender",
  CM: "Midfielder",
  ST: "Attacker",
};

console.clear();
console.log(
  boxen(
    `${chalk.bold.cyan("⚽ Player Ratings CLI")}`,
    {
      padding: { top: 0, right: 1, bottom: 0, left: 1 },
      borderStyle: "round",
      borderColor: "cyan",
    }
  )
);

const position: Positions = await select({
  message: chalk.bold("Select the position played"),
  choices: [
    { name: "Goalkeeper (GK)", value: "GK" },
    { name: "Defender (CB)", value: "CB" },
    { name: "Midfielder (CM)", value: "CM" },
    { name: "Attacker (ST)", value: "ST" },
  ],
});

console.log(chalk.blue("\nMatch contribution"));

const goalsScored = await askNumber("Goals scored:");
const assists = await askNumber("Assists:");
const shots = await askNumber("Shots:");
const shotsOnTarget = await askNumber("Shots on target:");

let keeperSaves = 0;
if (position === "GK") {
  console.log(chalk.blue("\nGoalkeeper stats"));
  keeperSaves = await askNumber("Keeper saves:");
}

console.log(chalk.blue("\nDefensive + build-up"));
const tacklesWon = await askNumber("Tackles won:");
const keyPasses = await askNumber("Key passes:");
const teamGoals = await askNumber("Total team goals:");

const stats: PlayerStats = {
  position,
  goalsScored,
  assists,
  shots,
  shotsOnTarget,
  keeperSaves,
  tacklesWon,
  keyPasses,
  teamGoals,
};


const table = new Table({
  head: [chalk.cyan("Stat"), chalk.cyan("Value")],
  style: { head: [], border: [] },
});

table.push(
  ["Position", `${positionLabel[stats.position]} (${stats.position})`],
  ["Goals Scored", stats.goalsScored],
  ["Assists", stats.assists],
  ["Shots", stats.shots],
  ["Shots on Target", stats.shotsOnTarget],
  ...(stats.position === "GK" ? [["Keeper Saves", stats.keeperSaves]] : []),
  ["Tackles Won", stats.tacklesWon],
  ["Key Passes", stats.keyPasses],
  ["Team Goals", stats.teamGoals]
);

console.log("\n");
console.log(
  boxen(`${chalk.bold("Stats")}\n\n${table.toString()}`, {
    padding: 1,
    borderStyle: "round",
    borderColor: "green",
  })
);
