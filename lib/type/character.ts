import { StaticImageData } from 'next/image';

export type Character = {
  id: number;
  name: string;
  gender: string;
  status: string;
  image: string | StaticImageData;
};
