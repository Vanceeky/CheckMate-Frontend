"use client";
import { useEffect } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function TopLoader() {

  useEffect(() => {
    const originalDone = ProgressBar.prototype.done;
    ProgressBar.prototype.done = function () {
      setTimeout(() => originalDone.call(this), 400); // hold for 400ms
    };
  }, []);
  return (
    <ProgressBar
      height="3px"
      color="#4f46e5"
      options={{
        showSpinner: false,
        trickleSpeed: 100, // default 200ms → lower is faster trickle
      }}
      shallowRouting
    />
  );
}
