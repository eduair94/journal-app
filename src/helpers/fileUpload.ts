export const fileUpload = async(file: File): Promise<string|null> => {
    if(!file) return null;
    const cloudUrl = 'https://api.cloudinary.com/v1_1/react-journal-eduair/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'react-journal');

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })
        if(!resp.ok) throw new Error("Unable to upload file");
        const cloudResp = await resp.json();
        return cloudResp.secure_url;
    } catch(error) {
        console.error(error);
        throw new Error((error as {message: string}).message);
    }
}