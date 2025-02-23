import { StateCreator } from "zustand";
import { MeshStandardMaterial } from "three";

export interface AvatarSlice {
  pose: string;
  poses: string[];
  skin: MeshStandardMaterial;
  setPose: (pose: string) => void;
  setPoses: (poses: string[]) => void;
  updateSkin: (color: string) => void;
}

export const createAvatarSlice: StateCreator<AvatarSlice> = (set, get) => ({
  pose: "",
  poses: [],
  skin: new MeshStandardMaterial({ color: "#FCE3D4", roughness: 1 }),
  setPose: (pose) => set({ pose }),
  setPoses: (poses) => set({ poses }),
  updateSkin: (color: string) => {
    get().skin.color.set(color);
  },
});
