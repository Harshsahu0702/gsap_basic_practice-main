var tl = gsap.timeline()

tl.from("h3",{
    y:-50,
    opacity:0,
    delay:0.4,
    duration:0.8,
    stagger:0.3,
})

tl.from("h1",{
    x:-500,
    opacity:0,
    duration:0.8,
    stagger:0.4,
})

gsap.from("img",{
    x:-100,
    delay:1.6,
    opacity:0,
    rotate:45,
    stagger:0.4,
})