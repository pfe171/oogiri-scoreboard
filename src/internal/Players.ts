import playerList from "../../players.json";

export type Player = {
  rank: number;
  score: number;
  name: string;
};

export function InitPlayers(): Player[] {
  let players: Player[] = [];
  for (const p of playerList.players) {
    players.push({ rank: 0, score: 0, name: p });
  }
  return players;
}

export function UpdatePlayers(players: Player[]): Player[] {
  for (const p of players) {
    p.score += 1;
  }

  // sort by rank
  players.sort((a, b) => b.score - a.score);

  // ranking
  let prevScore = -1;
  let prevRank = 0;
  for (let i = 0; i < players.length; i++) {
    if (prevScore == players[i].score) {
      players[i].rank = prevRank;
    } else {
      players[i].rank = i + 1;
      prevRank = i + 1;
      prevScore = players[i].score;
    }
  }

  return players;
}
