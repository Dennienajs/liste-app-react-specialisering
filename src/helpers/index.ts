import { firebase } from "../firebase";
import { defaultSidebarLister } from "../containers/Sidebar/defaultSidebarListerData";

// 06-12-2019 - removed unused + migrated to typescript.

// ***************************************************
// **Nedenstående er testet og i brug i Punkter.jsx **
// ***************************************************
// ***************************************************
// *********** TESTET OG I BRUG **********************
// ***************************************************
// ***************************************************

// Finder ud af om valgtListe existerer i DefaultLister
export const findDefaultListeMatch = (valgtListe: string) =>
  defaultSidebarLister.find(liste => liste.listeId === valgtListe);

//
// SLETPUNKT (Checkbox component)
export const sletPunkt = (id: string) => {
  const confirmation = window.confirm("Delete this todo?");
  if (confirmation) {
    // ændret fra ternary, da TSLint brokkede sig.
    firebase
      .firestore()
      .collection("punkter")
      .doc(id)
      // Herfra og ned til .update comment kan byttes.
      .delete()
      // .then(() => {
      //   window.alert("Task completed and deleted!");
      // })
      .catch((err: Error) => {
        console.error("Error deleting task: ", err);
        window.alert("Ooops, something went wrong. Please try again.");
      });
  }
};

// Bruges i Checkbox.
export const checkPunktDone = (arkiveret: boolean, id: string) => {
  !arkiveret ? arkiverPunktTrue(id) : arkiverPunktFalse(id);
};

// Bruges til "line-through" ved click på punkt.
export const arkiverPunktTrue = (id: string) => {
  if (id) {
    // Ændret fra ternary da TSLint brokkede sig.
    firebase
      .firestore()
      .collection("punkter")
      .doc(id)
      .update({
        arkiveret: true
      })
      .catch((err: Error) => {
        console.error("Error: ", err);
        window.alert("Ooops, something went wrong. Please try again.");
      });
  }
};

// Bruges til !"line-through" ved click på punkt.
export const arkiverPunktFalse = (id: string) => {
  if (id) {
    // Ændret fra ternary da ESLint brokkede sig.
    firebase
      .firestore()
      .collection("punkter")
      .doc(id)
      .update({
        arkiveret: false
      })
      .catch((err: Error) => {
        console.error("Error: ", err);
        window.alert("Ooops, something went wrong. Please try again.");
      });
  }
};

export const capitalizeString = (capString: string) => {
  return capString.charAt(0).toUpperCase() + capString.slice(1);
};
