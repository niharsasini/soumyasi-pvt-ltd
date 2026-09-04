export default function DataTable({ columns, data, emptyMessage = 'No data found', emptyIcon: EmptyIcon }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        {EmptyIcon && <EmptyIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />}
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-admin-border">
            {columns.map(col => (
              <th key={col.key} className="text-left px-6 py-4
                text-slate-500 text-xs font-medium uppercase
                tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-admin-border">
          {data.map((row, i) => (
            <tr key={row._id || row.id || i} className="hover:bg-admin-hover transition-colors">
              {columns.map(col => (
                <td key={col.key} className="px-6 py-4">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
