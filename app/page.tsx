"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Flame,
  Clock,
  Bookmark,
  Star,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Sparkles,
  TrendingUp,
  Filter,
  ArrowLeft,
  List,
  Settings,
  Maximize2,
  Minimize2,
  Heart,
  Share2,
  Eye,
  CheckCircle2,
} from "lucide-react";

// ==========================================
// TIPE DATA & DATA DUMMY (SIAP DIGANTI API)
// ==========================================
interface Chapter {
  id: string;
  number: number;
  title: string;
  date: string;
  pages: string[];
}

interface Manga {
  id: string;
  title: string;
  altTitle: string;
  author: string;
  status: "Ongoing" | "Completed";
  type: "Manga" | "Manhwa" | "Manhua";
  rating: string;
  views: string;
  updatedAt: string;
  isHot?: boolean;
  cover: string;
  banner: string;
  genres: string[];
  synopsis: string;
  chapters: Chapter[];
}

const DUMMY_PAGES = [
  "https://picsum.photos/seed/page1/800/1200",
  "https://picsum.photos/seed/page2/800/1200",
  "https://picsum.photos/seed/page3/800/1200",
  "https://picsum.photos/seed/page4/800/1200",
  "https://picsum.photos/seed/page5/800/1200",
];

const MANGA_DATA: Manga[] = [
  {
    id: "solo-leveling",
    title: "Solo Leveling: Arise of the Shadow",
    altTitle: "Na Honjaman Level Up",
    author: "Chugong / Dubu",
    status: "Completed",
    type: "Manhwa",
    rating: "9.9",
    views: "1.4M",
    updatedAt: "1 jam lalu",
    isHot: true,
    cover: "https://picsum.photos/seed/solo-cover/400/600",
    banner: "https://picsum.photos/seed/solo-banner/1200/600",
    genres: ["Action", "Fantasy", "Adventure", "Overpowered"],
    synopsis:
      "Sepuluh tahun yang lalu, setelah 'Gate' yang menghubungkan dunia nyata dengan dunia monster terbuka, beberapa orang biasa menerima kekuatan untuk memburu monster di dalam Gate tersebut. Sung Jin-Woo, hunter terlemah dari seluruh umat manusia, menemukan dungeon ganda misterius yang mengubah takdir hidupnya selamanya.",
    chapters: Array.from({ length: 15 }, (_, i) => ({
      id: `sl-ch-${15 - i}`,
      number: 15 - i,
      title: i === 0 ? "Awakening of the Monarch" : `Dungeon Floor ${15 - i}`,
      date: `${i + 1} hari lalu`,
      pages: DUMMY_PAGES,
    })),
  },
  {
    id: "orv",
    title: "Omniscient Reader's Viewpoint",
    altTitle: "Jeonjijeok Dokja Sijeom",
    author: "Sing N Song",
    status: "Ongoing",
    type: "Manhwa",
    rating: "9.8",
    views: "980K",
    updatedAt: "2 jam lalu",
    isHot: true,
    cover: "https://picsum.photos/seed/orv-cover/400/600",
    banner: "https://picsum.photos/seed/orv-banner/1200/600",
    genres: ["Action", "Apocalypse", "Fantasy", "Psychological"],
    synopsis:
      "Kim Dokja tidak menganggap dirinya sebagai protagonis dalam hidupnya sendiri. Namun, ketika novel web yang ia baca sendirian selama sepuluh tahun tiba-tiba menjadi kenyataan, hanya dirinyalah yang tahu bagaimana dunia ini akan berakhir.",
    chapters: Array.from({ length: 12 }, (_, i) => ({
      id: `orv-ch-${12 - i}`,
      number: 12 - i,
      title: `Scenario #${12 - i}`,
      date: `${i + 1} hari lalu`,
      pages: DUMMY_PAGES,
    })),
  },
  {
    id: "one-piece",
    title: "One Piece",
    altTitle: "OP",
    author: "Eiichiro Oda",
    status: "Ongoing",
    type: "Manga",
    rating: "9.9",
    views: "2.8M",
    updatedAt: "4 jam lalu",
    isHot: true,
    cover: "https://picsum.photos/seed/op-cover/400/600",
    banner: "https://picsum.photos/seed/op-banner/1200/600",
    genres: ["Action", "Adventure", "Comedy", "Shounen"],
    synopsis:
      "Monkey D. Luffy menolak membiarkan siapa pun atau apa pun menghalangi jalannya dalam mencari harta karun legendaris One Piece untuk menjadi Raja Bajak Laut berikutnya.",
    chapters: Array.from({ length: 10 }, (_, i) => ({
      id: `op-ch-${1125 - i}`,
      number: 1125 - i,
      title: `Petualangan di Elbaf Bagian ${10 - i}`,
      date: `${i + 2} hari lalu`,
      pages: DUMMY_PAGES,
    })),
  },
  {
    id: "tbate",
    title: "The Beginning After The End",
    altTitle: "TBATE",
    author: "TurtleMe",
    status: "Ongoing",
    type: "Manhwa",
    rating: "9.6",
    views: "750K",
    updatedAt: "6 jam lalu",
    isHot: false,
    cover: "https://picsum.photos/seed/tbate-cover/400/600",
    banner: "https://picsum.photos/seed/tbate-banner/1200/600",
    genres: ["Isekai", "Fantasy", "Action", "Magic"],
    synopsis:
      "Raja Grey memiliki kekuatan, kekayaan, dan prestise yang tak tertandingi di dunia yang diatur oleh kemampuan bela diri. Namun, kesendirian menyelimuti mereka yang memiliki kekuatan besar. Bereinkarnasi ke dunia baru yang penuh sihir dan monster, sang raja mendapat kesempatan kedua.",
    chapters: Array.from({ length: 8 }, (_, i) => ({
      id: `tbate-ch-${185 - i}`,
      number: 185 - i,
      title: `Mana Core Stage ${8 - i}`,
      date: `${i + 3} hari lalu`,
      pages: DUMMY_PAGES,
    })),
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    altTitle: "Sorcery Fight",
    author: "Gege Akutami",
    status: "Completed",
    type: "Manga",
    rating: "9.5",
    views: "1.1M",
    updatedAt: "1 hari lalu",
    isHot: false,
    cover: "https://picsum.photos/seed/jjk-cover/400/600",
    banner: "https://picsum.photos/seed/jjk-banner/1200/600",
    genres: ["Action", "Supernatural", "Dark Fantasy"],
    synopsis:
      "Yuji Itadori adalah seorang siswa SMA dengan kemampuan fisik luar biasa. Demi menyelamatkan temannya dari kutukan roh jahat, ia memakan jari Ryomen Sukuna dan kini berbagi tubuh dengan Raja Kutukan tersebut.",
    chapters: Array.from({ length: 10 }, (_, i) => ({
      id: `jjk-ch-${271 - i}`,
      number: 271 - i,
      title: `Shinjuku Showdown Part ${10 - i}`,
      date: `${i + 4} hari lalu`,
      pages: DUMMY_PAGES,
    })),
  },
  {
    id: "nano-machine",
    title: "Nano Machine",
    altTitle: "Nanomasin",
    author: "Han-Joong-Wol-Ya",
    status: "Ongoing",
    type: "Manhwa",
    rating: "9.5",
    views: "620K",
    updatedAt: "2 hari lalu",
    isHot: false,
    cover: "https://picsum.photos/seed/nano-cover/400/600",
    banner: "https://picsum.photos/seed/nano-banner/1200/600",
    genres: ["Action", "Martial Arts", "Sci-Fi", "Murim"],
    synopsis:
      "Setelah direndahkan dan nyawanya terancam, seorang yatim piatu dari Sekte Iblis, Cheon Yeo-Woon, mendapat kunjungan tak terduga dari keturunannya dari masa depan yang menyuntikkan mesin nano ke dalam tubuhnya.",
    chapters: Array.from({ length: 10 }, (_, i) => ({
      id: `nano-ch-${215 - i}`,
      number: 215 - i,
      title: `Heavenly Demon ${10 - i}`,
      date: `${i + 5} hari lalu`,
      pages: DUMMY_PAGES,
    })),
  },
];

