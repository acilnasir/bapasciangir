"use client";

import { Users2 } from "lucide-react";
import { useEffect, useState } from "react";

import { IoCalendarNumberOutline } from "react-icons/io5";

type Survey = {
  id: string;
  label: string;
  title: string;
  score: number;
  period: string;
  respondents: string;
};

type SurveyCardProps = {
  label: string;
  title: string;
  score: number;
};

// ======================
// CATEGORY
// ======================
const getCategory = (score: number) => {
  if (score >= 3.76) {
    return {
      label: "Sangat Baik",
      color: "bg-green-400 text-primary",
    };
  }

  if (score >= 3.0) {
    return {
      label: "Baik",
      color: "bg-blue-400 text-white",
    };
  }

  if (score >= 2.0) {
    return {
      label: "Cukup",
      color: "bg-yellow-400 text-primary",
    };
  }

  return {
    label: "Kurang",
    color: "bg-red-400 text-white",
  };
};

function SurveyCard({ label, title, score }: SurveyCardProps) {
  // ======================
  // HITUNG BINTANG
  // ======================
  const rating = Math.round(score);

  const category = getCategory(score);

  return (
    <div className="overflow-hidden rounded-3xl bg-primary shadow-lg">
      {/* HEADER */}
      <div className="border-b border-white/10 px-6 py-5">
        <div className="text-center">
          <span className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-2xl">
            {label}
          </span>

          <h3 className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
            {title}
          </h3>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6">
        <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">
          <p className="text-sm font-medium text-white/70">Nilai Indeks</p>

          <h4 className="mt-2 text-5xl font-bold tracking-tight text-tertiary">
            {score}/4
          </h4>

          {/* BADGE */}
          <div
            className={`mt-4 inline-flex rounded-full px-4 py-1 text-sm font-semibold ${category.color}`}
          >
            {category.label}
          </div>

          {/* STARS */}
          <div className="mt-5 flex justify-center gap-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={index < rating ? "#facc15" : "none"}
                stroke="#facc15"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.04 6.28a1 1 0 00.95.69h6.602c.969 0 1.371 1.24.588 1.81l-5.34 3.878a1 1 0 00-.364 1.118l2.04 6.28c.3.921-.755 1.688-1.54 1.118l-5.34-3.878a1 1 0 00-1.176 0l-5.34 3.878c-.784.57-1.838-.197-1.539-1.118l2.04-6.28a1 1 0 00-.364-1.118L.87 11.707c-.783-.57-.38-1.81.588-1.81h6.602a1 1 0 00.95-.69l2.04-6.28z"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultSurveySection() {
  const [data, setData] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    let ignore = false;

    const fetchSurvey = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/survey`,
        );

        const result = await response.json();

        if (!ignore) {
          setData(result.data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchSurvey();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Hasil Survey Bapas Ciangir
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-500 md:text-base">
            Data hasil evaluasi persepsi anti korupsi dan kualitas pelayanan
            publik periode terbaru.
          </p>
        </div>

        {data.length > 0 && (
          <div className="my-8 flex flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral px-6 py-5 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
            {/* PERIODE */}
            <div className="flex items-center gap-2">
              <IoCalendarNumberOutline size={20} />

              <span className="font-semibold text-primary">Periode:</span>

              {data[0].period}
            </div>

            {/* RESPONDENTS */}
            <div className="flex items-center gap-2">
              <Users2 size={20} />
              <span className="font-semibold text-primary">
                Jumlah Responden:
              </span>
              {data[0].respondents} Orang
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 text-gray-500">
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Memuat data survey...
            </div>
          </div>
        ) : (
          <>
            {/* GRID */}
            <div className="grid gap-6 lg:grid-cols-2">
              {data.map((item) => (
                <SurveyCard
                  key={item.id}
                  label={item.label}
                  title={item.title}
                  score={item.score}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
