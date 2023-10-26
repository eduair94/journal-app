export const fileUpload = async(file: File): Promise<string> => {
    if(!file) throw new Error("File doesn't exists")
    const cloudUrl = 'https://api.cloudinary.com/v1_1/react-journal-eduair/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })
        if(!resp.ok) throw new Error("Unable to upload file");
        const cloudResp = await resp.json();
        return cloudResp.secure_url;
    } catch(error) {
        console.log(error);
        throw new Error((error as {message: string}).message);
    }
}