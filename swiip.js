class Carousel {
    constructor(element, options) {
        this.element = element;
        if (options === undefined) {
            options = {};
        }
        this.options = options;
        this.autoPlayID = null;
        this.trackWidth = 0;
        //options
        this.prevBtn = this.options.prevBtn || null;
        this.nextBtn = this.options.nextBtn || null;
        this.slidesToScroll = this.options.slidesToScroll || 1;
        this.slidesVisible = this.options.slidesVisible || 4;
        this.autoPlay = options.autoPlay || false;
        this.autoPlaySpeed = this.options.autoPlaySpeed || 3000;
        this.gap = this.options.gap || 0;
        this.baseOptions = {
            slidesToScroll: this.options.slidesToScroll || 1,
            slidesVisible: this.options.slidesVisible || 1,
            autoPlay: this.options.autoPlay || false,
            autoPlaySpeed: this.options.autoPlaySpeed || 3000,
            gap: this.options.gap || 1
        };
        this.responsive = this.options.responsive || [
            {
                breakpoint: 1024,
                slidesToScroll: 1,
                slidesVisible: 3,
                gap: 1,
                autoPlay: true,
                autoPlaySpeed: 3000
            },
            {
                breakpoint: 768,
                slidesToScroll: 1,
                slidesVisible: 2,
                gap: 1,
                autoPlay: true,
                autoPlaySpeed: 2000
            },
            {
                breakpoint: 576,
                slidesToScroll: 1,
                slidesVisible: 2,
                gap: 1,
                autoPlay: true,
                autoPlaySpeed: 2000
            },
            {
                breakpoint: 400,
                slidesToScroll: 1,
                slidesVisible: 1,
                gap: 1,
                autoPlay: true,
                autoPlaySpeed: 2000
            }
        ];
        this.maxBreakpoint = this.getMaxBreakpoint(this.responsive);
        //children
        this.track = document.createElement("div");
        this.track.classList.add("swiip_track");
        this.slides = [...this.element.children];
        this.slides.forEach((slide) => {
            this.track.appendChild(slide);
            slide.classList.add("swiip_slide");
            slide.querySelectorAll("img").forEach((img) => (img.draggable = false));
        });
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("swiip_wrapper");
        this.wrapper.appendChild(this.track);
        this.element.appendChild(this.wrapper);

        //index
        this.index = this.slidesVisible;

        //init
        this.init();
    }

    getMaxBreakpoint(breakpoints) {
        let max = 0;
        for (let i = 0; i < breakpoints.length; i++) {
            if (breakpoints[i].breakpoint > max) {
                max = breakpoints[i].breakpoint;
            }
        }
        return max;
    }

    createClones() {
        for (let i = 0; i < this.slidesVisible; i++) {
            let first = this.slides[i].cloneNode(true);
            first.classList.add("clone");
            let last = this.slides[this.slides.length - 1 - i].cloneNode(true);
            last.classList.add("clone");
            this.track.appendChild(first);
            this.track.prepend(last);
        }
        this.updatedChildren = [...this.track.children];
    }

    destroyClones() {
        this.updatedChildren.forEach((child) => {
            if (child.classList.contains("clone")) {
                this.track.removeChild(child);
            }
        });
    }

    disableActions() {
        this.track.addEventListener("transitionstart", () => {
            this.track.style.pointerEvents = "none";
            this.track.style.userSelect = "none";
            this.track.style.touchAction = "none";
            this.track.style.msTouchAction = "none";
            this.track.style.webkitUserSelect = "none";
            this.track.style.webkitTouchCallout = "none";
            if(this.prevBtn) this.prevBtn.style.pointerEvents = "none";
            if(this.nextBtn) this.nextBtn.style.pointerEvents = "none";
        });
        this.track.addEventListener("transitionend", () => {
            this.track.style.pointerEvents = "auto";
            this.track.style.userSelect = "auto";
            this.track.style.touchAction = "auto";
            this.track.style.msTouchAction = "auto";
            this.track.style.webkitUserSelect = "auto";
            this.track.style.webkitTouchCallout = "auto";
            if(this.prevBtn) this.prevBtn.style.pointerEvents = "auto";
            if(this.nextBtn) this.nextBtn.style.pointerEvents = "auto";
        });
    }

    setTrackStyle() {
        this.track.style.display = "grid";
        this.track.style.gap = `${this.gap}rem`;
        this.minusGap = (this.gap * (this.slidesVisible - 1)) / this.slidesVisible;
        this.track.style.gridTemplateColumns = `repeat(${this.updatedChildren.length
            }, calc(${100 / this.slidesVisible}% - ${this.minusGap}rem))`;
        this.track.style.transform = `translateX(calc(-${this.index * (100 / this.slidesVisible)
            }% - (${this.gap / this.slidesVisible} * ${this.index}rem)))`;
    }

    swipNext() {
        this.index = this.index + this.slidesToScroll;
        let targetTransform = `translateX(calc(-${this.index * (100 / this.slidesVisible)}% - (${this.gap / this.slidesVisible} * ${this.index}rem)))`;
        let animate = () => {
            this.track.style.transform = targetTransform;
            this.track.style.transition = "transform 0.5s";
        };
        requestAnimationFrame(animate);
    }

    swipPrev() {
        this.index = this.index - this.slidesToScroll;
        let targetTransform = `translateX(calc(-${this.index * (100 / this.slidesVisible)
            }% - (${this.gap / this.slidesVisible} * ${this.index}rem)))`;
        
        let animate = () => {
            this.track.style.transform = targetTransform;
            this.track.style.transition = "transform 0.5s";
        }
        requestAnimationFrame(animate);
    }

    resetIndex() {
        this.track.addEventListener("transitionend", () => {
            if (this.index >= this.updatedChildren.length - this.slidesVisible) {
                this.index = this.slidesVisible;
                this.track.style.transform = `translateX(calc(-${this.index * (100 / this.slidesVisible)
                    }% - (${this.gap / this.slidesVisible} * ${this.index}rem)))`;
                this.track.style.transition = "none";
            }
            if (this.index <= 0) {
                this.index = this.slidesVisible;
                this.track.style.transform = `translateX(calc(-${this.index * (100 / this.slidesVisible)
                    }% - (${this.gap / this.slidesVisible} * ${this.index}rem)))`;
                this.track.style.transition = "none";
            }
        });
    }

    launchAutoPlay() {
        if (!this.autoPlay) {
            return;
        }
        this.autoPlayID = setInterval(() => {
            this.swipNext();
        }, this.autoPlaySpeed);
    }

    pause() {
        clearInterval(this.autoPlayID);
    }

    dragLeft() {
        let x;
        let isDragging = false;

        const handleMouseDown = (e) => {
            e.stopPropagation();
            x = e.clientX;
            isDragging = true;
        };

        const handleMouseMove = (e) => {
            e.stopPropagation();
            if (isDragging) {
                const x2 = e.clientX;
                const calc = x - x2;
                if (calc > 99) {
                    this.swipNext();
                    isDragging = false;
                }
            }
        };

        const handleMouseUp = (e) => {
            e.stopPropagation();
            isDragging = false;
        };

        this.track.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    dragRight() {
        let x;
        let isDragging = false;

        const handleMouseDown = (e) => {
            e.stopPropagation();
            x = e.clientX;
            isDragging = true;
        };

        const handleMouseMove = (e) => {
            e.stopPropagation();
            if (isDragging) {
                const x2 = e.clientX;
                const calc = x2 - x;
                if (calc > 99) {
                    this.swipPrev();
                    isDragging = false;
                }
            }
        };

        const handleMouseUp = (e) => {
            e.stopPropagation();
            isDragging = false;
        };

        this.track.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    touchLeft() {
        let x;

        const handleTouchStart = (e) => {
            x = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            const x2 = e.changedTouches[0].clientX;
            const calc = x2 - x;
            if (calc < -99) {
                this.swipNext();
            }
        };

        this.track.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchend", handleTouchEnd);
    }

    touchRight() {
        let x;

        const handleTouchStart = (e) => {
            x = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            const x2 = e.changedTouches[0].clientX;
            const calc = x2 - x;
            if (calc > 99) {
                this.swipPrev();
            }
        };

        this.track.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchend", handleTouchEnd);
    }

    ifTabNotActive() {
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                this.pause();
            } else {
                this.launchAutoPlay();
            }
        });
    }

    setResponsive() {
        const width = window.innerWidth;
        this.responsive.forEach((breakpoint) => {
            if (width < breakpoint.breakpoint) {
                this.pause();
                this.slidesToScroll = breakpoint.slidesToScroll;
                this.slidesVisible = breakpoint.slidesVisible;
                this.autoPlay = breakpoint.autoPlay;
                this.autoPlaySpeed = breakpoint.autoPlaySpeed;
                this.gap = breakpoint.gap;
                this.index = breakpoint.slidesVisible;
                this.destroyClones();
                this.createClones();
                this.setTrackStyle();
                this.launchAutoPlay();
            }
            if (width > this.maxBreakpoint) {
                this.pause();
                this.slidesToScroll = this.baseOptions.slidesToScroll;
                this.slidesVisible = this.baseOptions.slidesVisible;
                this.autoPlay = this.baseOptions.autoPlay;
                this.autoPlaySpeed = this.baseOptions.autoPlaySpeed;
                this.gap = this.baseOptions.gap;
                this.index = this.baseOptions.slidesVisible;
                this.destroyClones();
                this.createClones();
                this.setTrackStyle();
                this.resetIndex();
                this.pause();
                this.launchAutoPlay();
            }
        });
    }

    clickNext() {
        if (!this.nextBtn) return;
        this.nextBtn.addEventListener("click", () => {
            this.swipNext();
        });
    }

    clickPrev() {
        if (!this.prevBtn) return;
        this.prevBtn.addEventListener("click", () => {
            this.swipPrev();
        });
    }

    init() {
        this.createClones();
        this.setTrackStyle();
        this.launchAutoPlay();
        this.resetIndex();
        this.ifTabNotActive();
        this.wrapper.addEventListener("mouseover", () => {
            this.pause();
        });
        this.wrapper.addEventListener("mouseleave", () => {
            this.launchAutoPlay();
        });
        this.dragLeft();
        this.dragRight();
        this.touchLeft();
        this.touchRight();
        this.clickNext();
        this.clickPrev();
        this.disableActions();
        this.setResponsive();

        window.addEventListener("resize", (e) => {
            this.setResponsive();
        });

        return this;
    }
}
HTMLElement.prototype.Swiip = function (options) {
    return new Carousel(this, options);
};
