import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

import showcaseImageOne from '../assets/images/showcase1.png'
import showcaseImageTwo from '../assets/images/showcase2.png'
import showcaseImageThree from '../assets/images/showcase3.png'
import polySansBold from '../assets/fonts/PolySans-Bold.ttf'
import circularBold from '../assets/fonts/CircularStd-Bold.ttf'
import circular from '../assets/fonts/CircularStd-Medium.ttf'
import robotoLight from '../assets/fonts/Roboto-Light.ttf'
import polysans from '../assets/fonts/PolySans.ttf'
import polysansMedium from '../assets/fonts/PolySans-Bold.ttf'
import roboto from '../assets/fonts/Roboto-Regular.ttf'
import { resolve } from 'path';





var assestsLoaded = false

   
    

    

var viewport = window.innerWidth;
var mobile = 480;


Splitting();
const titleSectionHead = document.querySelectorAll('.main-header[data-splitting]')


const heroSectionTitle = document.querySelectorAll('.regular-header[data-splitting][data-effect15]');
const heroSectionText = document.querySelectorAll('.regular-text[data-splitting][data-effect16]');
const heroSectionTextContainer = document.querySelectorAll('.hero-section__hero-container--text-container')
const faqQuestionsContainer = document.querySelector('.faqSection__container--questions-container')



let lenis: Lenis;


lenis = new Lenis({
    lerp: 0.2,
    smoothWheel: true
});

lenis.on('scroll', () => ScrollTrigger.update());

const scrollFn = (time: any) => {
    lenis.raf(time);
    requestAnimationFrame(scrollFn);
};

requestAnimationFrame(scrollFn);


//Preloader 

window.addEventListener('load', () => {
document.body.style.position = 'fixed';
document.body.style.overflow = 'hidden';


const promises:any = []
    const loadImages = ([showcaseImageOne,showcaseImageTwo,showcaseImageThree])

    new Promise((resolve,reject)=> {
        const polySansBoldFont = new FontFace('polysansBold', `url(${polySansBold})`)
        const polysansMediumFont = new FontFace('polysansMedium',`url(${polysansMedium})`)
        const circularBoldFont = new FontFace('circeularBold',`url(${circularBold})`)
        const circularFont = new FontFace('circular', `url(${circular})`)
        const polysansFont = new FontFace('polysans',`url(${polysans})`)
        const robotoLightFont = new FontFace('robotoLight', `url(${robotoLight})`)
        const robotoFont = new FontFace('roboto', `url(${robotoLight})`)

        const allFonts = [polySansBoldFont,polysansFont,polysansMediumFont,circularBoldFont,circularFont,robotoLightFont,robotoFont]

        allFonts.forEach((fonts) => {
            fonts.load().then(resolve, reject);
        })
    })
    loadImages.forEach((asset) => {
        const img = new Image()
        img.src = asset
        promises.push(new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
          }))        
    })
    
    Promise.all(promises).then(() => {
        loaderTl.play()
        console.log(loaderTl.play())
      })

      console.log(promises)


    const loaderTl = gsap.timeline({paused:true})
    const preloader = document.querySelector<HTMLDivElement>(".preloader")

    const counter = document.querySelector(".count")
    let loaded = 0;

    loaderTl.fromTo('#loadImage1',{
        opacity:0,
        y:100,
        ease:"power3.inOut",
        
    }, {
        duration:0.4,
        display:'flex',
        ease:"power.inOut",
        opacity:1,
        y:0
    } )

    if(viewport > mobile) {
        loaderTl.fromTo('#loadImage2', {
            opacity:0,
            y:100
        },{y:0,opacity:1,ease:"power3.inOut",duration:0.5,display:"flex"})
        .fromTo('#loadImage3', {
            opacity:0,
            y:100
        },{y:0,opacity:1,ease:"power3.inOut",duration:0.6,display:"flex"})
        .fromTo('#loadImage4', {
            opacity:0,
            y:100
        },{y:0,opacity:1,ease:"power3.inOut",duration:0.7,display:"flex"})
    
        .to('#loadImage1', {
            opacity:0,
            duration:0.8
        })
        .to('#loadImage2',{
            opacity:0,
            duration:0.6
        })
        .to('#loadImage3',{
            opacity:0,
            duration:0.4
        })
        .to('#loadImage4',{
            y:'-5rem',
            opacity:0,
            duration:0.2
        })
    }

  
    loaderTl.to('.preloader', {
        y:"-100%",
        ease:"power3.inOut",
        duration:0.5,
        display:"none",
        zIndex:0
    })
    .fromTo('.container',{
        display:"none",
        opacity: 0   
    }, { display:"block", opacity:1, ease:"none",duration:0.01, onComplete:() =>
    {
       animations()
    
    
    } })

    //loader count

    const interval = setInterval(()=> {
        const percent = Math.round((loaded / 99) * 100)
        counter.innerHTML = percent.toString()
        loaded++
        if(loaded === 100){
            clearInterval(interval)
        }
    },35)
})


const animations = () => {
    document.body.style.position = '';
    document.body.style.overflow = '';
   

    
    const navTl = gsap.timeline()

    navTl.fromTo('.navbar-logo', {opacity:0},{ y: 0, opacity: 1, duration:1.5, clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)" },'<0.1')

    navTl.from('.nav-regular h3', {
        x:10,
        opacity:0,
        ease:"power3.inOut",
        stagger:0.04
    }, "<0.5")

    navTl.from('.navbar__button', {opacity:0})



 
    titleSectionHead.forEach(title => {
        gsap.from(title.querySelectorAll('.word'), {
            opacity:0,
            duration:1.2,
            y:20,
            stagger: 0.2,
            delay:0.9
        })

    })

    gsap.from('.titleSection__main-container--image-container', {
        opacity:0,
        scale:1.2,
        ease:"Power3.inOut",
        duration:1.5,
        delay:0.8
    })


    




        gsap.fromTo('.hero-section__hero-container--image img', {
            opacity:0,
        }, {opacity:1,
        ease:"Power3.inOut", duration:1.2,
        scrollTrigger:{
            trigger:'.hero-section__hero-container--image img',
            start: 'top bottom-=20%',
            end: 'center top+=20%',
            scrub: true,
        }
        })
        
        
        
        
        heroSectionTitle.forEach(title => {
            gsap.from(title.querySelectorAll('.word'), {
                opacity:0,
                y:20,
                stagger: 0.05,
                scrollTrigger:{
                    trigger: title,
                    start: 'top bottom-=20%',
                    end: 'center top+=20%',
                    scrub: true,
                }
            })
        })
    
        
    heroSectionText.forEach(text => {
        gsap.fromTo(text.querySelectorAll('.word'), {
            'will-change': 'opacity',
            opacity: 0.1
        }, 
        {
            ease: 'none',
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
                trigger: text,
                start: 'top bottom-=20%',
                end: 'center top+=20%',
                scrub: true,
            }
        });
    
    });    
    

}



   