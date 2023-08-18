import Link from "next/link";import { NoteListTypes } from "../types";
import CreateNote from "./CreateNote";
async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records?page=1",
    { cache: "no-store" },
  );

  const data: NoteListTypes = await res.json();
  return data?.items;
}

async function NotesPage() {
  const notes = await getNotes();
  return (
    <div className='flex flex-col'>
      <h1>Notes</h1>
      <div className='grid grid-cols-3 gap-3'>
        {notes?.map((note) => (
          <Link
            href={`/single-note/${note.id}`}
            key={note.id}
            className='w-full h-32 bg-yellow-500 overflow-hidden '>
            <div>{note.title}</div>
            <div className='truncate'> {note.description} </div>
            <div className='flex gap-3 justify-center items-center'>
              <div>{note.created}</div>
              <div>{note.updated}</div>
            </div>
          </Link>
        ))}
      </div>
      <CreateNote />
    </div>
  );
}

export default NotesPage;
