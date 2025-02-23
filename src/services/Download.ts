import { Group, Object3DEventMap } from "three";
import { GLTFExporter } from "three-stdlib";
import { NodeIO } from "@gltf-transform/core";
import { prune, dedup, quantize } from "@gltf-transform/functions";
import {
  KHRMaterialsSpecular,
  KHRMeshQuantization,
} from "@gltf-transform/extensions";

export const download = async (group: Group<Object3DEventMap>) => {
  const exporter = new GLTFExporter();

  const data = (await exporter.parseAsync(group, {
    binary: true,
  })) as ArrayBuffer;

  const io = new NodeIO().registerExtensions([
    KHRMeshQuantization,
    KHRMaterialsSpecular,
  ]);

  const doc = await io.readBinary(new Uint8Array(data));

  await doc.transform(prune(), dedup(), quantize());

  const glb = await io.writeBinary(doc);

  const link = document.createElement("a");
  link.style.display = "none";

  link.href = URL.createObjectURL(
    new Blob([glb], { type: "application/octet-stream" })
  );

  link.download = "avatar.glb";
  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
};
