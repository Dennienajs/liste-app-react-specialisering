/* eslint-disable no-unused-vars */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Sidebar from "../containers/Sidebar";
import {
  ListerContext,
  ValgtListeContext,
  AuthContext,
  ThemeContext
} from "../context";
import { act } from "react-dom/test-utils";

beforeEach(cleanup);

describe("<Sidebar />", () => {
  describe("Success", () => {
    it("render <Sidebar />", () => {
      console.error = jest.fn().mockImplementation();
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider value={{ lister }}>
            <ValgtListeContext.Provider value="">
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("sidebar")).toBeTruthy();
    });

    // onClick & onKeyDown
    it("skifter den aktive liste til ALLE ('alle')", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("sidebar")).toBeTruthy();
      act(() => {
        fireEvent.click(queryByTestId("All-action"));
        fireEvent.keyDown(queryByTestId("All-action"));
      });

      expect(
        queryByTestId("All").classList.contains("aktivListe")
      ).toBeTruthy();
    });

    it("Open and close sidebar 'sidebar-toggle-egne-lister' with onClick", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("sidebar")).toBeTruthy();

      // Åben Lister
      act(() => {
        fireEvent.click(queryByTestId("sidebar-toggle-egne-lister"));
        // close igen
        fireEvent.click(queryByTestId("sidebar-toggle-egne-lister"));
      });
    });

    it("Open and close sidebar 'sidebar-toggle-egne-lister' with onKeyPress", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const visLister = true;
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe,
                visLister
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("sidebar")).toBeTruthy();

      act(() => {
        // Åben Lister
        fireEvent.keyDown(queryByTestId("sidebar-toggle-egne-lister"));
        // close igen
        fireEvent.keyDown(queryByTestId("sidebar-toggle-egne-lister"));
      });
    });

    it("Select egne-lister with onClick && onKeyDown", () => {
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      const lister = [{}];
      const setValgtListe = jest.fn(); // fireEvent.click "alle-action"
      const { queryByTestId } = render(
        <AuthContext.Provider value={{}}>
          <ListerContext.Provider
            value={{
              lister
            }}
          >
            <ValgtListeContext.Provider
              value={{
                setValgtListe
              }}
            >
              <ThemeContext.Provider
                value={{
                  theme,
                  dark,
                  toggle
                }}
              >
                <Sidebar />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("sidebar")).toBeTruthy();

      // Select egen liste som aktiv.
      expect(queryByTestId("sidebar-egne-lister")).toBeTruthy();
      act(() => {
        fireEvent.click(queryByTestId("sidebar-egne-lister"));
        fireEvent.keyDown(queryByTestId("sidebar-egne-lister"));
      });
    });
  });
});
