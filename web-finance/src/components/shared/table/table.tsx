"use client"

import { useEffect, useRef, useState } from "react"

interface ResponsiveTableProps<T extends Record<string, any>> {
  data: T[]
  className?: string
  tableClassName?: string
  theadClassName?: string
  tbodyClassName?: string
  trClassName?: string
  thClassName?: string
  tdClassName?: string
  emptyMessage?: string
  columnWidths?: Record<string, string>
  excludeColumns?: string[]
  columnLabels?: Record<string, string>
  sortable?: boolean
}

export function Table<T extends Record<string, any>>({
  data,
  className,
  tableClassName,
  theadClassName,
  tbodyClassName,
  trClassName,
  thClassName,
  tdClassName,
  emptyMessage = "No hay datos disponibles",
  columnWidths = {},
  excludeColumns = [],
  columnLabels = {},
  sortable = false,
}: ResponsiveTableProps<T>) {
  const [headers, setHeaders] = useState<string[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "ascending" | "descending" | null
  }>({ key: "", direction: null })

  const tableRef = useRef<HTMLTableElement>(null)

  // Extraer cabeceras de los datos
  useEffect(() => {
    if (data && data.length > 0) {
      const firstItem = data[0]
      const extractedHeaders = Object.keys(firstItem).filter((key) => !excludeColumns.includes(key))
      setHeaders(extractedHeaders)
    }
  }, [data, excludeColumns])

  // Aplicar anchos de columna desde th a td
  useEffect(() => {
    if (tableRef.current && headers.length > 0 && data.length > 0) {
      // Usar requestAnimationFrame para asegurarnos de que el DOM está listo
      const applyWidths = () => {
        const thElements = tableRef.current?.querySelectorAll("th")
        const tdRows = tableRef.current?.querySelectorAll("tbody tr")

        if (!thElements || !tdRows) return

        const widthMap: Record<string, number> = {}

        // Primero recopilamos todos los anchos
        thElements.forEach((th) => {
          const key = th.getAttribute("data-key")
          if (key) {
            widthMap[key] = th.offsetWidth
          }
        })

        // Luego aplicamos los anchos en una sola operación
        tdRows.forEach((row) => {
          headers.forEach((header) => {
            const td = row.querySelector(`td[data-key="${header}"]`)
            if (td && widthMap[header]) {
              if (td instanceof HTMLElement) {
                td.style.width = `${widthMap[header]}px`
              }
            }
          })
        })
      }

      // Usar setTimeout para asegurarnos de que el DOM está completamente renderizado
      const timeoutId = setTimeout(applyWidths, 0)
      return () => clearTimeout(timeoutId)
    }
  }, [headers, data.length]) // Solo dependemos de headers y data.length, no de data completo

  // Función para ordenar datos
  const sortedData =
    sortable && sortConfig.direction
      ? [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
      : data

  // Manejar clic en cabecera para ordenar
  const handleSort = (key: string) => {
    if (!sortable) return

    let direction: "ascending" | "descending" | null = "ascending"

    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending"
      } else if (sortConfig.direction === "descending") {
        direction = null
      }
    }

    setSortConfig({ key, direction })
  }

  // Renderizar indicador de ordenamiento
  const renderSortIndicator = (key: string) => {
    if (!sortable || sortConfig.key !== key) return null

    return (
      <span className="ml-1">
        {sortConfig.direction === "ascending" ? "↑" : sortConfig.direction === "descending" ? "↓" : ""}
      </span>
    )
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-4">{emptyMessage}</div>
  }

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table ref={tableRef} className={` w-full border-collapse ${tableClassName}`}>
        <thead className={`bg-muted ${theadClassName}`}>
          <tr className={` border-b ${trClassName}`}>
            {headers.map((header) => {
              const label = columnLabels[header] || header
              const width = columnWidths[header] || "auto"

              return (
                <th
                  key={header}
                  data-key={header}
                  className={`px-4 py-3 text-left font-medium text-muted-foreground ${sortable && "cursor-pointer hover:bg-muted/80"} ${thClassName}`}
                  style={{ width }}
                  onClick={() => handleSort(header)}
                >
                  {label}
                  {renderSortIndicator(header)}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className={`divide-y ${tbodyClassName}`}>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className={`border-b ${trClassName}`}>
              {headers.map((header) => (
                <td
                  key={`${rowIndex}- ${header} `}
                  data-key={header}
                  className={`px-4 py-3 ${tdClassName}`}
                  data-label={columnLabels[header] || header}
                >
                  {row[header]?.toString() || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
