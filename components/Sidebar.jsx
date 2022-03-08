import React from "react";

export const Sidebar = ({ readings }) => (
  <>
    <p className="h2 greyBlue">⚡️ 1.4kW</p>
    <p className="darkgray mb2">Power draw</p>
    <p className="h2 greyBlue">☀️️ 5.8kW</p>
    <p className="darkgray mb2">Solar power production</p>
    <p className="h2 greyBlue">🔌️ 4.4kW</p>
    <p className="darkgray mb2">Fed into grid</p>
    <section className="h5 darkgray mb2">
      <h4 className="h4 mb1">Your devices:</h4>
      <div className="shadow-2 roundedMore bg-super-light-grey mb1">
        <p className="darkgray pl2 pt1 pb1">Air conditioner</p>
        <p className="h5 darkgray bold pl2 pb1 pt1 bg-very-light-grey">
          0.3093kW
        </p>
      </div>
      <div className="shadow-2 roundedMore bg-super-light-grey mb1">
        <p className="darkgray pl2 pt1 pb1">Wi-Fi router</p>
        <p className="h5 darkgray bold pl2 pb1 pt1 bg-very-light-grey">
          0.0033kW
        </p>
      </div>
      <div className="shadow-2 roundedMore bg-super-light-grey mb1">
        <p className="darkgray pl2 pt1 pb1">Humidifer</p>
        <p className="h5 darkgray bold pl2 pb1 pt1 bg-very-light-grey">
          0.0518kW
        </p>
      </div>
      <div className="shadow-2 roundedMore bg-super-light-grey mb1">
        <p className="darkgray pl2 pt1 pb1">Smart TV</p>
        <p className="h5 darkgray bold pl2 pb1 pt1 bg-very-light-grey">
          0.1276kW
        </p>
      </div>
      <div className="shadow-2 roundedMore bg-super-light-grey mb1">
        <p className="darkgray pl2 pt1 pb1">Diffuser</p>
        <p className="h5 darkgray bold pl2 pb1 pt1 bg-very-light-grey">
          0.0078kW
        </p>
      </div>
      <div className="shadow-2 roundedMore bg-super-light-grey mb1">
        <p className="darkgray pl2 pt1 pb1">Refrigerator</p>
        <p className="h5 darkgray bold pl2 pb1 pt1 bg-very-light-grey">
          0.0923kW
        </p>
      </div>
    </section>
  </>
);
