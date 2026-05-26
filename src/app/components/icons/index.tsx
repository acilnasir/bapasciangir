import React from "react";

interface IconProps {
  name: "goverment" | "pagu" | "realisasi" | "persentase";

  width?: number;
  height?: number;
}

const Icon = ({ name, width, height }: IconProps) => {
  switch (name) {
    case "goverment":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 21.3333V12H6.66667V21.3333H4ZM12 21.3333V12H14.6667V21.3333H12ZM0 26.6667V24H26.6667V26.6667H0ZM20 21.3333V12H22.6667V21.3333H20ZM0 9.33333V6.66667L13.3333 0L26.6667 6.66667V9.33333H0ZM5.93333 6.66667H13.3333H20.7333H5.93333ZM5.93333 6.66667H20.7333L13.3333 3L5.93333 6.66667Z"
            fill="#011A45"
          />
        </svg>
      );
    case "pagu":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 1.12-3 2.5S10.343 13 12 13s3 1.12 3 2.5S13.657 18 12 18m0-10V6m0 12v-2m-7-4h14"
          />
        </svg>
      );
    case "realisasi":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    case "persentase":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 17a4 4 0 100-8 4 4 0 000 8zm0 0v4m0-4h4m-4 0H7"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
