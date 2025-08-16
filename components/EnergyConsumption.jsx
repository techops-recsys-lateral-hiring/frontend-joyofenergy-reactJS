import React, { useEffect } from "react";
import { renderChart } from "../utils/chart.js";
import { groupByDay, sortByTime, calculateCostOfConsumption, calculateLast30DaysConsumption, calculateFootprint } from "../utils/reading";
import { EnergyCard } from "./EnergyCard.jsx";

export const EnergyConsumption = ({ readings }) => {
  const containerId = "usageChart";

  const energyCards = [
    {
      title: "Cost",
      icon: <>💰</>,
      value: `${calculateCostOfConsumption(readings)}`,
      description: "$"
    },
    {
      title: "Consumption",
      icon: <>⚡</>,
      value: `${calculateLast30DaysConsumption(readings)}`,
      description: "kWh"
    },

    {
      title: "Footprint",
      icon: <>👟</>,
      value: `${calculateFootprint(readings)}`,
      description: "tonnes"
    }
  ];

  useEffect(() => {
    renderChart(containerId, sortByTime(groupByDay(readings)).slice(-30));
  }, []);

  return (
    <>
      <h1 className="regular darkgray line-height-1 mb3">Energy consumption</h1>
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
        <canvas id={containerId} />
      </section>
      <section className="flex full-width pt1" style={{ gap: "2rem" }}>
        {energyCards.map((card, index) => (
          <EnergyCard
            key={index}
            title={card.title}
            icon={card.icon}
            value={card.value}
            description={card.description}
          />
        ))}
      </section>
    </>
  );
};
