// https://www.youtube.com/watch?v=6QE8dXq9SOE&t=1602s 참고

const wrapper = document.querySelector(".carousel_wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".carousel_wrapper button");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false;
let startX;
let startScrollLeft;
let timeoutId;

// Get the number of cards that acn fit in the carousel at once
// 캐러셀 전체너비를 카드너비로 나눠서 한화면에 몇개 카드가 보이는지
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
// slice(-n)은 배열의 마지막 n개 반환, 캐러셀 시작 부분에 카드 추가
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to beginning of carousel for infinite scrolling
// slice(-n)은 배열의 마지막 n개 반환, 캐러셀 마지막 부분에 카드 추가
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Add event listers for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "prev" ? -firstCardWidth : firstCardWidth;
  });
});

function dragStart(e) {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records thr initial cursor and scroll position of the carousel
  // 캐러셀의 초기 커서 위치, 스크롤 위치 저장
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

function dragging(e) {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on thr cursor movement
  // 커서 움직임에 따라 캐러셀 스크롤 위치 업데이트
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

function dragStop() {
  isDragging = false;
  carousel.classList.remove("dragging");
}

function autoPlay() {
  if (window.innerWidth < 800) return; // return if window is smaller than 800(mobile)

  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => {
    carousel.scrollLeft += firstCardWidth;
  }, 1500);
}
autoPlay();

function infiniteScroll() {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse if not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
