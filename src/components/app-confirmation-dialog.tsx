/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useAppStore } from "@/store/app-store";
import { AppButton } from "./app-buttom";

type props = {
  title?: string;
  description?: string;
};

export default function AppConfirmationDialog({ title, description }: props) {
  const store = useAppStore();

  const handleYes = () => {
    if (store.confirmationDialogCallBackFunc) {
      store.confirmationDialogCallBackFunc();
      store.resetConfirmationDialogCallBackFunc();
    }
  };

  const handleCancel = () => {
    store.resetConfirmationDialogCallBackFunc();
  };

  return (
    <Dialog
      open={store.openConfirmationDialog}
      onOpenChange={(_res) => store.resetConfirmationDialogCallBackFunc()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title ? title : "Are you absolutely sure?"}
          </DialogTitle>
          <DialogDescription>
            {description
              ? description
              : `This action cannot be undone. This will permanently delete this data from the servers.`}
          </DialogDescription>
        </DialogHeader>
        <div className=" flex justify-between">
          <AppButton
            variant={"outline"}
            className="min-w-20"
            onClick={handleCancel}
          >
            Cancel
          </AppButton>
          <AppButton
            variant={"default"}
            className="min-w-20"
            onClick={handleYes}
          >
            Yes
          </AppButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
