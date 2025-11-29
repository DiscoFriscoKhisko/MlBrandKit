import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once globally
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
