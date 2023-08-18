import { NoteListItem } from "@/app/types";
import Link from "next/link";
async function getNote(noteId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
  );

  const data: NoteListItem = await res.json();
  return data;
}

async function NotePage({ params }: { params: { id: string } }) {
  const note = await getNote(params.id);

  return (
    <div className='flex flex-col gap-3 justify-center items-center'>
      <div>
        <Link href={"/notes"}>notes</Link>/{note.title}
      </div>
      <div
        key={note.id}
        className='w-1/3 h-full bg-yellow-500 overflow-hidden '>
        <div>{note.title}</div>
        <div className='truncate'> {note.description} </div>
        <div className='flex gap-3 justify-center items-center'>
          <div>{note.created}</div>
          <div>{note.updated}</div>
        </div>
      </div>
    </div>
  );
}

export default NotePage;
