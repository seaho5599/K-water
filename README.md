# K-water
K-water

// 마우스 휠 코드
  let section = $(".wrap > section");
  let footer = $(".footer");

  let sectionSpeed = 500;
  let sectionPos = [];
  let sectionIndex = 0;
  // 연속 휠 막기
  let scrollIng = false;
  // 화면사이즈 체크
  let wheelIng = true;
  let sectionMenu = $(".section-menu");

  function wheelCheckFn() {
    let wW = window.innerWidth;
    if (wW <= 1000) {
      wheelIng = false;
      sectionMenu.hide();
    } else {
      wheelIng = true;
      sectionMenu.show();
      mobileMenu.removeClass("mobile-menu-active");
      mobileBt.find("img").attr("src", "images/main_allmenu.png");
    }
  }
  wheelCheckFn();
  $(window).resize(function () {
    wheelCheckFn();
  });
  // 위치 파악 (Y 스크롤 이동 px )
  function resetSection() {
    $.each(section, function (index, item) {
      let tempY = $(this).offset().top;
      tempY = Math.ceil(tempY);
      sectionPos[index] = tempY;
    });

    // footer 위치를 추가 및 변경 합니다.
    sectionPos[sectionPos.length] = Math.ceil(footer.offset().top);
  }
  // 최초에 새로고침 또는 실행시 위치값파악
  resetSection();
  // footer 추가로 인한 코드 위치 변경
  let sectionTotal = sectionPos.length;
  $(window).resize(function () {
    resetSection();
    if (wheelIng) {
      // 색상 셋팅
      sectionColor();
      gsap.to($("html"), sectionSpeed / 1000, {
        scrollTo: sectionPos[sectionIndex],
        onComplete: function () {
          scrollIng = false;
        },
      });
    }
  });
  // 스크롤바의 윗쪽 위치값을 파악한다.
  $(window).scroll(function () {
    if (wheelIng) {
      return;
    }
    let tempY = $(window).scrollTop();
    tempY = Math.ceil(tempY);
    for (let i = sectionTotal - 1; i >= 0; i--) {
      let tempMax = sectionPos[i];
      if (tempY >= tempMax) {
        sectionIndex = i;
        break;
      }
    }
  });
  // 마우스 휠 체크
  $(window).bind("mousewheel DOMMouseScroll", function (event) {
    let distance = event.originalEvent.wheelDelta;
    if (distance == null) {
      distance = event.originalEvent.detail * -1;
    }
    // 화면 사이즈에 따른 작동여부
    if (wheelIng != true) {
      return;
    }

    // 연속 휠 막아준다.
    if (scrollIng) {
      return;
    }
    scrollIng = true;

    if (distance < 0) {
      sectionIndex++;
      if (sectionIndex >= sectionTotal) {
        sectionIndex = sectionTotal - 1;
      }
    } else {
      sectionIndex--;
      if (sectionIndex <= 0) {
        sectionIndex = 0;
      }
    }
