/**
 * Конфигурация стилей для song with animals pipeline
 * Стили теперь выбираются через UI
 */

import { defaultStyle } from './defaultStyle.js';
import { steampunkStyle } from './steampunkStyle.js';
import { futuristicRobotsStyle } from './futuristicRobotsStyle.js';
import { retroRobotsStyle } from './retroRobotsStyle.js';
import { halloweenPatchworkStyle } from './halloweenPatchworkStyle.js';

// Доступные стили
export const AVAILABLE_STYLES = {
  default: 'default',
  steampunk: 'steampunk',
  'futuristic-robots': 'futuristic-robots',
  'retro-robots': 'retro-robots',
  'halloweenPatchwork': 'halloweenPatchwork',
  'spooky-plush': 'halloweenPatchwork', // Алиас для обратной совместимости
  'halloween-patchwork': 'halloweenPatchwork', // Алиас для обратной совместимости
  'halloween': 'halloweenPatchwork' // Алиас для обратной совместимости
} as const;

export type StyleName = keyof typeof AVAILABLE_STYLES;

// Типы для стилей
export interface VisualStyle {
  name: string;
  displayName: string;
  description: string;
  characterStyle: string;
  environmentStyle: string;
  colorPalette: string;
  renderStyle?: string;
}

// Функция для получения стиля по имени
export function getStyle(styleName: string): VisualStyle {
  console.log('=== GETSTYLE DEBUG ===');
  console.log('Requested styleName:', styleName);
  
  // Алиасы для обратной совместимости
  const styleAliases: Record<string, string> = {
    'spooky-plush': 'halloweenPatchwork',
    'halloween-patchwork': 'halloweenPatchwork',
    'halloween': 'halloweenPatchwork'
  };
  
  // Применяем алиас если нужно
  const actualStyleName = styleAliases[styleName] || styleName;
  console.log('Actual style name after alias resolution:', actualStyleName);
  
  const styles: Record<string, VisualStyle> = {
    default: defaultStyle,
    steampunk: steampunkStyle,
    'futuristic-robots': futuristicRobotsStyle,
    'retro-robots': retroRobotsStyle,
    'halloweenPatchwork': halloweenPatchworkStyle,
  };
  
  console.log('Available styles:', Object.keys(styles));
  
  if (!styles[actualStyleName]) {
    const errorMessage = `Style '${styleName}' (resolved to '${actualStyleName}') not found. Available styles: ${Object.keys(styles).join(', ')}`;
    console.error('=== STYLE ERROR ===');
    console.error(errorMessage);
    console.error('=== END STYLE ERROR ===');
    throw new Error(errorMessage);
  }
  
  const result = styles[actualStyleName];
  console.log('Returning style:', result.name);
  console.log('=== END GETSTYLE DEBUG ===');
  
  return result;
}

// Функция для получения списка доступных стилей
export function getAvailableStyles(): { name: string; displayName: string; description: string }[] {
  return [
    { name: defaultStyle.name, displayName: defaultStyle.displayName, description: defaultStyle.description },
    { name: steampunkStyle.name, displayName: steampunkStyle.displayName, description: steampunkStyle.description },
    { name: futuristicRobotsStyle.name, displayName: futuristicRobotsStyle.displayName, description: futuristicRobotsStyle.description },
    { name: retroRobotsStyle.name, displayName: retroRobotsStyle.displayName, description: retroRobotsStyle.description },
    { name: halloweenPatchworkStyle.name, displayName: halloweenPatchworkStyle.displayName, description: halloweenPatchworkStyle.description },
  ];
}

// Функция для проверки валидности стиля
export function isValidStyle(styleName: string): styleName is StyleName {
  return styleName in AVAILABLE_STYLES;
}
