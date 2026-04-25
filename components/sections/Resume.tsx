"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDF_URL = "/muhamad-izamuddin-resume.pdf";

export default function Resume() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <section id="resume" className="scroll-mt-24 py-16 sm:py-20">
      <SectionReveal className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Resume
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            My Resume
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="overflow-auto rounded-xl border p-4">
            <Document
              file={PDF_URL}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
                setPageNumber(1);
              }}
            >
              <Page
                pageNumber={pageNumber}
                width={Math.min(800, typeof window !== "undefined" ? window.innerWidth - 80 : 800)}
              />
            </Document>
          </div>

          {numPages > 1 && (
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pageNumber} of {numPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        <div className="text-center">
          <a href={PDF_URL} download>
            <Button variant="outline">Download Resume</Button>
          </a>
        </div>
      </SectionReveal>
    </section>
  );
}
