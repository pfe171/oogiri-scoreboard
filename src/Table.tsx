/** @jsxImportSource @emotion/react */
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { css } from '@emotion/react';

type Player = {
    score: number
    name: string
}

const players: Player[] = [
    {
      score: 3,
      name: 'J.K.ローリング',
    },
    {
      score: 5,
      name: '夏目漱石',
    },
];

const columns: ColumnDef<Player, any>[] = [
    {
      accessorKey: 'score',
      header: '合計',
    },
    {
      accessorKey: 'name',
      header: '名前',
    },
];

function Table() {
    const table = useReactTable<Player>({
        data: players,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <>
            <table>
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
};

export default Table
