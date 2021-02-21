
export function convertToCSV(objArray: any) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let firstRor = true;

    for (let i = 0; i < array.length; i++) {
        let line = '';
        if (firstRor) {
            for (const index in array[i]) {
                if (line !== '') {
                    line += ',';
                }

                line += index;
            }
            str += line + '\r\n';
            line = '';
            firstRor = false;
        }
        for (const index in array[i]) {
            if (line !== '') {
                line += ',';
            }

            line += array[i][index].data;
        }

        str += line + '\r\n';
    }

    return str;
}

export function crateFileFromStringAnDownload(text: string) {
    const data = new Blob([text], {type: 'text/plain'});

    const url = window.URL.createObjectURL(data);
    const element: any = document.getElementById('download_link');
    element.href = url;
}
