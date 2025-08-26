import { UserRow } from '../type';

export const complaints: UserRow[] = [
  {
    id: '1',
    control: false,
    time: '2025-08-22T06:45:12.000Z',
    name: 'M. Arya Firmansyah',
    location: 'Sukamahi, Cikarang Barat',
    status: 'Need Verifikasi',
    tags: [
      { hash_tag: 'banjir' },
      { hash_tag: 'genangan' },
      { hash_tag: 'saluran_tersumbat' },
      { hash_tag: 'normalisasi_sungai' },
      { hash_tag: 'kolam_retensi' },
    ],
    situation: 'Information Request',
    opd: [
      { name: 'Dinas Lingkungan Hidup Kabupaten Bekasi', short_name: 'DLH' },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/daisy/21652746_cc379e0eea_m.jpg',
        type: 'image',
        caption: 'Dokumentasi awal di lokasi RT 03',
        originalUrl:
          'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/daisy/21652746_cc379e0eea_m.jpg',
      },
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        type: 'video',
        caption: 'Rekaman kondisi aliran (sample video GCS)',
        originalUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      },
    ],
  },
  {
    id: '2',
    control: true,
    time: '2025-08-22T10:18:30.000Z',
    name: 'Kevin Kurniawan',
    location: 'Jatiwangi, Bekasi',
    status: 'Verify the Situation',
    tags: [
      { hash_tag: 'banjir_bandang' },
      { hash_tag: 'curah_hujan_ekstrem' },
      { hash_tag: 'tanggul_jebol' },
      { hash_tag: 'evakuasi' },
    ],
    situation: 'Emergency',
    opd: [
      {
        name: 'Badan Penanggulangan Bencana Daerah Kab. Bekasi',
        short_name: 'BPBD',
      },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video',
        caption: 'Pantauan arus sungai (sample video GCS)',
        originalUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
      {
        url: 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/dandelion/7355522_b66e5d3078_m.jpg',
        type: 'image',
        caption: 'Foto area bantaran sungai',
        originalUrl:
          'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/dandelion/7355522_b66e5d3078_m.jpg',
      },
    ],
  },
  {
    id: '3',
    control: false,
    time: '2025-08-21T14:02:05.000Z',
    name: 'Aulia Rahmah',
    location: 'Mustika Jaya, Bekasi',
    status: 'File Verification',
    tags: [
      { hash_tag: 'jalan_rusak' },
      { hash_tag: 'lubang_jalan' },
      { hash_tag: 'perkerasan_aspal' },
    ],
    situation: 'Supervised',
    opd: [
      {
        name: 'Dinas Bina Marga & Sumber Daya Air Kab. Bekasi',
        short_name: 'DBMSDA',
      },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/roses/12240303_80d87f77a3_n.jpg',
        type: 'image',
        caption: 'Dokumentasi kerusakan permukaan',
        originalUrl:
          'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/roses/12240303_80d87f77a3_n.jpg',
      },
    ],
  },
  {
    id: '4',
    control: true,
    time: '2025-08-21T09:15:30.000Z',
    name: 'Rangga Pratama',
    location: 'Tambun Selatan, Bekasi',
    status: 'OPD Process',
    tags: [
      { hash_tag: 'jembatan_retak' },
      { hash_tag: 'retak_struktur' },
      { hash_tag: 'penanganan_darurat' },
      { hash_tag: 'penyangga' },
    ],
    situation: 'Unsupervised',
    opd: [
      {
        name: 'Dinas Pekerjaan Umum & Tata Ruang Kab. Bekasi',
        short_name: 'PUTR',
      },
      { name: 'Dinas Perhubungan Kabupaten Bekasi', short_name: 'DISHUB' },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        type: 'video',
        caption: 'Video inspeksi struktur (sample video GCS)',
        originalUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      },
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
        type: 'image',
        caption: 'Cuplikan frame inspeksi',
        originalUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
      },
    ],
  },
  {
    id: '5',
    control: false,
    time: '2025-08-20T07:40:12.000Z',
    name: 'Siti Lestari',
    location: 'Bantar Gebang, Bekasi',
    status: 'Completed Handling',
    tags: [
      { hash_tag: 'drainase' },
      { hash_tag: 'pembersihan_sedimen' },
      { hash_tag: 'pekerjaan_selesai' },
    ],
    situation: 'Supervised',
    opd: [
      {
        name: 'Dinas Pekerjaan Umum & Tata Ruang Kab. Bekasi',
        short_name: 'PUTR',
      },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/sunflowers/6953297_8576bf4ea3.jpg',
        type: 'image',
        caption: 'Sebelum pembersihan sedimen',
        originalUrl:
          'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/sunflowers/6953297_8576bf4ea3.jpg',
      },
      {
        url: 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/sunflowers/5970301995_98cf4d7eed_n.jpg',
        type: 'image',
        caption: 'Setelah pembersihan: aliran lancar',
        originalUrl:
          'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/sunflowers/5970301995_98cf4d7eed_n.jpg',
      },
    ],
  },
  {
    id: '6',
    control: true,
    time: '2025-08-19T18:15:59.000Z',
    name: 'Dimas Saputra',
    location: 'Medansatria, Bekasi',
    status: 'Complaint Completed',
    tags: [
      { hash_tag: 'verifikasi_lapangan' },
      { hash_tag: 'dokumentasi' },
      { hash_tag: 'penutupan_aduan' },
    ],
    situation: 'Supervised',
    opd: [
      {
        name: 'Dinas Komunikasi, Informatika dan Persandian Kab. Bekasi',
        short_name: 'DISKOMINFOSANTI',
      },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/tulips/10791227_7168491604.jpg',
        type: 'image',
        caption: 'Dokumentasi berita acara',
        originalUrl:
          'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/tulips/10791227_7168491604.jpg',
      },
    ],
  },
  {
    id: '7',
    control: false,
    time: '2025-08-18T12:00:00.000Z',
    name: 'Nadia Putri',
    location: 'Karang Satria, Tambun Utara',
    status: 'Closed',
    tags: [
      { hash_tag: 'arsip' },
      { hash_tag: 'tindak_lanjut' },
      { hash_tag: 'selesai' },
    ],
    situation: 'Emergency',
    opd: [
      { name: 'Dinas Lingkungan Hidup Kabupaten Bekasi', short_name: 'DLH' },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
        type: 'image',
        caption: 'Kondisi akhir: akses normal',
        originalUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
      },
    ],
  },
  {
    id: '8',
    control: true,
    time: '2025-08-23T04:55:42.000Z',
    name: 'Rizky Maulana',
    location: 'Cikarang Timur, Bekasi',
    status: 'Need Verifikasi',
    tags: [
      { hash_tag: 'pohon_tumbang' },
      { hash_tag: 'akses_terhambat' },
      { hash_tag: 'penanganan_darurat' },
    ],
    situation: 'Information Request',
    opd: [
      { name: 'Dinas Lingkungan Hidup Kabupaten Bekasi', short_name: 'DLH' },
      {
        name: 'Badan Penanggulangan Bencana Daerah Kab. Bekasi',
        short_name: 'BPBD',
      },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/daisy/1297972485_33266a18d9.jpg',
        type: 'image',
        caption: 'Pohon tumbang menutup 1/2 badan jalan',
        originalUrl:
          'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/daisy/1297972485_33266a18d9.jpg',
      },
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        type: 'video',
        caption: 'Lalu lintas sekitar lokasi (sample video GCS)',
        originalUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      },
    ],
  },
  {
    id: '9',
    control: false,
    time: '2025-08-23T11:25:10.000Z',
    name: 'Dewi Ayu Larasati',
    location: 'Babelan, Bekasi',
    status: 'Verify the Situation',
    tags: [
      { hash_tag: 'rob' },
      { hash_tag: 'pesisir' },
      { hash_tag: 'pompa_air' },
    ],
    situation: 'Emergency',
    opd: [
      {
        name: 'Dinas Bina Marga & Sumber Daya Air Kab. Bekasi',
        short_name: 'DBMSDA',
      },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/tulips/8710147206_6aa9e92746_n.jpg',
        type: 'image',
        caption: 'Stasiun pompa pesisir',
        originalUrl:
          'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/tulips/8710147206_6aa9e92746_n.jpg',
      },
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        type: 'video',
        caption: 'Operasional pompa saat pasang',
        originalUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      },
    ],
  },
  {
    id: '10',
    control: false,
    time: '2025-08-24T03:12:20.000Z',
    name: 'Yusuf Abdullah',
    location: 'Setu, Bekasi',
    status: 'File Verification',
    tags: [
      { hash_tag: 'gorong_gorong' },
      { hash_tag: 'sedimentasi' },
      { hash_tag: 'perbaikan' },
    ],
    situation: 'Supervised',
    opd: [
      {
        name: 'Dinas Pekerjaan Umum & Tata Ruang Kab. Bekasi',
        short_name: 'PUTR',
      },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/roses/12562739_9b558b2eb5_n.jpg',
        type: 'image',
        caption: 'Sedimentasi pada gorong-gorong',
        originalUrl:
          'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/roses/12562739_9b558b2eb5_n.jpg',
      },
    ],
  },
  {
    id: '11',
    control: true,
    time: '2025-08-24T15:05:33.000Z',
    name: 'Rani Kartika',
    location: 'Tarumajaya, Bekasi',
    status: 'OPD Process',
    tags: [
      { hash_tag: 'abrasi_pantai' },
      { hash_tag: 'tanggul_pantai' },
      { hash_tag: 'geobag' },
    ],
    situation: 'Unsupervised',
    opd: [
      {
        name: 'Dinas Bina Marga & Sumber Daya Air Kab. Bekasi',
        short_name: 'DBMSDA',
      },
      {
        name: 'Badan Penanggulangan Bencana Daerah Kab. Bekasi',
        short_name: 'BPBD',
      },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
        type: 'image',
        caption: 'Material geobag di lokasi staging',
        originalUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
      },
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        type: 'video',
        caption: 'Simulasi gelombang (sample video GCS)',
        originalUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      },
    ],
  },
  {
    id: '12',
    control: false,
    time: '2025-08-25T02:22:41.000Z',
    name: 'Fajar Nugroho',
    location: 'Pebayuran, Bekasi',
    status: 'Completed Handling',
    tags: [
      { hash_tag: 'talud' },
      { hash_tag: 'perkuatan_tebing' },
      { hash_tag: 'pekerjaan_selesai' },
    ],
    situation: 'Supervised',
    opd: [
      {
        name: 'Dinas Pekerjaan Umum & Tata Ruang Kab. Bekasi',
        short_name: 'PUTR',
      },
    ],
    media: [
      {
        url: 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/sunflowers/2746670941_6afd8ccb87.jpg',
        type: 'image',
        caption: 'Talud baru di sisi tebing',
        originalUrl:
          'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos/sunflowers/2746670941_6afd8ccb87.jpg',
      },
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        type: 'video',
        caption: 'Uji aliran pascapekerjaan (sample video GCS)',
        originalUrl:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      },
    ],
  },
];
