import fs from 'fs';
export const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    fs.writeFile(filename, u8arr, { type: mime }, (err) => {
        if (err) {
            console.error(err);
        }
    });
}