"use client";

import Link from "next/link";

import { Share2, MessageCircle } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";

interface Props {
  articleUrl: string;
  whatsappUrl: string;
  facebookUrl: string;
}

export default function ShareButtons({
  articleUrl,
  whatsappUrl,
  facebookUrl,
}: Props) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(articleUrl);

    alert("Link artikel berhasil disalin");
  };

  return (
    <div className="mt-5 flex gap-3">
      {/* COPY */}
      <button
        onClick={handleCopy}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-primary
          text-white
          transition
          hover:scale-105
        "
      >
        <Share2 size={18} />
      </button>

      {/* FACEBOOK */}
      <Link
        href={facebookUrl}
        target="_blank"
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-blue-600
          text-white
          transition
          hover:scale-105
        "
      >
        <FaFacebookF size={18} />
      </Link>

      {/* WHATSAPP */}
      <Link
        href={whatsappUrl}
        target="_blank"
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-green-500
          text-white
          transition
          hover:scale-105
        "
      >
        <MessageCircle size={18} />
      </Link>
    </div>
  );
}
