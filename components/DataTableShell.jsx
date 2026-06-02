export default function DataTableShell({ columns, children }) {
  return (
    <div className="bg-white rounded-lg border border-green-200 overflow-hidden shadow-sm">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-pink-100 to-green-100 border-b border-green-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-green-200">
          {children}
        </tbody>
      </table>
    </div>
  );
}
