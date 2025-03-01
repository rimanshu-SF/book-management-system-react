import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import Button from "../components/Button";


describe("Home Component", () => {
  it("renders Home component correctly", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    expect(screen.getByText("READ YOUR FAVORITE ONE")).toBeInTheDocument();
    expect(screen.getByText("1000+ Loved by")).toBeInTheDocument();
    expect(
      screen.getByText("Our Readers are not customer, They are supporter.")
    ).toBeInTheDocument();
    expect(screen.getByText("Start Reading...")).toBeInTheDocument();
  });

  it("checks if the 'Start Reading...' button is enabled and clickable", () => {
    render(
      <MemoryRouter>
        <Button label="Start Reading..." disabled={false} />
      </MemoryRouter>
    );
    
    const startButton = screen.getByText("Start Reading...");
    expect(startButton).toBeEnabled();
    fireEvent.click(startButton);
  });
  
  it("renders the second section correctly", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    expect(
      screen.getByText("Trying to give you an easy way to Read your Favorites 🫀 🕮")
    ).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
  });
});
