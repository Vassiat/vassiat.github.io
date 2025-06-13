const allDictionaries = import.meta.glob('./i18n/*.json', { eager: true });

export const languages = Object.fromEntries(
  Object.keys(allDictionaries).map(path => {
    const langCode = path.split('/').pop()?.replace('.json', '') || '';
    // Podrías mapear a nombres más amigables aquí si lo deseas, por ejemplo:
    // return [langCode, langCode === 'es' ? 'Español' : 'English'];
    return [langCode, langCode]; // Por ahora, simplemente usa el código de idioma
  }).filter(([key]) => key !== '') // Filtra cualquier entrada vacía si la hubiera
);

export type SupportedLanguage = keyof typeof languages;

export const KEY_STORAGE = "lang";

const dictionaries: Record<SupportedLanguage, any> = {};
for (const path in allDictionaries) {
  const langCode = path.split('/').pop()?.replace('.json', '') as SupportedLanguage;
  if (langCode) {
    // allDictionaries[path].default contiene el contenido JSON importado
    dictionaries[langCode] = (allDictionaries[path] as { default: any }).default;
  }
}

// Función para obtener las traducciones para un idioma dado
export const getTranslations = (lang: SupportedLanguage = "es") => {
  return dictionaries[lang ?? "es"] || {}; // Retorna un objeto vacío si el idioma no se encuentra
};

export const displayNames = Object.keys(dictionaries).map((k) => {
    return [k, dictionaries[k].displayName]
});

export const getCurrentTranslation = () => {
  let currentTranslation: unknown = {};

  const locallang = globalThis.localStorage?.getItem(KEY_STORAGE);
  const lngNavigator = globalThis.navigator.language.split("-")[0];

  currentTranslation = getTranslations(lngNavigator);

  if (locallang) {
    currentTranslation = getTranslations(locallang);
  } 
  
  if (Object.values(currentTranslation ?? {}).length < 1) {
    if (locallang) {
      globalThis.localStorage?.removeItem(KEY_STORAGE);
    }
    currentTranslation = getTranslations();
  }

  return currentTranslation
}

export const defaultTranslation = getCurrentTranslation() ?? getTranslations();
