import { Group, Object3DEventMap } from "three";
import { GLTFExporter } from "three-stdlib";

export const download = async (group: Group<Object3DEventMap>) => {
  const exporter = new GLTFExporter();

  const glb = (await exporter.parseAsync(group, {
    binary: true,
  })) as ArrayBuffer;

  const link = document.createElement("a");
  link.style.display = "none";
  link.href = URL.createObjectURL(
    new Blob([glb], { type: "application/octet-stream" })
  );

  link.download = "avatar.glb";
  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(link.href);
};
