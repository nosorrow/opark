/**
 * main.js — OPark main JavaScript
 *
 * Handles:
 * - Mobile navigation open/close
 * - Smooth scroll for anchor links + mobile menu close
 * - Active nav link highlighting on scroll
 * - Dynamic copyright year
 * - Flowbite initialization
 */

import 'flowbite';

document.addEventListener('DOMContentLoaded', function () {
  // ─── Copyright year ────────────────────────────────────────
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ─── Mobile navigation ─────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

  function openMobileMenu() {
    mobileMenu?.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
    mobileMenu?.classList.add('translate-x-0', 'opacity-100');
    mobileMenuOverlay?.classList.remove('hidden');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu?.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
    mobileMenu?.classList.remove('translate-x-0', 'opacity-100');
    mobileMenuOverlay?.classList.add('hidden');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  mobileMenuClose?.addEventListener('click', closeMobileMenu);
  mobileMenuOverlay?.addEventListener('click', closeMobileMenu);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Close mobile menu when a nav link is clicked
  document.querySelectorAll('#mobile-menu a[href]').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // ─── Smooth scroll for anchor links ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Active nav section on scroll ──────────────────────────
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              const href = link.getAttribute('href');
              const isActive = href === '#' + id || href === '/#' + id;
              link.classList.toggle('active', isActive);
              link.classList.toggle('text-teal-600', isActive);
              link.classList.toggle('dark:text-teal-400', isActive);
            });
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ─── Theme toggle buttons ───────────────────────────────────
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.OParkTheme?.toggle();
    });
  });

  // Ensure toggle icons are correct after DOM ready
  window.OParkTheme?.update();
});
