import playerList from "../../players.json";

export type Player = {
  score: number;
  name: string;
};

export function InitPlayers(): Player[] {
  let players: Player[] = [];
  for (const p of playerList.players) {
    players.push({ score: 0, name: p });
  }
  return players;
}

export function UpdatePlayers(players: Player[]): Player[] {
  for (const p of players) {
    p.score += 1;
  }
  return players;
}
