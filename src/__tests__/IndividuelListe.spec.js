import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import {
  ListerContext,
  ValgtListeContext,
  AuthContext,
  ThemeContext
} from "../context";
import IndividuelListe from "../components/IndividuelListe";
import { act } from "react-dom/test-utils";
import { firebase } from "../firebase";

beforeEach(cleanup);

// sletListe() mock
jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() => Promise.resolve("Promise resolved .."))
        }))
      }))
    }))
  }
}));

describe("<IndividuelListe />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("render <IndividuelListe />", () => {
      // Lister
      const lister = [{}];
      const setLister = jest.fn();
      // ValgtListe
      const setValgtListe = jest.fn();
      // Theme
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      // IndividuelListe
      const liste = { navn: "", docId: "", listeId: "" };
      const aktivListe = "";
      const setAktivListe = jest.fn();

      const { queryByTestId } = render(
        <ListerContext.Provider value={{ lister, setLister }}>
          <ValgtListeContext.Provider value={{ setValgtListe }}>
            <ThemeContext.Provider value={{ theme, dark, toggle }}>
              <IndividuelListe
                liste={liste}
                aktivListe={aktivListe}
                setAktivListe={setAktivListe}
              />
            </ThemeContext.Provider>
          </ValgtListeContext.Provider>
        </ListerContext.Provider>
      );
      expect(queryByTestId("individuel-liste")).toBeTruthy();
    });

    // CONFIRM SLET LISTE = TRUE (resolver promise)
    it("render <IndividuelListe /> confirmer sletListe og sletter liste med success", () => {
      firebase.firestore.mockImplementation(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn(() => ({
            delete: jest.fn(() => Promise.resolve("Promise resolved."))
          }))
        }))
      }));
      // Auth
      const currentUser = { email: "user@email.com", uid: "123" };
      // Lister
      const lister = [{}];
      const setLister = jest.fn();
      // ValgtListe
      const setValgtListe = jest.fn();
      // Theme
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      // IndiciduelListe
      const liste = {
        navn: "someListe",
        docId: "001",
        listeId: "25" // Skal være === aktivListe
      };
      const aktivListe = "25"; // Skal være === listeId
      const setAktivListe = jest.fn();
      // confirmSletListe
      window.confirm = jest.fn().mockImplementation(() => true);

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider value={{ lister, setLister }}>
            <ValgtListeContext.Provider value={{ setValgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <IndividuelListe
                  liste={liste}
                  aktivListe={aktivListe}
                  setAktivListe={setAktivListe}
                />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      // individuel-liste-delete = data-testid på listens slet-knap.
      expect(queryByTestId("individuel-liste-delete")).toBeTruthy();
      // trykker på slet
      act(() => {
        fireEvent.click(queryByTestId("individuel-liste-delete"));
      });
    });
    // CONFIRM SLET SLET = TRUE (rejecter promise)
    it("render <IndividuelListe /> confirmer sletListe og sletter liste med fejl", () => {
      firebase.firestore.mockImplementation(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn(() => ({
            delete: jest.fn(() => Promise.reject("Promise rejected."))
          }))
        }))
      }));
      window.alert = jest.fn().mockImplementation(); // til reject, catch
      console.error = jest.fn().mockImplementation(); // så vi ikke får noget i consolen
      // Auth
      const currentUser = { email: "user@email.com", uid: "123" };
      // Lister
      const lister = [{}];
      const setLister = jest.fn();
      // ValgtListe
      const setValgtListe = jest.fn();
      // Theme
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      // IndiciduelListe
      const liste = {
        navn: "someListe",
        docId: "001",
        listeId: "25" // Skal være === aktivListe
      };
      const aktivListe = "25"; // Skal være === listeId
      const setAktivListe = jest.fn();
      // confirmSletListe
      window.confirm = jest.fn().mockImplementation(() => true);

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider value={{ lister, setLister }}>
            <ValgtListeContext.Provider value={{ setValgtListe }}>
              <ThemeContext.Provider value={{ theme, dark, toggle }}>
                <IndividuelListe
                  liste={liste}
                  aktivListe={aktivListe}
                  setAktivListe={setAktivListe}
                />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      // individuel-liste-delete = data-testid på listens slet-knap.
      expect(queryByTestId("individuel-liste-delete")).toBeTruthy();
      // trykker på slet
      act(() => {
        fireEvent.click(queryByTestId("individuel-liste-delete"));
      });
    });

    // CONFIRM SLETLISTE = FALSE
    it("render <IndividuelListe /> fortryder sletListe.", () => {
      // Auth
      const currentUser = {
        email: "user@email.com"
      };
      // Lister
      const lister = [{}];
      const setLister = jest.fn();
      // ValgtListe
      const setValgtListe = jest.fn();
      // Theme
      const theme = {};
      const dark = true;
      const toggle = jest.fn();
      // IndiciduelListe
      const liste = {
        navn: "someListe",
        docId: "001",
        listeId: "25" // Skal være === aktivListe
      };
      const aktivListe = "25"; // Skal være === listeId
      const setAktivListe = jest.fn();
      // confirmSletListe
      window.confirm = jest.fn().mockImplementation(() => false); // CONFIRM = FALSE

      const { queryByTestId } = render(
        <AuthContext.Provider value={{ currentUser }}>
          <ListerContext.Provider
            value={{
              lister,
              setLister
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
                <IndividuelListe
                  liste={liste}
                  aktivListe={aktivListe}
                  setAktivListe={setAktivListe}
                />
              </ThemeContext.Provider>
            </ValgtListeContext.Provider>
          </ListerContext.Provider>
        </AuthContext.Provider>
      );
      expect(queryByTestId("individuel-liste-delete")).toBeTruthy();
      act(() => {
        fireEvent.click(queryByTestId("individuel-liste-delete"));
      });
    });
  });
});
