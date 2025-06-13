
import type { SupportedLanguage } from './utils/i18n';

declare global {
  interface Window {
    Alpine: import('alpinejs').Alpine;
  }
}