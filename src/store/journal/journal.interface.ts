export interface FileImageI {
    url: string;
    type: string;
    name: string;
}
export interface JournalNoteNewI {
    id?:string;
    title: string;
    body: string;
    date: number;
    imageUrls: (FileImageI | string)[],
}

export type JournalNoteI = {
    id: string;
} & JournalNoteNewI