import React, { createContext, useReducer, Dispatch, useEffect, useState, ReactNode } from "react";
import {
  DarkMode,
  DEFAULT_SETTINGS,
  Settings,
  SettingsActions,
  SettingsPayloadType,
  SETTINGS_COOKIE_KEY,
} from "types/settings.types";

export const SettingsContext = createContext<{
  state: Settings;
  dispatch: Dispatch<SettingsActions>;
}>({
  state: DEFAULT_SETTINGS,
  dispatch: () => null,
});

const reducer = (state: Settings, action: SettingsActions) => {
  switch (action.type) {
    case SettingsPayloadType.INIT:
      return action.payload;
    case SettingsPayloadType.UPDATE:
      const updated_settings = { ...state, ...action.payload };

      // async
      localStorage.setItem(SETTINGS_COOKIE_KEY, JSON.stringify(updated_settings));

      return updated_settings;
    case SettingsPayloadType.RESET:
      return DEFAULT_SETTINGS;
  }
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_SETTINGS);
  const [system_dark_mode, setSystemDarkMode] = useState(false);

  const setDarkModeClass = (dark_mode: boolean) => {
    document.body.classList.toggle("dark", dark_mode);
    document.body.setAttribute("data-theme", dark_mode ? "dark" : "light");
  };

  useEffect(() => {
    const media_query = window.matchMedia("(prefers-color-scheme: dark)");

    // Load Settings
    const loadSettings = async () => {
      const value = await localStorage.getItem(SETTINGS_COOKIE_KEY);
      let settings: Settings = DEFAULT_SETTINGS;

      if (value) settings = JSON.parse(value);

      dispatch({ type: SettingsPayloadType.INIT, payload: settings });

      // event listener for system darkmode
      // media_query.addEventListener("change", (e: MediaQueryListEvent) => {
      //   setSystemDarkMode(e.matches);
      // });

      // setSystemDarkMode(media_query.matches);
    };
    loadSettings();
  }, []);

  useEffect(() => {
    // add "dark" class -> enables darkmode
    // if (state.darkmode === DarkMode.SYSTEM)
    //   setDarkModeClass(window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (state.darkmode === DarkMode.DARK) setDarkModeClass(true);
    else if (state.darkmode === DarkMode.LIGHT) setDarkModeClass(false);
  }, [state.darkmode]);

  // useEffect(() => {
  //   if (state.darkmode === DarkMode.SYSTEM) setDarkModeClass(system_dark_mode);
  // }, [system_dark_mode]);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>{children}</SettingsContext.Provider>
  );
};
