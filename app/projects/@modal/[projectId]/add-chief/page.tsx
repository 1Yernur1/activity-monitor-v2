"use client";

import { Dialog, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function AddChiefModal() {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(true);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setTimeout(() => router.back(), 100);
  };

  return (
    <Dialog open={isOpenModal} onClose={handleCloseModal}>
      <DialogTitle>Add Extra Chief Editor</DialogTitle>
    </Dialog>
  );
}