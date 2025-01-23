import { ReactNode } from 'react';

export type GuestResponseType = {
  id: string;
  names: string[];
  isConfirmed: boolean;
};

export type GuestType = {
  id: string;
  names: string;
  allNames: PersonType[];
  isConfirmed: boolean;
};

export type PersonType = { name: string; type: string };

export type ButtonType = {
  children: ReactNode;
  text: string;
  url: string;
  id?: string;
  showConfirm?: boolean;
  maxDateToConfirm?: string;       
};

export type GeneralDataType = {
  title: string;
  title_description: string;
  baby_name: string;
  description: string;
  address: string;
  location_button_label: string;
  location_url: string;
  confirm_button_label: string;
  gift_message: string;
  bye_text: string;
  month: string;
  day: string;
  year: string;
  week_day: string;
  time: string;
};

export type LottieType = {
  src: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};
