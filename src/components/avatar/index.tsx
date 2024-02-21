"use client";
import * as AvatarRadix from "@radix-ui/react-avatar";

interface AvatarProps {
  src?: string;
  fallback: string;
  alt: string;
}

export const Avatar = ({ alt, fallback, src }: AvatarProps) => {
  const fb =
    fallback &&
    fallback
      .split(" ")
      .map((word) => word[0])
      .join("");
  return (
    <AvatarRadix.Root className="inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded align-middle">
      <AvatarRadix.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={src}
        alt={alt}
      />
      <AvatarRadix.Fallback
        className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        {fb}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  );
};
