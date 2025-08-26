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
    type: 'image' | 'video' | 'gif'; // tipe media
    caption?: string; // keterangan (opsional)
    originalUrl?: string;
  }[];
};
