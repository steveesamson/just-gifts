import { useEffect } from "react";
import { useToast } from "../context/notificationContenxt";
import Display from "./display-when";
import "./status.css";

const Status = () => {
  const { message, notify } = useToast();

  useEffect(() => {
    // hide status after 5 secs
    if (message) {
      setTimeout(() => notify(""), 5000);
    }
  }, [message, notify]);

  return (
    <Display when={!!message}>
      <section className="status-bar" onClick={() => notify("")}>
        <p>{message}</p>
        <span>tap to hide.</span>
      </section>
    </Display>
  );
};

export default Status;
