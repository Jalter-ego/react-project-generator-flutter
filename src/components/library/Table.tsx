export const header = [
  {
  title: "columan1",
  },
  {
  title: "columan2",
  },
  {
  title: "columan3",
  }
]

export const data = [
  {
    columan1: "data1",
    columan2: "data2",
    columan3: "data3"
  },
  {
    columan1: "data4",
    columan2: "data5",
    columan3: "data6"
  },
  {
    columan1: "data7",
    columan2: "data8",
    columan3: "data9"
  }
]
export function Table({header,data}: 
  {header: {title: string}[], data: {columan1: string, columan2: string, columan3: string}[]}) {
  return(
    <div className="overflow-x-auto rounded-t-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-zinc-300">
          <tr>
            {
              header.map((col, index) => (
                <th key={index} className="px-5 py-3 text-left text-xs font-medium text-zinc-800">
                  {col.title}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="bg-zinc-100 divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-5 py-4 whitespace-nowrap">{row.columan1}</td>
              <td className="px-5 py-4 whitespace-nowrap">{row.columan2}</td>
              <td className="px-5 py-4 whitespace-nowrap">{row.columan3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}