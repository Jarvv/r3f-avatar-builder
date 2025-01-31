import { StateCreator } from "zustand";
import { MeshStandardMaterial } from "three";

export interface AvatarSlice {
  skin: MeshStandardMaterial;
  updateSkin: (color: string) => void;
}

export const createAvatarSlice: StateCreator<AvatarSlice> = (_, get) => ({
  skin: new MeshStandardMaterial({ color: "#FCE3D4", roughness: 1 }),
  updateSkin: (color: string) => {
    get().skin.color.set(color);
  },
});
