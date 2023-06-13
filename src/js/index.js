import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

import showcaseImageOne from '../assets/images/showcase1.png'
import showcaseImageTwo from '../assets/images/showcase2.png'
import showcaseImageThree from '../assets/images/showcase3.png'


var viewport = window.innerWidth;
var mobile = 480;

Splitting();
const titleSectionHead = document.querySelectorAll(
  ".main-header[data-splitting]"
);

const heroSectionTitle = document.querySelectorAll(
  ".regular-header[data-splitting][data-effect15]"
);
const heroSectionText = document.querySelectorAll(
  ".regular-text[data-splitting][data-effect16]"
);
const firstShowcaseTitle = Array.from(
  document.querySelectorAll(".main-subheader[data-splitting]")
);
const showcaseImages = document.querySelectorAll(
  ".showcaseSection__showcase-container--first__image-container"
);
const joinImage = document.querySelector(
  ".joinSection__container--image-container"
);

const showcaseDescriptions = Array.from(document.querySelectorAll("[data-splitting][data-effect-showcase-description]"))


const yearElement = document.querySelector("#year");
yearElement.textContent = new Date().getFullYear().toString();

let lenis;

lenis = new Lenis({
  lerp: 0.2,
  smoothWheel: true,
});

lenis.on("scroll", () => ScrollTrigger.update());

const scrollFn = (time) => {
  lenis.raf(time);
  requestAnimationFrame(scrollFn);
};

requestAnimationFrame(scrollFn);

//Preloader

window.addEventListener("load", () => {
  document.body.style.position = "fixed";
  document.body.style.overflow = "hidden";

  const promises = [];
  const loadImages = [showcaseImageOne, showcaseImageTwo, showcaseImageThree];


  loadImages.forEach((asset) => {
    const img = new Image();
    img.src = asset;
    promises.push(
      new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      })
    );
  });

  Promise.all(promises).then(() => {
    loaderTl.play();
  });

  const loaderTl = gsap.timeline({ paused: true });

  const counter = document.querySelector(".count");
  let loaded = 0;

  gsap.set('.container',{opacity:0})
  loaderTl.fromTo(
    "#loadImage1",
    {
      opacity: 0,
      y: 100,
      ease: "power3.inOut",
    },
    {
      duration: 0.4,
      display: "flex",
      ease: "power.inOut",
      opacity: 1,
      y: 0,
    }
  );

  if (viewport > mobile) {
    loaderTl
      .fromTo(
        "#loadImage2",
        {
          opacity: 0,
          y: 100,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power3.inOut",
          duration: 0.5,
          display: "flex",
        }
      )
      .fromTo(
        "#loadImage3",
        {
          opacity: 0,
          y: 100,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power3.inOut",
          duration: 0.6,
          display: "flex",
        }
      )
      .fromTo(
        "#loadImage4",
        {
          opacity: 0,
          y: 100,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power3.inOut",
          duration: 0.7,
          display: "flex",
        }
      )

      .to("#loadImage1", {
        opacity: 0,
        duration: 0.8,
      })
      .to("#loadImage2", {
        opacity: 0,
        duration: 0.6,
      })
      .to("#loadImage3", {
        opacity: 0,
        duration: 0.4,
      })
      .to("#loadImage4", {
        y: "-5rem",
        opacity: 0,
        duration: 0.2,
      });
  }

  //loader count

  const interval = setInterval(() => {
    const percent = Math.round((loaded / 99) * 100);
    counter.innerHTML = percent.toString();
    loaded++;

    //Remove loader

    if (loaded === 100) {
      clearInterval(interval);
      loaderTl
      .to(".preloader", {
        y: "-100%",
        ease: "power3.inOut",
        duration: 0.5,
        display: "none",
        zIndex: 0,
      })
      .fromTo(
        ".container",
        {
          display: "none",
          opacity: 0,
        },
        {
          display: "block",
          opacity: 1,
          ease: "none",
          duration: 0.01,
          onComplete: () => {
            animations();
          },
        }
      );
    }
  }, 25);
});

