"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfUrl: string;
}

export default function PdfViewerModal({
  open,
  onOpenChange,
  pdfUrl,
}: PdfViewerModalProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(800);

  useEffect(() => {
    const update = () => {
      const availH = window.innerHeight -40;
      const wByHeight = availH / 1.414;
      const wByWidth = window.innerWidth * 0.92;
      setPageWidth(Math.min(wByHeight, wByWidth));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowRight") setPageNumber((p) => Math.min(numPages, p + 1));
      if (e.key === "ArrowLeft") setPageNumber((p) => Math.max(1, p - 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, numPages]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
        <DialogContent
          showCloseButton={false}
          className="flex flex-col inset-0! top-0! left-0! h-screen! w-screen! max-w-none! translate-x-0! translate-y-0! rounded-none! bg-transparent! p-0! ring-0! shadow-none!"
        >
          {/* top bar */}
          <div className="relative flex h-14 shrink-0 items-center px-4">
            {/* center: page indicator */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
              <button
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-sm text-white/70">{pageNumber} / {numPages}</span>
              <button
                onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 disabled:opacity-30"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            {/* right: actions */}
            <div className="ml-auto flex items-center gap-2">
              <a
                href={pdfUrl}
                download
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <Download className="size-4" />
                Download
              </a>
              <button
                onClick={() => onOpenChange(false)}
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* PDF */}
          <div
            className="flex flex-1 items-start justify-center overflow-y-auto pt-2"
            onClick={() => onOpenChange(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Document
                file={pdfUrl}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                  setPageNumber(1);
                }}
              >
                <Page pageNumber={pageNumber} width={pageWidth} className="rounded-md overflow-hidden" />
              </Document>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
