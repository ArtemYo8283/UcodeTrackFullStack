import { dataURLtoFile } from "./base64ToFile";

export const saveAsPNG = (canvas, projectInfo) => {
    const data64 = canvas.toDataURL('png')
    const file = dataURLtoFile(data64, projectInfo.project.mainInfo.title)
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = projectInfo.project.mainInfo.title;
    link.click();
    URL.revokeObjectURL(link.href);
  }