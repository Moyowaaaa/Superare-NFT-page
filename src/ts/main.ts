import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";




Splitting();
const titleSectionHead = document.querySelectorAll('.main-header[data-splitting]')

console.log(titleSectionHead)

const heroSectionTitle = document.querySelectorAll('.regular-header[data-splitting][data-effect15]');
const heroSectionText = document.querySelectorAll('.regular-text[data-splitting][data-effect16]');


const heroSectionTextContainer = document.querySelectorAll('.hero-section__hero-container--text-container')
console.log(heroSectionTextContainer)

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
    const loaderTl = gsap.timeline()
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
    .to('.preloader', {
        y:"-100%",
        ease:"power3.inOut",
        duration:0.5,
        display:"none",
        zIndex:0
    })
    .fromTo('.container',{
        display:"none",
        opacity: 0   
    }, { display:"block", opacity:1, ease:"none",duration:0.1, onComplete:() =>
    {
        titleSectionAnimations(),
        heroSectionAnimations()
    
    
    } })
    


    

    const interval = setInterval(()=> {
        const percent = Math.round((loaded / 99) * 100)
        counter.innerHTML = percent.toString()
        loaded++
        if(loaded === 100){
            clearInterval(interval)
        }
    },35)
})


const titleSectionAnimations = () => {
    document.body.style.position = '';
document.body.style.overflow = '';
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

}
    




    const heroSectionAnimations = () => {
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


