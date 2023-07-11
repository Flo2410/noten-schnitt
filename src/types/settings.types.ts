//--------------------------------------------------------------------------------------------------------------------------------------------
// Enums
//--------------------------------------------------------------------------------------------------------------------------------------------

import { ActionMap } from "./context.types";

export enum SettingsPayloadType {
  INIT = "INIT_SETTINGS",
  UPDATE = "UPDATE_SETTINGS",
  RESET = "RESET_SETTINGS",
}

export enum DarkMode {
  DARK = "dark",
  LIGHT = "light",
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// Types
//--------------------------------------------------------------------------------------------------------------------------------------------
export type Settings = {
  darkmode: DarkMode;
};

export type SettingsPayload = {
  [SettingsPayloadType.INIT]: Settings;
  [SettingsPayloadType.UPDATE]: Partial<Settings>;
  [SettingsPayloadType.RESET]: Settings;
};

export type SettingsActions =
  ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];

//--------------------------------------------------------------------------------------------------------------------------------------------
// Constants
//--------------------------------------------------------------------------------------------------------------------------------------------

export const DEFAULT_SETTINGS: Settings = {
  darkmode: DarkMode.LIGHT,
};

export const SETTINGS_COOKIE_KEY = "settings";
