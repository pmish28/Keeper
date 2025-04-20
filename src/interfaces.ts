import React, { SetStateAction } from "react";


export interface NoteItem{
    id: number;
    title: string;
    content: string;
    // setNoteValue?: React.Dispatch<React.SetStateAction<NoteValue>>;
    onDelete?: (id: number)=>void;
  }

  // export interface NoteValue{
  //   title: string;
  //   content: string;
  // }