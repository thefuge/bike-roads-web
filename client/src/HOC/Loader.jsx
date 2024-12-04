import React from "react";
import SpinnerUI from "../components/ui/SpinnerUI";

export default function Loader({ showSpinner, children }) {
  if (showSpinner) return <SpinnerUI />;
  return children;
}
