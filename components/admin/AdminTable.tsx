import React from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  emptyLabel: string;
}

export default function AdminTable<T extends { id: number }>({
  rows,
  columns,
  emptyLabel,
}: AdminTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="border border-dashed border-rule-paper p-10 text-center text-[14px] text-muted-paper">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-rule-paper/50 rounded-[2px]">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-paper-2 border-b border-rule-paper/50">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="text-left font-mono uppercase text-[11px] tracking-[0.06em] text-slate px-4 py-3 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-rule-paper/30 last:border-none hover:bg-paper-2/40">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-ink-text align-top">
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
