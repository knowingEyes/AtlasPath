import { useCities } from "@/hooks/useCities";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "./ui/button";
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@/assets/icons/icons";
import { Input } from "./ui/input";

export function DropdownMenuDialog() {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const { id } = useParams();
  const { handleDelete, handleEdit, visitedCities } = useCities();
  const [newNote, setNewNote] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setNewNote(visitedCities.find((city) => city.id === id)?.note || "");
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full bg-gradient-to-r from-[#121212] to-[#3c3c3c] h-[38px] w-[38px]">
            <EllipsisVerticalIcon className="" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-3">
          <DropdownMenuItem onSelect={() => setShowNewDialog(true)}>
            <PencilSquareIcon /> Edit note
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowAlertDialog(true)}
            className="text-red-400"
          >
           <TrashIcon className="text-red-400"/> Delete city
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit city note</DialogTitle>
            <DialogDescription>
              Provide a new note for your city. Click Update note when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(id, newNote);
              setShowNewDialog(false);
            }}
          >
            <FieldGroup className="pb-3">
              <Field>
                <FieldLabel htmlFor="filename">New note</FieldLabel>
                <Input
                  id="filename"
                  name="filename"
                  placeholder="New note..."
                  value={newNote}
                  required
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Update note</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              city.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDelete(id);
                navigate(-1);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
