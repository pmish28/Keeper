import React, { SetStateAction } from "react";


export interface NoteItem{
    key: number;
    title: string;
    content: string;
    setNoteValue?: React.Dispatch<React.SetStateAction<NoteValue>>;
  }

  export interface NoteValue{
    title: string;
    content: string;
  }