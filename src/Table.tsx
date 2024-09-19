/** @jsxImportSource @emotion/react */
import { Button, Group, NumberInput } from "@mantine/core";
import "@mantine/core/styles.css";
import { css } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  PlayerData,
  Player,
  InitPlayers,
  UpdatePlayers,
} from "./internal/Players";

const columns: ColumnDef<PlayerData, any>[] = [
  {
    accessorKey: "rank",
    header: "順位",
  },
  {
    accessorKey: "score",
    header: "合計",
  },
  {
    accessorKey: "name",
    header: "名前",
  },
];

function ExtractPlayerData(players: Player[]): PlayerData[] {
  let result: PlayerData[] = [];
  for (const p of players) {
    result.push(p.playerData);
  }

  return result;
}

function Table() {
  const [players, _] = useState<Player[]>(InitPlayers());
  const [playerData, setPlayerData] = useState<PlayerData[]>(
    ExtractPlayerData(players)
  );
  const [vote, setVote] = useState<string | number>(1);
  const [totalVote, setTotalVote] = useState<number>(0);
  const initRef = useRef(true);

  const table = useReactTable<PlayerData>({
    data: playerData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (initRef.current) {
      initRef.current = false;
      return;
    }
    UpdatePlayers(players, Number(vote));
    setPlayerData([...ExtractPlayerData(players)]);
  }, [totalVote]);

  return (
    <>
      <Group justify="flex-end" css={css({ marginRight: "20px" })}>
        <NumberInput
          placeholder="投票人数"
          suffix="人"
          value={vote}
          onChange={setVote}
        />
        <Button
          type="submit"
          disabled={Number(vote) < 1}
          onClick={() => setTotalVote((prev) => prev + Number(vote))}
        >
          投票
        </Button>
      </Group>
      <div
        css={css({
          display: "flex",
          textAlign: "center",
          marginRight: "auto",
          marginLeft: "auto",
          flexFlow: "column",
          marginTop: "20px",
          marginBottom: "10px",
          width: "500px",
          backgroundColor: "lightgoldenrodyellow",
        })}
      >
        <span>{totalVote}名</span>
        <span>ご協力ありがとうございました。</span>
      </div>
      <table
        align="center"
        border={1}
        style={{
          borderCollapse: "collapse",
          backgroundColor: "lightgoldenrodyellow",
        }}
      >
        <thead>
          <tr css={css({ textAlign: "center", fontSize: "large" })}>
            <td colSpan={3}>途中経過</td>
          </tr>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ fontSize: "small", padding: "5px" }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              <td
                key={row.getVisibleCells()[0].id}
                style={
                  row.original.rank <= 3
                    ? {
                        textAlign: "center",
                        fontFamily: "Courier New",
                        fontWeight: "bold",
                        fontSize: "large",
                        color: "red",
                      }
                    : {
                        textAlign: "center",
                        fontFamily: "Courier New",
                        fontWeight: "bold",
                        color: "darkorange",
                      }
                }
              >
                {flexRender(
                  row.getVisibleCells()[0].column.columnDef.cell,
                  row.getVisibleCells()[0].getContext()
                )}
              </td>
              <td
                key={row.getVisibleCells()[1].id}
                style={
                  row.original.rank <= 3
                    ? {
                        textAlign: "center",
                        fontFamily: "Courier New",
                        fontWeight: "bold",
                        fontSize: "large",
                        color: "red",
                      }
                    : {
                        textAlign: "center",
                        fontFamily: "Courier New",
                        fontWeight: "bold",
                        color: "darkorange",
                      }
                }
              >
                {flexRender(
                  row.getVisibleCells()[1].column.columnDef.cell,
                  row.getVisibleCells()[1].getContext()
                )}
              </td>
              <td
                key={row.getVisibleCells()[2].id}
                style={{ textAlign: "left", padding: "5px", width: "200px" }}
              >
                {flexRender(
                  row.getVisibleCells()[2].column.columnDef.cell,
                  row.getVisibleCells()[2].getContext()
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
