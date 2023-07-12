"use client";

import {
  DEFAULT_SETTINGS,
  SETTINGS_COOKIE_KEY,
  SettingsStore,
} from "types/settings.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_SETTINGS,
      update: (setting) => {
        set({ settings: { ...get().settings, ...setting } });
      },
    }),
    {
      name: SETTINGS_COOKIE_KEY,
    }
  )
);
