/** @jsxImportSource @emotion/react */
import { Button, Group, NumberInput } from "@mantine/core";
import "@mantine/core/styles.css";
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Player, InitPlayers, UpdatePlayers } from "./internal/Players";

const columns: ColumnDef<Player, any>[] = [
  {
    accessorKey: "score",
    header: "合計",
  },
  {
    accessorKey: "name",
    header: "名前",
  },
];

function Table() {
  const [players, setPlayers] = useState<Player[]>(InitPlayers());
  const [vote, setVote] = useState<string | number>(1);
  const [totalVote, setTotalVote] = useState<number>(0);

  const table = useReactTable<Player>({
    data: players,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    UpdatePlayers(players);
    players.sort((a, b) => b.score - a.score);
    setPlayers([...players]);
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
          flexFlow: "column",
          marginBottom: "10px",
        })}
      >
        <span>{totalVote}名</span>
        <span>ご協力ありがとうございました。</span>
      </div>
      <table align="center" border={1} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr css={css({ textAlign: "center" })}>
            <td colSpan={2}>途中経過</td>
          </tr>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
                style={{ textAlign: "center" }}
              >
                {flexRender(
                  row.getVisibleCells()[0].column.columnDef.cell,
                  row.getVisibleCells()[0].getContext()
                )}
              </td>
              <td
                key={row.getVisibleCells()[1].id}
                style={{ textAlign: "left" }}
              >
                {flexRender(
                  row.getVisibleCells()[1].column.columnDef.cell,
                  row.getVisibleCells()[1].getContext()
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
