/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import "./dialog.css";
import Display from "./display-when";

// Progress bar
export const Progress = ({ text, open = false, percent = 0 }) => {
  const progressRef = useRef();

  useEffect(() => {
    const { current: progress } = progressRef;
    if (progress) {
      progress.style.width = `${percent}%`;
    }
  }, [percent]);

  return (
    <Display when={open}>
      <section className="dialog-back-drop">
        <fieldset className="dialog">
          <div className="progress">
            <div className="progress-bar" ref={progressRef}></div>
          </div>
          <p>{text}</p>
        </fieldset>
      </section>
    </Display>
  );
};

// Infinite Loader
export const Loader = ({ text, open = false }) => {
  const progressRef = useRef();
  // Infinite loader
  useEffect(() => {
    const { current: progress } = progressRef;
    let to;
    if (progress) {
      let percent = 0;
      const tick = () => {
        ++percent;
        if (percent >= 100) {
          percent = 0;
        }
        progress.style.width = `${percent}%`;
        to = setTimeout(tick, 100);
      };
      to = setTimeout(tick, 100);
    }
    // Clear on unmount
    return () => to && clearTimeout(to);
  }, []);

  return (
    <Display when={open}>
      <section className="dialog-back-drop">
        <fieldset className="dialog">
          <div className="progress">
            <div className="progress-bar" ref={progressRef}></div>
          </div>
          <p>{text}</p>
        </fieldset>
      </section>
    </Display>
  );
};

// Prompt/Confirm
export const Prompt = ({
  text,
  title = "Confirm",
  open = false,
  onYes,
  onNo,
}) => {
  return (
    <Display when={open}>
      <section className="dialog-back-drop">
        <fieldset className="prompt">
          <h1>{title}</h1>
          <p>{text}</p>
          <div className="submit columns prompt-buttons">
            <button className="primary" type="button" onClick={onYes}>
              Yes
            </button>
            <button className="secondary" type="button" onClick={onNo}>
              No
            </button>
          </div>
        </fieldset>
      </section>
    </Display>
  );
};

// Modal
export const Modal = ({ children, open = false }) => {
  return (
    <Display when={open}>
      <section className="dialog-back-drop">
        <fieldset className="dialog modal">{children}</fieldset>
      </section>
    </Display>
  );
};
