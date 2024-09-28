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

  function resetAll() {
    window.location.reload();
  }

  return (
    <>
      <Group
        justify="flex-end"
        css={css({
          alignItems: "start",
          height: "70px",
          margin: "0 20px 10px 0",
        })}
      >
        <NumberInput
          placeholder="投票人数"
          suffix="人"
          value={vote}
          error={
            Number(vote) < 1 || Number(vote) > 1000000
              ? "1～1000000の値を入力してください"
              : ""
          }
          onChange={setVote}
        />
        <Button
          type="submit"
          disabled={Number(vote) < 1 || Number(vote) > 1000000}
          onClick={() => setTotalVote((prev) => prev + Number(vote))}
          css={css({ width: "80px" })}
        >
          投票
        </Button>
        <Button
          type="submit"
          onClick={() => resetAll()}
          css={css({ width: "80px" })}
        >
          リセット
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
          backgroundColor: "#fffaf0",
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
          backgroundColor: "#fffaf0",
        }}
      >
        <thead>
          <tr
            css={css({
              textAlign: "left",
              backgroundColor: "#000066",
              color: "white",
              fontWeight: "bold",
            })}
          >
            <td colSpan={3} css={css({ padding: "6px 0 6px 8px" })}>
              途中経過
            </td>
          </tr>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    backgroundColor: "#f2f2e0",
                    fontSize: "x-small",
                    padding: "5px",
                  }}
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
                        padding: "0 10px 0 10px",
                        color: "red",
                        minWidth: "40px",
                      }
                    : {
                        textAlign: "center",
                        fontFamily: "Courier New",
                        fontWeight: "bold",
                        padding: "0 10px 0 10px",
                        color: "darkorange",
                        minWidth: "40px",
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
                        padding: "0 10px 0 10px",
                        fontFamily: "Courier New",
                        fontWeight: "bold",
                        fontSize: "large",
                        color: "red",
                        minWidth: "40px",
                      }
                    : {
                        textAlign: "center",
                        padding: "0 10px 0 10px",
                        fontFamily: "Courier New",
                        fontWeight: "bold",
                        color: "darkorange",
                        minWidth: "40px",
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
                style={
                  row.original.rank <= 3
                    ? {
                        textAlign: "left",
                        padding: "8px 0 8px 8px",
                        width: "210px",
                        fontSize: "14.3px",
                        color: "#535353",
                      }
                    : {
                        textAlign: "left",
                        padding: "6px 0 6px 8px",
                        width: "200px",
                        fontSize: "14.3px",
                      }
                }
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
