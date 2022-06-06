import { useTranslation } from 'react-i18next';
// @mui
import { enUS, deDE, frFR,  } from '@mui/material/locale';
import "../../public/icons/ireland_national_icon.svg"
// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
  },
  {
    label: 'Irish',
    value: 'ga',
    systemValue: enUS,
    icon: 'https://www.svgrepo.com/show/241267/ireland.svg',
  },
  {
    label: 'Ukrainian',
    value: 'uk',
    systemValue: enUS,
    icon: 'https://www.svgrepo.com/show/33561/ukraine.svg',
  },
/*  {
    label: 'German',
    value: 'de',
    systemValue: deDE,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_de.svg',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_fr.svg',
  },*/
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
