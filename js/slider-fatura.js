import Dom from "./dom.js";

const dom = Dom();

export default class SliderFatura {
  constructor(slideWidth, slideWrapper, slides, btnPrev, btnNext) {
    this.slideWidth = dom.el(slideWidth);
    this.slides = dom.els(slides);
    this.slideWrapper = dom.el(slideWrapper);
    this.btnPrev = dom.el(btnPrev);
    this.btnNext = dom.el(btnNext);
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.active = "active";
    this.config = {
      dist: this.slideWidth.getBoundingClientRect().left,
    };
  }

  handleClickPrev() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateScroll();
    }
  }

  goPrev() {
    this.btnPrev.addEventListener("click", this.handleClickPrev);
  }

  handleClickNext() {
    this.currentSlide++;
    this.updateScroll();
  }

  goNext() {
    this.btnNext.addEventListener("click", this.handleClickNext);
  }

  updateScroll() {
    const bodyWidth = document.body.clientWidth / 2;
    const scrollSlide = bodyWidth * this.currentSlide;

    this.slideWrapper.scroll({
      top: 0,
      left: scrollSlide,
      behavior: "smooth",
    });
  }

  bindEvent() {
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  init() {
    this.bindEvent();
    this.goPrev();
    this.goNext();
  }
}
