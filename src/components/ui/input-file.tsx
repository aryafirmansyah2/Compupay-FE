import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { File, FileSpreadsheet, X } from "lucide-react";
import { Progress } from "./progress";
import { Button } from "./button";
import { Card } from "./card";

interface InputFileProps {
  onFileUpload?: (file: File) => void; // Callback untuk menangani file upload
  validFileTypes?: string[]; // Tipe file yang valid
  field: any; // Field dari react-hook-form
  label: string; // Label untuk input file
  description?: string; // Deskripsi tambahan untuk form
}

const InputFile = ({
  onFileUpload,
  validFileTypes = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  field,
  label,
  description,
}: InputFileProps) => {
  const [uploadState, setUploadState] = useState<{
    file: File | null;
    progress: number;
    uploading: boolean;
  }>({
    file: null,
    progress: 0,
    uploading: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi untuk menangani file yang diupload
  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (validFileTypes.includes(file.type)) {
      setUploadState({ file, progress: 0, uploading: true });

      const interval = setInterval(() => {
        setUploadState((prev) => {
          const newProgress = prev.progress + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setUploadState({ ...prev, progress: 100, uploading: false });
            onFileUpload?.(file); // Panggil callback setelah upload selesai
            return { ...prev, progress: 100, uploading: false };
          }
          return { ...prev, progress: newProgress };
        });
      }, 200);
    } else {
      toast.error("Invalid file type. Please upload a valid file.", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  // Fungsi untuk menangani perubahan file input
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
    field.onChange(event); // Update react-hook-form field value
  };

  // Fungsi untuk menangani drag and drop
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  };

  // Fungsi untuk mereset input file
  const resetFile = () => {
    setUploadState({ file: null, progress: 0, uploading: false });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Fungsi untuk mendapatkan ikon file berdasarkan ekstensi
  const getFileIcon = () => {
    if (!uploadState.file) return <File />;

    const fileExt = uploadState.file.name.split(".").pop()?.toLowerCase() || "";
    return ["csv", "xlsx", "xls"].includes(fileExt) ? (
      <FileSpreadsheet className="h-5 w-5 text-foreground" />
    ) : (
      <File className="h-5 w-5 text-foreground" />
    );
  };

  // Fungsi untuk memformat ukuran file
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const { file, progress, uploading } = uploadState;

  return (
    <div className="flex items-center justify-center w-full  ">
      <div className="w-full">
        <div
          className="flex justify-center rounded-md border mt-2 border-dashed border-input px-6 py-12 "
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div>
            <File
              className="mx-auto h-12 w-12 text-muted-foreground"
              aria-hidden={true}
            />
            <div className="flex text-sm leading-6 text-muted-foreground">
              <p>Drag and drop or</p>
              <label
                htmlFor="file-upload-03"
                className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4"
              >
                <span>choose file</span>
                <input
                  id="file-upload-03"
                  name="file-upload-03"
                  type="file"
                  className="sr-only"
                  accept={validFileTypes.join(", ")}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </label>
              <p className="pl-1">to upload</p>
            </div>
          </div>
        </div>

        <p className="mt-2 text-xs leading-5 text-muted-foreground sm:flex sm:items-center sm:justify-between">
          <span>Accepted file types: {validFileTypes.join(", ")}</span>
          <span className="pl-1 sm:pl-0">Max. size: 10MB</span>
        </p>

        {file && (
          <Card className="relative mt-8 bg-muted p-4 gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
              aria-label="Remove"
              onClick={resetFile}
            >
              <X className="h-5 w-5 shrink-0" aria-hidden={true} />
            </Button>

            <div className="flex items-center space-x-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-inset ring-border">
                {getFileIcon()}
              </span>
              <div>
                <p className="text-xs font-medium text-foreground">
                  {file?.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {file && formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Progress value={progress} className="h-1.5" />
              <span className="text-xs text-muted-foreground">{progress}%</span>
            </div>
          </Card>
        )}

        {/* <div className="mt-8 flex items-center justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            className="whitespace-nowrap"
            onClick={resetFile}
            disabled={!file}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="whitespace-nowrap"
            disabled={!file || uploading || progress < 100}
          >
            Upload
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default InputFile;
