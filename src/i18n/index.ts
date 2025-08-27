
import XHR from "i18next-http-backend";
import detector from 'i18next-browser-languagedetector';
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export const lang_settings = {
    "en" : {
        "code": "en",
        "name" : "English",
        "file" : "english",
    },
    "af" : {
        "code": "af",
        "name" : "Afrikaans",
        "file" : "afrikaans",
    },
    "ar" : {
        "code": "ar",
        "name" : "اَلْعَرَبِيَّةُ",
        "file" : "arabic",
    },
    "az" : {
        "code": "az",
        "name" : "Azərbaycanlı",
        "file" : "azerbaijan",
    },
    "bg" : {
        "code": "bg",
        "name" : "Български",
        "file" : "bulgarian",
    },
    "cn" : {
        "code": "cn",
        "name" : "汉语",
        "file" : "chinese",
    },
    "cs" : {
        "code": "cs",
        "name" : "Český",
        "file" : "czech",
    },
    "de" : {
        "code": "de",
        "name" : "Deutsch",
        "file" : "german",
    },
    "es" : {
        "code": "es",
        "name" : "Español",
        "file" : "spanish",
    },
    "fa" : {
        "code": "fa",
        "name" : "فارسی",
        "file" : "fa",
    },
    "fr" : {
        "code": "fr",
        "name" : "Français",
        "file" : "french",
    },
    "he" : {
        "code": "he",
        "name" : "עִבְרִית",
        "file" : "hebrew",
    },
    "hi" : {
        "code": "hi",
        "name" : "हिंदी",
        "file" : "hindi",
    },
    "hu" : {
        "code": "hu",
        "name" : "Magyar",
        "file" : "magyar",
    },
    "id" : {
        "code": "id",
        "name" : "Bahasa",
        "file" : "indonesian",
    },
    "it" : {
        "code": "it",
        "name" : "Italiano",
        "file" : "italian",
    },
    "km" : {
        "code": "km",
        "name" : "ភាសាខ្មែរ",
        "file" : "khmer",
    },
    "ko" : {
        "code": "ko",
        "name" : "한국어/韓國語",
        "file" : "korean",
    },
    "nl" : {
        "code": "nl",
        "name" : "Nederlands",
        "file" : "nederlands",
    },
    "pl" : {
        "code": "pl",
        "name" : "Polski",
        "file" : "polish",
    },
    "pt" : {
        "code": "pt",
        "name" : "Português",
        "file" : "portugal",
    },
    "ro" : {
        "code": "ro",
        "name" : "Română",
        "file" : "romanian",
    },
    "ru" : {
        "code": "ru",
        "name" : "Русский",
        "file" : "russian",
    },
    "si" : {
        "code": "si",
        "name" : "සිංහල",
        "file" : "sinhala",
    },
    "sk" : {
        "code": "sk",
        "name" : "Slovenčina",
        "file" : "slovenian",
    },
    "sv" : {
        "code": "sv",
        "name" : "Svenska",
        "file" : "swedish",
    },
    "th" : {
        "code": "th",
        "name" : "ภาษาไทย",
        "file" : "thai",
    },
    "tr" : {
        "code": "tr",
        "name" : "Türkçe",
        "file" : "turkish",
    },
    "ur" : {
        "code": "ur",
        "name" : "اردو",
        "file" : "urdu",
    },
    "vi" : {
        "code": "vi",
        "name" : "Tiếng Việt",
        "file" : "vietnamese",
    }
};
const lng = ['en', 'af', 'ar', 'az', 'bg', 'cn', 'cs', 'de', 'es', 'fa', 'fr', 'he', 'hi', 'hu', 'id', 'it', 'km', 'ko', 'nl', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sv', 'th', 'tr', 'ur', 'vi'];

i18next
    .use(XHR)
    .use(detector)
    .use(initReactI18next)
    .init({
        interpolation: { escapeValue: false },  // React already does escaping
        partialBundledLanguages: true,
        fallbackLng: "en",
        supportedLngs: lng,
        load: 'languageOnly',
        //debug: true,
        backend: {
            loadPath: '/lang/locale-{{lng}}.json',
            crossDomain: false,
            
            requestOptions: { 
                mode: 'cors',
                credentials: 'same-origin',
                cache: 'default'
            },

        }
    });

export default i18next;