"use client";import { NoteListItem } from "@/app/types";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const Modal = ({ params }: { params: { id: string } }) => {
  const [note, setNote] = useState<NoteListItem | null>(null);
  const router = useRouter();

  const getNote = async (noteId: string) => {
    const res = await fetch(
      `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    );

    const data: NoteListItem = await res.json();
    setNote(data);
  };

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };
  useLayoutEffect(() => {
    getNote(params.id);
  }, []);
  return (
    <Dialog.Root open onOpenChange={handleOnOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/70' />

        <Dialog.DialogContent className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div
            key={note?.id}
            className=' flex flex-col mx-auto w-3/4 h-full  bg-yellow-500 '>
            <div>{note?.title}</div>
            <div className='truncate'> {note?.description} </div>
            <div className='flex gap-3 justify-center items-center'>
              <div>{note?.created}</div>
              <div>{note?.updated}</div>
            </div>
          </div>
        </Dialog.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
