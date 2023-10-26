export interface JournalNoteNewI {
    id?:string;
    title: string;
    body: string;
    date: number;
    imageUrls: string[],
}

export type JournalNoteI = {
    id: string;
} & JournalNoteNewI