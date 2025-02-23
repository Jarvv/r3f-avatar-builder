import { WebGLRenderer } from "three";

export const screenshot = (gl: WebGLRenderer) => {
  const link = document.createElement("a");
  link.style.display = "none";

  link.href = gl.domElement
    .toDataURL("image/jpeg")
    .replace("image/jpeg", "image/octet-stream");

  link.download = "avatar.png";
  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(link.href);
};
