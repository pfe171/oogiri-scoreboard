/** @jsxImportSource @emotion/react */
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { css } from "@emotion/react";
import { Player, InitPlayers } from "./internal/Players";

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
  let players = InitPlayers();
  players.sort((a, b) => b.score - a.score);

  const table = useReactTable<Player>({
    data: players,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
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
