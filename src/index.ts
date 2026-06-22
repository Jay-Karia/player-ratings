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

// Rating calculation helpers
const STAT_MAX: Record<string, number> = {
  goalsScored: 3,
  assists: 3,
  shots: 10,
  shotsOnTarget: 6,
  keeperSaves: 10,
  tacklesWon: 12,
  keyPasses: 10,
};

const calculateRating = (s: PlayerStats): number => {
  const weightsByPosition: Record<Positions, Record<string, number>> = {
    GK: {
      keeperSaves: 0.35,
      goalsScored: 0.20,
      assists: 0.12,
      shots: 0.03,
      shotsOnTarget: 0.05,
      tacklesWon: 0.08,
      keyPasses: 0.17,
    },
    CB: {
      keeperSaves: 0.05,
      goalsScored: 0.12,
      assists: 0.12,
      shots: 0.08,
      shotsOnTarget: 0.08,
      tacklesWon: 0.40,
      keyPasses: 0.15,
    },
    CM: {
      keeperSaves: 0.03,
      goalsScored: 0.18,
      assists: 0.20,
      shots: 0.10,
      shotsOnTarget: 0.10,
      tacklesWon: 0.15,
      keyPasses: 0.24,
    },
    ST: {
      keeperSaves: 0.00,
      goalsScored: 0.35,
      assists: 0.18,
      shots: 0.12,
      shotsOnTarget: 0.20,
      tacklesWon: 0.03,
      keyPasses: 0.12,
    },
  };

  const w = weightsByPosition[s.position];

  // Normalize each stat to 0..1 using reasonable maxima
  const norm = {
    goalsScored:
      s.teamGoals > 0
        ? Math.min(s.goalsScored / Math.max(1, s.teamGoals), 1)
        : Math.min(s.goalsScored / STAT_MAX.goalsScored, 1),
    assists: Math.min(s.assists / STAT_MAX.assists, 1),
    shots: Math.min(s.shots / STAT_MAX.shots, 1),
    shotsOnTarget: Math.min(s.shotsOnTarget / STAT_MAX.shotsOnTarget, 1),
    keeperSaves: Math.min(s.keeperSaves / STAT_MAX.keeperSaves, 1),
    tacklesWon: Math.min(s.tacklesWon / STAT_MAX.tacklesWon, 1),
    keyPasses: Math.min(s.keyPasses / STAT_MAX.keyPasses, 1),
  };

  const score =
    norm.goalsScored * (w.goalsScored ?? 0) +
    norm.assists * (w.assists ?? 0) +
    norm.shots * (w.shots ?? 0) +
    norm.shotsOnTarget * (w.shotsOnTarget ?? 0) +
    norm.keeperSaves * (w.keeperSaves ?? 0) +
    norm.tacklesWon * (w.tacklesWon ?? 0) +
    norm.keyPasses * (w.keyPasses ?? 0);

  // score is 0..1 -> convert to percentage
  const rating = Math.max(0, Math.min(100, Math.round(score * 1000) / 10));
  return rating;
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

const playerRatingSpinner = ora("Calculating player rating...").start();

// Short simulated calculation delay, then compute rating and display
await new Promise((res) => setTimeout(res, 700));
const rating = calculateRating(stats);
playerRatingSpinner.succeed(`Rating calculated: ${rating}%`);

console.log(
  boxen(`${chalk.bold("Player Rating")}

${chalk.bold.yellow(`${rating}%`)}`, {
    padding: 1,
    borderStyle: "round",
    borderColor: "magenta",
  })
);
