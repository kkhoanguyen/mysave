'use client';
import React, { useState, useCallback } from 'react';
import CreateVideoModal from './CreateVideoModal';
import { Button } from 'react-daisyui';


export interface Props {
  onCreateDone: () => void;
}
export default function CreateVideo({ onCreateDone }: Props
) {

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        color="primary"
        onClick={() => setOpen(true)}>
        Create Video
      </Button>
      <CreateVideoModal open={open} onClose={handleClose} onCreateDone={onCreateDone} />
    </div >
  );
}
