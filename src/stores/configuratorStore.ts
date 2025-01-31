import { create } from "zustand";

import { AvatarSlice, createAvatarSlice } from "@/stores/avatarSlice";
import {
  createCustomisationSlice,
  CustomisationSlice,
} from "@/stores/customisationSlice";

export const useConfiguratorStore = create<CustomisationSlice & AvatarSlice>(
  (...a) => ({
    ...createCustomisationSlice(...a),
    ...createAvatarSlice(...a),
  })
);
