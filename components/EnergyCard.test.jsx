import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EnergyCard } from "./EnergyCard";

describe("EnergyCard", () => {
  const defaultProps = {
    title: "Test Title",
    icon: <span>⚡</span>,
    value: "123",
    description: "kWh"
  };

  it("should render with correct CSS classes", () => {
    const { container } = render(<EnergyCard {...defaultProps} />);
    const cardDiv = container.firstChild;

    expect(cardDiv).toHaveClass("bg-super-light-grey");
    expect(cardDiv).toHaveClass("shadow-2");
    expect(cardDiv).toHaveClass("roundedMore");
    expect(cardDiv).toHaveClass("py1");
    expect(cardDiv).toHaveClass("px2");
    expect(cardDiv).toHaveClass("flex");
    expect(cardDiv).toHaveClass("flex-column");
  });

  it("should have full width styling", () => {
    const { container } = render(<EnergyCard {...defaultProps} />);
    const cardDiv = container.firstChild;

    expect(cardDiv).toHaveStyle({ width: '100%' });
  });


  describe("#title prop", () => {
    it.each(["Test Title", "Test Title 2", "Test Title 3"])("should render the given title", (title) => {
      render(<EnergyCard {...defaultProps} title={title} />);

      expect(screen.getByText(title)).toBeInTheDocument();
    });

    it("should render title with correct classes", () => {
      render(<EnergyCard {...defaultProps} />);
      const titleElement = screen.getByText("Test Title");

      expect(titleElement).toHaveClass("h5");
      expect(titleElement).toHaveClass("darkgray");
      expect(titleElement).toHaveClass("bold");
      expect(titleElement).toHaveClass("mr1");
    });
  })

  describe("#icon prop", () => {
    it.each([{ icon: <>💰</>, expected: "💰" },
    { icon: <>⚡</>, expected: "⚡" },
    { icon: <>👟</>, expected: "👟" }])("should render the given icon", ({ icon, expected }) => {
      render(<EnergyCard {...defaultProps} icon={icon} />);

      expect(screen.getByText(expected)).toBeInTheDocument();
    });

    it("should render icon with no classes", () => {
      render(<EnergyCard {...defaultProps} />);
      const titleElement = screen.getByText("⚡");

      expect(titleElement).not.toHaveClass();
    });
  })

  describe("#value prop", () => {
    it.each(["Value 1", "Value 2", "Value 3"])("should render the given value", (value) => {
      render(<EnergyCard {...defaultProps} value={value} />);

      expect(screen.getByText(value)).toBeInTheDocument();
    });

    it("should render value with correct classes", () => {
      render(<EnergyCard {...defaultProps} />);
      const valueElement = screen.getByText("123");

      expect(valueElement).toHaveClass("h3");
      expect(valueElement).toHaveClass("darkgray");
    });
  })


  describe("#description prop", () => {
    it.each(["Description 1", "Description 2", "Description 3"])("should render the given description", (description) => {
      render(<EnergyCard {...defaultProps} description={description} />);

      expect(screen.getByText(description)).toBeInTheDocument();
    });

    it("should render description with correct classes", () => {
      render(<EnergyCard {...defaultProps} />);
      const descriptionElement = screen.getByText("kWh");

      expect(descriptionElement).toHaveClass("h5");
      expect(descriptionElement).toHaveClass("darkgray");
    });
  })
});