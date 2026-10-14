/**
 * theme.js — OPark theme management
 *
 * - Reads localStorage for explicit user preference ('opark-theme': 'light' | 'dark')
 * - Falls back to prefers-color-scheme media query
 * - Applies/removes .dark class on <html>
 * - Exposed as window.OParkTheme for use by other scripts
 *
 * IMPORTANT: This script must be loaded as early as possible (inline in <head>)
 * to prevent flash of wrong theme.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'opark-theme';
  const html = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getEffectiveTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light') return 'light';
    if (stored === 'dark') return 'dark';
    return 'dark'; // Default theme is dark
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    html.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    updateToggleButtons();
    return next;
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
    updateToggleButtons();
  }

  function updateToggleButtons() {
    const isDark = html.classList.contains('dark');
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      const iconLight = btn.querySelector('[data-theme-icon-light]');
      const iconDark = btn.querySelector('[data-theme-icon-dark]');
      const label = btn.querySelector('[data-theme-label]');

      if (iconLight) iconLight.classList.toggle('hidden', !isDark);
      if (iconDark) iconDark.classList.toggle('hidden', isDark);
      if (label) label.textContent = isDark ? 'Светла тема' : 'Тъмна тема';
      btn.setAttribute('aria-label', isDark ? 'Превключи към светла тема' : 'Превключи към тъмна тема');
      btn.setAttribute('title', isDark ? 'Светла тема' : 'Тъмна тема');
    });
  }

  // Apply theme immediately to prevent flash
  applyTheme(getEffectiveTheme());

  // System preference change listener (only applies if user has not chosen manually)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      if (e.matches) {
        applyTheme('dark');
        updateToggleButtons();
      }
    }
  });

  // Expose API
  window.OParkTheme = {
    toggle: toggleTheme,
    set: setTheme,
    get: getEffectiveTheme,
    update: updateToggleButtons,
  };

  // Update buttons once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateToggleButtons);
  } else {
    updateToggleButtons();
  }
})();
