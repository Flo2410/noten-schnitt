import { getNoten } from "helper/apicalls_v2";
import { getNoten as getNoten_v1 } from "helper/apicalls";
import { NotenStore } from "types/noten.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import moment from "moment";

export const useNotenStore = create<NotenStore>()(
  persist(
    (set, get) => ({
      noten: [],
      init: async (user_v1, user_v2) => {
        const noten_v1 = await getNoten_v1(user_v1).catch(() => {
          throw new Error("Error fetching grades from intranet");
        });

        const noten_v2 = await getNoten(
          (({ cookies, student_pkz }) => ({ cookies, student_pkz }))(user_v2)
        ).catch(() => {
          throw new Error("Error fetching grades from cis");
        });

        // filter duplicates
        const noten_v2_filtered = noten_v2.filter(
          (note_v2) =>
            noten_v1.filter((note_v1) => note_v1.semester === note_v2.semester).length === 0
        );

        let noten = [...noten_v1, ...noten_v2_filtered]; // combine grades from v1 and v2

        // noten.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        noten.sort(
          (a, b) => moment(b.date, "DD.MM.YYYY").unix() - moment(a.date, "DD.MM.YYYY").unix()
        );

        set({ noten });
      },
      update_note: (note) => {
        const unmodified_note = get().noten.find((item) => item.internal_id === note.internal_id);
        if (!unmodified_note) return;

        const updated_note = { ...unmodified_note, ...note };

        const updated_noten = get().noten.map((note) =>
          note.internal_id === updated_note.internal_id ? updated_note : note
        );

        set({ noten: updated_noten });
      },
      update: (noten) => {
        set({ noten });
      },
      clear: () => set({ noten: [] }),
    }),
    { name: "noten" }
  )
);