const GENRES = [
  "Semua",
  "Action",
  "Fantasy",
  "Adventure",
  "Isekai",
  "Martial Arts",
  "Shounen",
  "Supernatural",
  "Sci-Fi",
];

export default function NovelFliyApp() {
  // Navigasi State: "home" | "detail" | "reader"
  const [view, setView] = useState<"home" | "detail" | "reader">("home");
  const [selectedManga, setSelectedManga] = useState<Manga>(MANGA_DATA[0]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(
    MANGA_DATA[0].chapters[0]
  );

  // Filter & Search State
  const [activeGenre, setActiveGenre] = useState("Semua");
  const [activeType, setActiveType] = useState<"All" | "Manga" | "Manhwa">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [chapterSearch, setChapterSearch] = useState("");

  // Bookmark State
  const [bookmarks, setBookmarks] = useState<string[]>(["solo-leveling"]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Reader Settings State
  const [showReaderHUD, setShowReaderHUD] = useState(true);
  const [readerWidth, setReaderWidth] = useState<"max-w-2xl" | "max-w-4xl" | "max-w-full">("max-w-3xl" as any);

  // Scroll ke atas setiap pindah halaman
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view, selectedChapter]);

  // Fungsi Toggle Bookmark
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Buka Detail Manga
  const openMangaDetail = (manga: Manga) => {
    setSelectedManga(manga);
    setChapterSearch("");
    setView("detail");
  };

  // Buka Reader
  const openReader = (manga: Manga, chapter: Chapter) => {
    setSelectedManga(manga);
    setSelectedChapter(chapter);
    setView("reader");
  };

  // Filter Daftar Manga di Home
  const filteredManga = MANGA_DATA.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.altTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      activeGenre === "Semua" || m.genres.includes(activeGenre);
    const matchesType = activeType === "All" || m.type === activeType;
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(m.id);
    return matchesSearch && matchesGenre && matchesType && matchesBookmark;
  });

  // Navigasi Chapter di Reader
  const currentChapterIndex = selectedManga.chapters.findIndex(
    (c) => c.id === selectedChapter.id
  );
  const nextChapter =
    currentChapterIndex > 0
      ? selectedManga.chapters[currentChapterIndex - 1]
      : null;
  const prevChapter =
    currentChapterIndex < selectedManga.chapters.length - 1
      ? selectedManga.chapters[currentChapterIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* ========================================================= */}
      {/* NAVBAR UTAMA (Tampil di Home & Detail)                    */}
      {/* ========================================================= */}
      {view !== "reader" && (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090a0f]/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <div
              onClick={() => {
                setShowBookmarksOnly(false);
                setView("home");
              }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Novel<span className="text-indigo-500">Fliy</span>
                </span>
                <span className="hidden sm:block text-[10px] text-slate-500 -mt-1 font-medium">
                   Baca Komik Tanpa Iklan
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (view !== "home") setView("home");
                }}
                placeholder="Cari judul komik..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Navigasi Kanan */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowBookmarksOnly(!showBookmarksOnly);
                  setView("home");
                }}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  showBookmarksOnly
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Bookmark</span>
                <span className="px-1.5 py-0.2 bg-black/30 rounded-full text-[10px]">
                  {bookmarks.length}
                </span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ========================================================= */}
      {/* VIEW 1: HALAMAN UTAMA (HOME)                              */}
      {/* ========================================================= */}
      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10"
          >
            {/* HERO BANNER (Hanya tampil jika tidak sedang mode filter Bookmark) */}
            {!showBookmarksOnly && !searchQuery && (
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className="relative h-[380px] sm:h-[440px] w-full">
                  <img
                    src={MANGA_DATA[0].banner}
                    alt={MANGA_DATA[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f] via-[#090a0f]/80 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 p-6 sm:p-10 max-w-2xl space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white flex items-center gap-1 shadow-lg shadow-indigo-600/40">
                      <Sparkles className="w-3.5 h-3.5" /> Spotlight Hari Ini
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center gap-1 backdrop-blur-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />{" "}
                      {MANGA_DATA[0].rating}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 backdrop-blur-md">
                      {MANGA_DATA[0].type}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    {MANGA_DATA[0].title}
                  </h1>

                  <p className="text-slate-300 text-sm sm:text-base line-clamp-2 leading-relaxed">
                    {MANGA_DATA[0].synopsis}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {MANGA_DATA[0].genres.map((g) => (
                      <span
                        key={g}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() =>
                        openReader(MANGA_DATA[0], MANGA_DATA[0].chapters[0])
                      }
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" /> Baca Chapter Terakhir
                    </button>
                    <button
                      onClick={() => openMangaDetail(MANGA_DATA[0])}
                      className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm backdrop-blur-md border border-white/10 transition-all cursor-pointer"
                    >
                      Detail Komik
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FILTER BAR (GENRE & TIPE KOMIK) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
              {/* Genre Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold pr-1">
                  <Filter className="w-3.5 h-3.5 text-indigo-400" /> Genre:
                </div>
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setActiveGenre(genre)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeGenre === genre
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>

              {/* Tipe Komik Tabs */}
              <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 self-start">
                {(["All", "Manga", "Manhwa"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeType === type
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {type === "All" ? "Semua Tipe" : type}
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN CONTENT & SIDEBAR */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Kiri: Daftar Komik (3 Kolom) */}
              <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                      <Clock className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-white">
                        {showBookmarksOnly
                          ? "Koleksi Bookmark Anda"
                          : searchQuery
                          ? `Hasil Pencarian: "${searchQuery}"`
                          : "Update Komik Terbaru"}
                      </h2>
                      <p className="text-xs text-slate-400">
                        Menampilkan {filteredManga.length} judul komik
                      </p>
                    </div>
                  </div>
                </div>

                {filteredManga.length === 0 ? (
                  <div className="bg-[#12141f] border border-white/5 rounded-2xl p-12 text-center space-y-3">
                    <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
                    <h3 className="text-lg font-bold text-white">
                      Komik tidak ditemukan
                    </h3>
                    <p className="text-sm text-slate-400 max-w-sm mx-auto">
                      Coba gunakan kata kunci pencarian lain atau reset filter
                      genre yang sedang aktif.
                    </p>
                    <button
                      onClick={() => {
                        setActiveGenre("Semua");
                        setActiveType("All");
                        setSearchQuery("");
                        setShowBookmarksOnly(false);
                      }}
                      className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                    >
                      Reset Filter
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                    {filteredManga.map((manga, index) => (
                      <motion.div
                        key={manga.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        onClick={() => openMangaDetail(manga)}
                        className="group relative bg-[#12141f] rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col cursor-pointer"
                      >
                        {/* Cover Image */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
                          <img
                            src={manga.cover}
                            alt={manga.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#12141f] via-transparent to-black/30" />

                          {/* Tipe Badge */}
                          <span
                            className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md border ${
                              manga.type === "Manhwa"
                                ? "bg-emerald-500/80 text-white border-emerald-400/30"
                                : "bg-indigo-600/80 text-white border-indigo-400/30"
                            }`}
                          >
                            {manga.type}
                          </span>

                          {/* Tombol Cepat Bookmark */}
                          <button
                            onClick={(e) => toggleBookmark(manga.id, e)}
                            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md border transition-all ${
                              bookmarks.includes(manga.id)
                                ? "bg-rose-600 text-white border-rose-500"
                                : "bg-black/50 text-slate-300 border-white/10 hover:text-white"
                            }`}
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${
                                bookmarks.includes(manga.id) ? "fill-white" : ""
                              }`}
                            />
                          </button>

                          {/* Rating & Views di Bawah Gambar */}
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-bold">
                            <span className="flex items-center gap-1 text-amber-400 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                              <Star className="w-3 h-3 fill-amber-400" />{" "}
                              {manga.rating}
                            </span>
                            <span className="flex items-center gap-1 text-slate-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px]">
                              <Eye className="w-3 h-3" /> {manga.views}
                            </span>
                          </div>
                        </div>

                        {/* Info & List 2 Chapter Terakhir */}
                        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                              {manga.title}
                            </h3>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {manga.genres.slice(0, 3).join(" • ")}
                            </p>
                          </div>

                          {/* 2 Tombol Chapter Terbaru */}
                          <div className="space-y-1.5 pt-2 border-t border-white/5">
                            {manga.chapters.slice(0, 2).map((ch) => (
                              <div
                                key={ch.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openReader(manga, ch);
                                }}
                                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-indigo-600 text-slate-200 hover:text-white transition-colors text-xs font-medium"
                              >
                                <span className="font-bold">
                                  Ch. {ch.number}
                                </span>
                                <span className="text-[10px] opacity-75">
                                  {ch.date}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Kanan: Sidebar Trending */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <TrendingUp className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white">
                      Peringkat Populer
                    </h2>
                    <p className="text-xs text-slate-400">
                      Paling banyak dibaca minggu ini
                    </p>
                  </div>
                </div>

                <div className="bg-[#12141f] rounded-2xl p-4 border border-white/5 space-y-3">
                  {MANGA_DATA.slice(0, 5).map((manga, idx) => (
                    <div
                      key={manga.id}
                      onClick={() => openMangaDetail(manga)}
                      className="flex items-center gap-3.5 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 ${
                          idx === 0
                            ? "bg-amber-400 text-black shadow-md shadow-amber-400/30"
                            : idx === 1
                            ? "bg-slate-300 text-black"
                            : idx === 2
                            ? "bg-amber-700 text-white"
                            : "bg-white/5 text-slate-400"
                        }`}
                      >
                        {idx + 1}
                      </div>

                      <img
                        src={manga.cover}
                        alt={manga.title}
                        className="w-12 h-16 rounded-lg object-cover flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
                          {manga.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {manga.genres.slice(0, 2).join(", ")}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400" />{" "}
                            {manga.rating}
                          </span>
                          <span className="text-[10px] text-slate-500">•</span>
                          <span className="text-[11px] text-indigo-400 font-semibold">
                            Ch. {manga.chapters[0].number}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.main>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: HALAMAN DETAIL MANGA                              */}
        {/* ========================================================= */}
        {view === "detail" && (
          <motion.main
            key="detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="pb-16"
          >
            {/* Backdrop Header */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={selectedManga.banner}
                alt={selectedManga.title}
                className="w-full h-full object-cover blur-md scale-110 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/70 to-transparent" />

              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
                <button
                  onClick={() => setView("home")}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
                </button>
              </div>
            </div>

            {/* Konten Detail */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 sm:-mt-40 relative z-20 space-y-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Sampul Komik */}
                <div className="w-48 sm:w-60 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 flex-shrink-0 mx-auto md:mx-0">
                  <img
                    src={selectedManga.cover}
                    alt={selectedManga.title}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Info Metadata */}
                <div className="flex-1 space-y-5 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white">
                      {selectedManga.type}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                      {selectedManga.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />{" "}
                      {selectedManga.rating}
                    </span>
                  </div>

                  <div>
                    <h1 className="text-2xl sm:text-4xl font-black text-white">
                      {selectedManga.title}
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                      {selectedManga.altTitle} • Karya{" "}
                      <span className="text-slate-200 font-semibold">
                        {selectedManga.author}
                      </span>
                    </p>
                  </div>

                  {/* Genre Tags */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    {selectedManga.genres.map((g) => (
                      <span
                        key={g}
                        className="px-3 py-1 rounded-lg bg-[#12141f] border border-white/10 text-xs font-semibold text-slate-300"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Sinopsis */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                    {selectedManga.synopsis}
                  </p>

                  {/* Tombol Aksi */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                    <button
                      onClick={() =>
                        openReader(
                          selectedManga,
                          selectedManga.chapters[
                            selectedManga.chapters.length - 1
                          ]
                        )
                      }
                      className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/10 transition-all cursor-pointer"
                    >
                      Baca Chapter Pertama
                    </button>
                    <button
                      onClick={() =>
                        openReader(selectedManga, selectedManga.chapters[0])
                      }
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" /> Baca Chapter Terbaru (Ch.{" "}
                      {selectedManga.chapters[0].number})
                    </button>
                    <button
                      onClick={() => toggleBookmark(selectedManga.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-sm font-bold ${
                        bookmarks.includes(selectedManga.id)
                          ? "bg-rose-600 text-white border-rose-500"
                          : "bg-[#12141f] text-slate-300 border-white/10 hover:text-white"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          bookmarks.includes(selectedManga.id)
                            ? "fill-white"
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Daftar Chapter */}
              <div className="bg-[#12141f] border border-white/10 rounded-3xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <List className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-extrabold text-white">
                      Daftar Chapter ({selectedManga.chapters.length})
                    </h2>
                  </div>

                  {/* Cari Nomor Chapter */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={chapterSearch}
                      onChange={(e) => setChapterSearch(e.target.value)}
                      placeholder="Cari chapter (misal: 12)..."
                      className="w-full bg-[#090a0f] border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
                  {selectedManga.chapters
                    .filter((ch) =>
                      ch.number.toString().includes(chapterSearch)
                    )
                    .map((ch) => (
                      <div
                        key={ch.id}
                        onClick={() => openReader(selectedManga, ch)}
                        className="p-4 rounded-2xl bg-[#090a0f] hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/50 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                            Chapter {ch.number}
                          </span>
                          <p className="text-xs text-slate-400 truncate max-w-[180px]">
                            {ch.title}
                          </p>
                        </div>
                        <span className="text-[11px] text-slate-500 group-hover:text-slate-300">
                          {ch.date}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.main>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: HALAMAN BACA KOMIK (READER MODE)                  */}
        {/* ========================================================= */}
        {view === "reader" && (
          <motion.div
            key="reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#050508] relative select-none"
          >
            {/* FLOATING TOP HUD */}
            <AnimatePresence>
              {showReaderHUD && (
                <motion.header
                  initial={{ y: -80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#090a0f]/90 border-b border-white/10"
                >
                  <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => setView("detail")}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="min-w-0">
                        <h1 className="text-sm font-bold text-white truncate">
                          {selectedManga.title}
                        </h1>
                        <p className="text-xs text-indigo-400 font-semibold">
                          Chapter {selectedChapter.number} —{" "}
                          {selectedChapter.title}
                        </p>
                      </div>
                    </div>

                    {/* Dropdown Pilih Chapter */}
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedChapter.id}
                        onChange={(e) => {
                          const found = selectedManga.chapters.find(
                            (c) => c.id === e.target.value
                          );
                          if (found) setSelectedChapter(found);
                        }}
                        className="bg-[#12141f] border border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                      >
                        {selectedManga.chapters.map((ch) => (
                          <option key={ch.id} value={ch.id}>
                            Chapter {ch.number}
                          </option>
                        ))}
                      </select>

                      {/* Tombol Lebar Gambar */}
                      <button
                        onClick={() =>
                          setReaderWidth((prev) =>
                            prev === "max-w-2xl" ? "max-w-4xl" : "max-w-2xl"
                          )
                        }
                        title="Ubah Ukuran Gambar"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hidden sm:flex cursor-pointer"
                      >
                        {readerWidth === "max-w-2xl" ? (
                          <Maximize2 className="w-4 h-4" />
                        ) : (
                          <Minimize2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.header>
              )}
            </AnimatePresence>

            {/* AREA GAMBAR KOMIK (Klik layar untuk sembunyikan/tampilkan HUD) */}
            <div
              onClick={() => setShowReaderHUD(!showReaderHUD)}
              className={`mx-auto ${readerWidth} pt-16 pb-24 flex flex-col items-center cursor-pointer`}
            >
              {selectedChapter.pages.map((imgUrl, index) => (
                <div key={index} className="w-full relative bg-slate-950">
                  <img
                    src={imgUrl}
                    alt={`Halaman ${index + 1}`}
                    loading="lazy"
                    className="w-full h-auto block"
                  />
                  <span className="absolute bottom-2 right-3 px-2 py-0.5 rounded bg-black/60 text-[10px] text-slate-400">
                    {index + 1} / {selectedChapter.pages.length}
                  </span>
                </div>
              ))}

              {/* Box Navigasi Akhir Chapter */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl mx-auto mt-10 p-6 rounded-2xl bg-[#12141f] border border-white/10 text-center space-y-4"
              >
                <p className="text-sm font-bold text-slate-300">
                  Anda telah mencapai akhir dari{" "}
                  <span className="text-indigo-400">
                    Chapter {selectedChapter.number}
                  </span>
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    disabled={!prevChapter}
                    onClick={() =>
                      prevChapter && setSelectedChapter(prevChapter)
                    }
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" /> Chapter Sebelumnya
                  </button>
                  <button
                    disabled={!nextChapter}
                    onClick={() =>
                      nextChapter && setSelectedChapter(nextChapter)
                    }
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                  >
                    Chapter Selanjutnya <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* FLOATING BOTTOM HUD */}
            <AnimatePresence>
              {showReaderHUD && (
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 80, opacity: 0 }}
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-xl bg-[#12141f]/90 border border-white/15 shadow-2xl">
                    <button
                      disabled={!prevChapter}
                      onClick={() =>
                        prevChapter && setSelectedChapter(prevChapter)
                      }
                      className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="px-4 text-xs font-extrabold text-white">
                      Ch. {selectedChapter.number}
                    </span>

                    <button
                      disabled={!nextChapter}
                      onClick={() =>
                        nextChapter && setSelectedChapter(nextChapter)
                      }
                      className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
