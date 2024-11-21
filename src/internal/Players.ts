import playerList from "../../players.json";
import { Strategies } from "./Strategy.ts";

export type NameTableItem = {
  name: string;
};

export type Player = {
  playerData: PlayerData;
  strategy: Strategy;
};

export type PlayerData = {
  rank: number;
  score: number;
  name: string;
};

// point ratio of 200
type Strategy = {
  point2: number;
  point3: number;
  point4: number;
};

// get random int between 0 and max-1
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getNameList(): string[] {
  let names = localStorage.getItem("names");
  let result: string[] = [];
  if (names != null) {
    result = names.split(",");
  }
  return result;
}

function setNameList(names: NameTableItem[]) {
  let namesString = "";
  for (const n of names) {
    namesString = namesString + n.name + ",";
  }
  namesString = namesString.slice(0, namesString.length - 1);
  localStorage.setItem("names", namesString);
}

export function GetNames(): NameTableItem[] {
  let names = getNameList();
  if (names.length == 0) {
    names = playerList.players;
  }

  let nameTable: NameTableItem[] = [];
  for (const n of names) {
    let name: NameTableItem = { name: n };
    nameTable.push(name);
  }
  return nameTable;
}

export function UpdateNames(names: NameTableItem[]) {
  setNameList(names);
}

export function InitPlayers(): Player[] {
  let names = getNameList();
  if (names.length == 0) {
    names = playerList.players;
  }

  let players: Player[] = [];
  for (const n of names) {
    let strategyArray = Strategies[getRandomInt(Strategies.length)];
    let strategy: Strategy = {
      point2: strategyArray[2],
      point3: strategyArray[1],
      point4: strategyArray[0],
    };

    let player: Player = {
      playerData: { rank: 0, score: 0, name: n },
      strategy: strategy,
    };

    players.push(player);
  }
  return players;
}

// handling voting in "vote" times
export function UpdatePlayers(players: Player[], vote: number) {
  let voted = false;
  for (let i = 0; i < vote; i++) {
    for (const p of players) {
      let rand = getRandomInt(200);
      if (rand < p.strategy.point4) {
        p.playerData.score += 4;
        voted = true;
      } else if (rand < p.strategy.point4 + p.strategy.point3) {
        p.playerData.score += 3;
        voted = true;
      } else if (
        rand <
        p.strategy.point4 + p.strategy.point3 + +p.strategy.point2
      ) {
        p.playerData.score += 2;
        voted = true;
      }
    }
  }

  if (!voted) {
    let rand = getRandomInt(players.length);
    players[rand].playerData.score += 2;
  }

  // sort by rank
  players.sort((a, b) => b.playerData.score - a.playerData.score);

  // ranking
  let prevScore = -1;
  let prevRank = 0;
  for (let i = 0; i < players.length; i++) {
    if (prevScore == players[i].playerData.score) {
      players[i].playerData.rank = prevRank;
    } else {
      players[i].playerData.rank = i + 1;
      prevRank = i + 1;
      prevScore = players[i].playerData.score;
    }
  }

  return players;
}
