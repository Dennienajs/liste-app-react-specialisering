import React, { useState, useContext } from "react";
import moment from "moment";
import { firebase } from "../../firebase";
import { useValgtListeValue, AuthContext } from "../../context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TilføjPunkt = () => {
  const [punkt, setPunkt] = useState("");
  // @ts-ignore TODO: FIX LATER ***
  const { valgtListe } = useValgtListeValue();
  const { currentUser } = useContext(AuthContext);

  // Popop when punkt added successfully.
  const toastSuccess = () => {
    toast.success(`☑ Added to ${valgtListe.toLowerCase()} ☑`, {
      position: "top-center",
      autoClose: 1700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false
    });
  };

  const tilføjPunkt = () => {
    // Sætter dato til dagens dato.
    const dato = moment().format("YYYY/MM/DD HH:mm");

    // Empty Punkt input = return.
    if (!punkt) {
      return;
    }

    if (currentUser) {
      return (
        punkt.length > 0 &&
        firebase
          .firestore()
          .collection("punkter")
          .add({
            arkiveret: false,
            brugerId: currentUser.uid,
            dato, // dato:dato
            listeId: valgtListe,
            punkt // punkt:punkt
          })
          .then(() => {
            toastSuccess();
            setPunkt("");
          })
          .catch((err: Error) => console.error("ERROR: " + err))
      );
    } else {
      return window.alert("Please login.");
    }
  };

  return (
    <div className="tilføj-punkt" data-testid="tilføj-punkt">
      <input
        type="text"
        required={true}
        className="tilføj-punkt__input"
        value={punkt}
        onChange={event => setPunkt(event.target.value)}
        placeholder={`add to ${valgtListe.toLowerCase()}`}
        onKeyPress={event => {
          if (event.key === "Enter" && punkt.length > 0) {
            tilføjPunkt();
          }
        }}
        data-testid="tilføj-punkt-input"
        aria-label="tilføj punkt indhold"
      />
      <button
        type="button"
        className="tilføj-punkt__submit"
        onClick={() => tilføjPunkt()}
        onKeyDown={() => tilføjPunkt()}
        data-testid="tilføj-punkt-button"
        aria-label="Tilføj Punkt"
      >
        Add
      </button>
      <ToastContainer style={{ textAlign: "center" }} />
    </div>
  );
};
