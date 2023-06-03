import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@/lib/mui-tailwind";

interface Props {
  open: boolean;
  handlerOpen: (state: boolean) => void;
  predict: string;
}

export default function DialogPredict({ open, handlerOpen, predict }: Props) {
  const handleOpen = () => handlerOpen(!open);
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Hasil Prediksi</DialogHeader>
      <DialogBody divider>
        Hasil Prediksi menandakan anda{" "}
        <span
          className={`text-bold capitalize ${
            predict.toLowerCase() === "stroke"
              ? "text-red-600"
              : "text-green-500"
          }`}
        >
          {predict}
        </span>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Tutup</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
