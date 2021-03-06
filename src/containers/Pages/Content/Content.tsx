import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../../Sidebar";
import Punkter from "../../../components/Punkter";
import ButtonToggleSidebar from "./ButtonToggleSidebar";
import { ThemeContext, AuthContext } from "../../../context";
import { Link } from "react-router-dom";
import { SortPunkterDropdown } from "./SortPunkterDropdown";

export const Content = () => {
  const { currentUser } = useContext(AuthContext);
  const [visSidebar, setVisSidebar] = useState(true);
  const { theme } = useContext(ThemeContext);
  const [sortBy, setSortBy] = useState("All"); // "All", "Done", "Active"

  // Sjkuler sidebaren ved første render, hvis man ikke er logget ind.
  useEffect(() => {
    currentUser ? setVisSidebar(true) : setVisSidebar(false);
  }, [currentUser]); // Den vil have "visSidebar" i denpendency arrayet, men det vil give et infinite loop. Logikken virker som den skal nu.

  return (
    <section
      data-testid="content"
      className="content"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color
      }}
    >
      <ButtonToggleSidebar visSidebar={visSidebar} setVisSidebar={setVisSidebar} />
      <SortPunkterDropdown sortBy={sortBy} setSortBy={setSortBy} />

      {visSidebar ? <Sidebar /> : null}

      {currentUser ? (
        <>
          <Punkter sortBy={sortBy} setSortBy={setSortBy} visSidebar={visSidebar} />
        </>
      ) : (
        <div
          data-testid="content__not-signed-in"
          className="content__not-signed-in"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color
          }}
        >
          <p>Du skal logge ind for at kunne se punkter.</p>
          <p>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Opret</Link>
          </p>
        </div>
      )}
    </section>
  );
};
