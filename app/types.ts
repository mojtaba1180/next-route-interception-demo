export interface NoteListTypes {
    items: NoteListItem[];
}
export interface NoteListItem {
    id: string;
    title: string;
    description: string;
    created: string;
    updated: string;
}