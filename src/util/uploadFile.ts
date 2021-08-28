import { FileUpload } from "graphql-upload";
// import { createWriteStream } from 'fs'
// import path from 'path'

export const uploadFile = async (file:FileUpload):Promise<string> => {
    const { createReadStream } = await file;

    const url:string = await new Promise((res, rej) => {
        let chunks:any[] = [];
        let totalBytesInBuffer = 0;
        createReadStream()
            .on('data', (data) => {
                chunks.push(data);
                totalBytesInBuffer += data.length;
            }).on('end', () => {
                res(Buffer.concat(chunks, totalBytesInBuffer).toString('base64'));
            }).on('error', rej);

        // store image in file
        // const destinationPath = path.join(__dirname, '/../../images/', filename)
        // createReadStream()
        //     .on('readable', () => {
        //         let chunk;
        //         while( null !== (chunk = createReadStream().read())) {
        //             chunks.push(chunk);
        //         }
        //     })
        // .pipe(createWriteStream(destinationPath))
            // .on('error', rej)
            // .on('finish', () => {
            //     // Do your custom business logic
            //     res(destinationPath);
            //     // // Delete the tmp file uploaded
            //     // unlink(destinationPath, () => {
            //     //     res('your image url..')
            //     // })
            // })
    })

    return url;
}