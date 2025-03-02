"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const Pluralo = ({ id, bookHere }: { id: string; bookHere: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="flex flex-col">
      <div className="text-foreground flex w-full items-center justify-center text-3xl font-bold">
        <ChevronDown size={32} className="heartbeat" />
        {bookHere}
        <ChevronDown size={32} className="heartbeat" />
      </div>
      <iframe
        id="booking"
        src={`https://widget.pluralo.com/?guid=${id}`}
        width="300"
        height="430"
        ref={iframeRef}
        loading="lazy"
        // onLoad={() => {
        //   // add a different background to the header
        //   iframeRef.current?.contentWindow?.document.querySelector(
        //     ".header",
        //   )?.setAttribute("style", "background-color: #f6ad55");
        // }}
        className="bg-rootsgreen rounded-4xl"
        style={{
          position: "relative",
          display: "block",
          margin: "none",
          border: "none",
        }}
      />
    </div>
  );
};

export default Pluralo;
