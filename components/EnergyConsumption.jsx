import React, { useEffect } from "react";
import renderChart from "../chart.js";

export const EnergyConsumption = ({ readings }) => {
  useEffect(() => {
    renderChart(readings)
  }, [])

  return (
    <>
      <h1
        role="heading"
        aria-level={1}
        className="regular darkgray line-height-1 mb3"
      >
        Energy consumption
      </h1>
      <section className="mb3">
        <button
          className="
              h5
              inline-block
              shadow-2
              pl2
              pr2
              pt1
              pb1
              roundedMore
              border-grey
              bg-blue
              white
              bold
            "
        >
          Last 30 days
        </button>
      </section>
      <section className="chartHeight mb3">
        <canvas id="usageChart"></canvas>
      </section>
    </>
  )
}
