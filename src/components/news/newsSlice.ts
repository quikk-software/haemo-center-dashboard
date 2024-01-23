import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const dataURLRe = /^data:([a-zA-Z0-9/]+);base64,(.*)$/;

/**
 * Parse a data URL to an image object
 *
 * @param dataURL data URL with image data in base64 encoding
 * @returns undefined if the data URL could not be parsed or image object
 */
export const dataURLToImage = (dataURL: string) => {
  const m = dataURLRe.exec(dataURL);
  if (m === null) {
    return undefined;
  }
  return { data: m[2], mIMEType: m[1] } as Image;
};

/**
 * Convert an image object to a data URL
 *
 * @param image image object
 * @returns data URL if the image is not undefined, otherwise empty string
 */
export const imageToDataURL = (image: Image | undefined) => {
  if (image === undefined) {
    return "";
  }
  return `data:${image.mIMEType};base64,${image.data}`;
};

/**
 * Convert image data (expected to be in base64 encoding) and MIME type to image object
 *
 * This function is intented for converting data received via the API to an image object.
 * @param image image data in base64 encoding
 * @param mIMEType image MIME type
 * @returns image object
 */
export const imageDataAndMIMETypeToImage = (
  image: string,
  mIMEType: string,
) => {
  return { data: image, mIMEType } as Image;
};

export type Image = {
  data: string;
  mIMEType: string;
};

export type CenterNews = {
  centerId: string;
  centerName: string;
};

export type NewsState = {
  headline?: string;
  text?: string;
  creatorName?: string;
  image?: Image;
  link?: string;
  isSponsored: boolean;
  isAdmin: boolean;
  centers: CenterNews[];
};

export const initialState: NewsState = {
  isSponsored: false,
  isAdmin: false,
  centers: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setHeadline: (state, action: PayloadAction<string>) => {
        state.headline = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
        state.text = action.payload;
    },
    setCreatorName: (state, action: PayloadAction<string>) => {
        state.creatorName = action.payload;
    },
    setImage: (state, action: PayloadAction<Image>) => {
        state.image = action.payload;
    },
    setLink: (state, action: PayloadAction<string>) => {
        state.link = action.payload;
    },
    setIsSponsored: (state, action: PayloadAction<boolean>) => {
        state.isSponsored = action.payload;
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
        state.isAdmin = action.payload;
    },
    setNewsCenters: (state, action: PayloadAction<CenterNews[]>) => {
        state.centers = action.payload;
    },
  },
});

export const {
  setHeadline,
  setText,
  setCreatorName,
  setImage,
  setLink,
  setIsSponsored,
  setIsAdmin,
  setNewsCenters,
} = newsSlice.actions;
export default newsSlice.reducer;
