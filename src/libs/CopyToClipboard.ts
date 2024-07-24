"use client";

export const CopyToClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.log(err);
    }
  };