const animations = () => {
  gsap.set('.container',{opacity:1})
  document.body.style.position = "";
  document.body.style.overflow = "";

  const navTl = gsap.timeline();

  navTl.fromTo(
    ".navbar-logo",
    { opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
    },
    "<0.1"
  );

  navTl.from(
    ".nav-regular h3",
    {
      x: 10,
      opacity: 0,
      ease: "power3.inOut",
      stagger: 0.04,
    },
    "<0.5"
  );

  navTl.from(".navbar__button", { opacity: 0 });

  const titleSectionTl = gsap.timeline();

  titleSectionHead.forEach((title) => {
    titleSectionTl.from(title.querySelectorAll(".word"), {
      opacity: 0,
      duration: 0.8,
      y: 20,
      stagger: 0.2,
      delay: 0.9,
    });
  });

  titleSectionTl
    .from(
      ".titleSection__main-container--image-container",
      {
        opacity: 0,
        scale: 1.2,
        ease: "Power3.inOut",
        duration: 0.7,
      },
      "<0.1"
    )
    .from(
      [".titleSection-text", ".titleSection-button"],
      {
        opacity: 0,
        y: 20,
        ease: "power3.inOut",
      },
      "<0.1"
    )
    .fromTo(
      ".titleSection-clients",
      { opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
      },
      "<0.3"
    );

  gsap.fromTo(
    ".hero-section__hero-container--image img",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      ease: "Power3.inOut",
      duration: 1.2,
      scrollTrigger: {
        trigger: ".hero-section__hero-container--image img",
        start: "top bottom-=20%",
        end: "center top+=20%",
        scrub: true,
      },
    }
  );

  if (viewport > mobile) {
  heroSectionTitle.forEach((title) => {
    gsap.from(title.querySelectorAll(".word"), {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      scrollTrigger: {
        trigger: title,
        start: "top bottom-=20%",
        end: "center top+=20%",
        scrub: true,
      },
    });
  });

  heroSectionText.forEach((text) => {
    gsap.fromTo(
      text.querySelectorAll(".word"),
      {
        "will-change": "opacity",
        opacity: 0.1,
      },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: text,
          start: "top bottom-=20%",
          end: "center top+=20%",
          scrub: true,
        },
      }
    );
  });
}

  if (viewport > mobile) {
    firstShowcaseTitle.forEach((text) => {
      gsap.from(text.querySelectorAll(".word"), {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        scrollTrigger: {
          trigger: text,
          start: "top bottom-=20%",
          end: "center top+=20%",
          scrub: true,
        },
      });
    });

    showcaseImages.forEach((image) => {
      gsap.to(image, {
        scale: 1.2,

        scrollTrigger: {
          trigger: image,
          start: "top bottom-=20%",
          end: "center top+=20%",
          scrub: true,
        },
      });
    });

    showcaseDescriptions.forEach((text) => {
      gsap.fromTo(
        text.querySelectorAll(".word"),
        {
          "will-change": "opacity",
          opacity: 0.1,
        },
        {
          ease: "none",
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: text,
            start: "top bottom-=20%",
            end: "center top+=80%",
            scrub: true,
          },
        }
      );
    })

    gsap.from(".faqSection__container--questions-container", {
      opacity: 0,
      y: 20,
      duration: 1,
      scrollTrigger: {
        trigger: ".faqSection__container--questions-container",
        start: "top bottom-=20%",
        end: "center top+=20%",
        scrub: true,
      },
    });
    gsap.fromTo('.joinSection__container--image-container img',{ opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
      scrollTrigger:{
        trigger:'.joinSection__container--image-container img',
        start: "top bottom-=20%",
        end: "center top+=30%",
        scrub:0.4
      }
    })
    gsap.timeline({
      scrollTrigger: {
        trigger: '.characterSection__characters-container',
        scrub: -1,
        start: 'center +=600',
        end: 'bottom +=300',
        toggleActions: 'play pause resume restart',
      }
    }).to('#top-images', {
      xPercent: -40 * 5,
      duration: 20,
      ease: "power3.inOut",
 }).to('#bottom-images', {
  xPercent: -40 * 5,
  duration: 20,
  ease: "power3.inOut",
 })

  }
};
