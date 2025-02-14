// Import GSAP
import { gsap } from 'gsap';
// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
const initializeAOS = () => {
  AOS.init({
    duration: 800, // Durasi animasi
    easing: 'ease-out', // Easing animasi
    once: true, // Hanya animasi sekali
  });
};

// Animasi Button dengan GSAP
const animateButton = () => {
  gsap.utils.toArray('.button').forEach((button) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
    button.addEventListener('click', () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    });
  });
};

// Inisialisasi setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {
  initializeAOS();
  animateButton();
});
