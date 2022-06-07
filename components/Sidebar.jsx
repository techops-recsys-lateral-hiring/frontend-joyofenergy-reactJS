import React from "react";

const DeviceSection = ({ title, usage }) => (
  <div className="shadow-2 roundedMore bg-super-light-grey mb1">
    <p className="darkgray pl2 pt1 pb1">{title}</p>
    <p className="h5 darkgray bold pl2 pb1 pt1 bg-very-light-grey">{usage}</p>
  </div>
);

const SummarySection = ({ summary, subtitle }) => (
  <>
    <h2 className="h2 greyBlue">{summary}</h2>
    <p className="darkgray mb2">{subtitle}</p>
  </>
);
export const Sidebar = () => (
  <>
    <SummarySection summary="⚡️ 1.4kW" subtitle="Power draw" />
    <SummarySection summary="☀️️ 5.8kW" subtitle="Solar power production" />
    <SummarySection summary="🔌️ 4.4kW" subtitle="Fed into grid" />

    <section className="h5 darkgray mb2">
      <h4 className="h4 mb1">Your devices:</h4>
      <DeviceSection title="Air conditioner" usage="0.3093kW" />
      <DeviceSection title="Wi-Fi router" usage="0.0033kW" />
      <DeviceSection title="Humidifer" usage="0.0518kW" />
      <DeviceSection title="Smart TV" usage="0.1276kW" />
      <DeviceSection title="Diffuser" usage="0.0078kW" />
      <DeviceSection title="Refrigerator" usage="0.0923kW" />
    </section>
  </>
);
