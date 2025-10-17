export type UserRow = {
  id: string;
  control: boolean;
  time: string;
  name: string;
  location: string;
  status: string;
  tags: { hash_tag: string }[];
  opd: { name: string; short_name: string }[];
  situation: string;
  media: {
    url: string; // URL file yang dipakai di UI
    type: "image" | "video" | "gif"; // tipe media
    caption?: string; // keterangan (opsional)
    originalUrl?: string;
  }[];
};

export type StepStatus = "done" | "current" | "next" | "blocked";

export type StepItem = {
  key: string;
  label: string;
  content?: React.ReactNode;
  at?: string; // Waktu dalam format string, misalnya "2023-10-01 10:00"
  status: StepStatus;
};

export type InfoItem = {
  key: string;
  label: string;
  content?: React.ReactNode;
};
