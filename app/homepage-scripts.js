"use client";

import { useEffect } from "react";

const scripts = ["/js/config.js", "/js/poster-studio.js", "/js/site.js"];

export default function HomepageScripts() {
  useEffect(() => {
    let active = true;

    async function loadScript(source) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = source;
        script.async = false;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Unable to load ${source}`));
        document.body.appendChild(script);
      });
    }

    async function initialize() {
      try {
        for (const source of scripts) {
          if (!active) return;
          await loadScript(source);
        }
      } catch (error) {
        console.error("The SFAG website could not initialize.", error);
      }
    }

    initialize();
    return () => {
      active = false;
    };
  }, []);

  return null;
}
