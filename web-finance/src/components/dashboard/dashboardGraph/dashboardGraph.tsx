import { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import useDemoConfigGraph from "../../../services/graph/graph";

export const DashboardGraph = () => {
  const { data } = useDemoConfigGraph({
    series: 1,
    dataType: "time",
    resizable: true,
    interactionMode: "primary",
  });

  const primaryAxis = useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as Date,
    }),
    []
  );

  const secondaryAxes = useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        stacked: true,
        // OR
        // elementType: "area",
      },
    ],
    []
  );

  return (
    <>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </>
  );
}
