$(document).ready(function () {

  // 검색 필드 기능
  // 검색 필드를 보여주는 버튼
  let searchBt = $('.search-bt');
  // 검색 필드
  let searchWrap = $('.search-wrap');

  // 검색필드 보여주는 버튼 클릭
  // 클릭할때 서서히 보이고 숨기기 토글
  // fadeToggle();

  searchWrap.click(function (event) {
    // 클릭된 것이 Body 로 못가게 막는다.
    event.stopPropagation();
  });

  searchBt.click(function (event) {
    event.preventDefault();
    // 클릭된 것이 Body 로 못가게 막는다.
    event.stopPropagation();
    searchWrap.stop().fadeToggle(300);

    // 검색 버튼 이미지 교체하기
    let imgName = $(this).find('img').attr('src');

    if (imgName == 'images/main_search.png') {
      $(this).find('img').attr('src', 'images/search_btn_close.png');
      $(this).css('background', '#3d66c4');
    } else {
      $(this).find('img').attr('src', 'images/main_search.png');
      $(this).css('background', '#fff');
    }

  });

  $('body').click(function () {
    searchWrap.stop().fadeOut(300);
    searchBt.find('img').attr('src', 'images/main_search.png');
    searchBt.css('background', '#fff');
  });



  // 링크사이트 펼침기능
  // footersite를저장
  let footerSite = $('.footer-site');

  // site-list를 저장
  let siteList = $('.site-list');

  footerSite.click(function () {

    let temp = $(this).hasClass('footer-site-open');
    if (temp == true) {
      siteList.stop().slideUp(500);
      $(this).removeClass('footer-site-open');
    } else {
      siteList.stop().slideDown(500);
      $(this).addClass('footer-site-open');
    }
  });

  footerSite.mouseleave(function () {
    siteList.stop().slideUp(500);
    $(this).removeClass('footer-site-open');
  });

});


window.onload = function () {
  // 랜덤 천사 기능(0~2)
  let rNum = Math.floor(Math.random() * 3);
  let rClass = 'about-box-char-' + rNum;
  let rTag = $('.about-box-sns');
  rTag.addClass(rClass);

  // 메뉴 기능
  let header = $('.header');
  let gnb = $('.gnb');
  let gnbH = gnb.height();

  gnb.mouseenter(function () {
    header.css('height', gnbH);
  });
  gnb.mouseleave(function () {
    header.css('height', 70);
  });

  // 비주얼 슬라이드
  new Swiper('.sw-visual', {
    slidesPerView: 3,
    grid: {
      rows: 2,
    },
    loop: true,
    navigation: {
      prevEl: '.sw-visual-prev',
      nextEl: '.sw-visual-next'
    },
    breakpoints: {
      760: {
        slidesPerView: 4,
        grid: {
          rows: 1,
        },
      },
      800: {
        slidesPerView: 4,
        grid: {
          rows: 1,
        },
      },
      960: {
        slidesPerView: 5,
        grid: {
          rows: 1,
        },
      },
      1080: {
        slidesPerView: 6,
        grid: {
          rows: 1,
        },
      },
      1200: {
        slidesPerView: 7,
        grid: {
          rows: 1,
        },
      },
      1260: {
        slidesPerView: 8,
        grid: {
          rows: 1,
        },
      },
    },
  });

  // about 슬라이드
  let swAbout = new Swiper('.sw-about', {
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    speed: 500,
    pagination: {
      el: '.sw-about-pg',
      type: 'fraction'
    },
    navigation: {
      nextEl: '.sw-about-next',
      prevEl: '.sw-about-prev'
    },
    allowTouchMove: false
  });

  let swAboutBt = $('.sw-about-pause');
  swAboutBt.click(function () {
    // 현재 class 상태 체크
    let temp = $(this).hasClass('sw-about-play');
    if (temp == true) {
      // 슬라이드 자동 실행
      swAbout.autoplay.start();
      // 아이콘을 pause 버튼으로 바꾼다.
      // 사용자는 멈추기 위해서 클릭을 하도록 안내한다.
      $(this).removeClass('sw-about-play');
    } else {
      // 슬라이드 멈춤
      swAbout.autoplay.stop();
      // 아이콘을 play 버튼으로 바꾼다.
      // 사용자는 멈춘 슬라이드를 play 하려고 할것이다.
      $(this).addClass('sw-about-play');
    }
  });

  // sid 슬라이드
  let swSid = new Swiper('.sw-sid', {
    loop: true,
    pagination: {
      el: '.sw-sid-pg',
      type: 'fraction'
    },
    navigation: {
      prevEl: '.sw-sid-prev',
      nextEl: '.sw-sid-next'
    },
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    // display 변경시 처리
    observer: true,
    observeParents: true,
  });

  // 자동 실행 멈춤/재생
  let swSidPause = $('.sw-sid-pause');
  swSidPause.click(function () {

    // 현재 sw-sid-play 클래스 적용중?
    // true, false
    let temp = $(this).hasClass('sw-sid-play');
    if (temp == false) {

      $(this).addClass('sw-sid-play');
      // 슬라이드 멈추기
      swSid.autoplay.stop();

    } else {

      $(this).removeClass('sw-sid-play');
      // 슬라이드 재생
      swSid.autoplay.start();

    }

  });
  // 뉴스 탭메뉴
  // 탭 메뉴 저장
  let newsBottomMenu = $('.news-bottom-menu > a');
  // 탭의 내용
  // html의 태그 구조의 문제가 발생합니다.
  let newsBottomCont = [
    // $('.news-box-bot').eq(0),
    $('.news-box-bot').eq(1),
    $('.news-box-bot').eq(2),
    $('.news-box-bot').eq(3),
  ];
  // 활성화될 번호 기억
  let newsBottomIdx = 0;
  // newsBottomCont[0].hide();
  // newsBottomCont[1].hide();
  // newsBottomCont[2].hide();
  // newsBottomCont[newsBottomIdx].show();
  // newsBottomMenu.removeClass('news-bottom-menu-active');
  // newsBottomMenu.eq(newsBottomIdx).addClass('news-bottom-menu-active');
  // 탭 메뉴 클릭시 내용 보여주기
  $.each(newsBottomMenu, function (index, item) {
    $(this).click(function (event) {
      event.preventDefault();

      newsBottomMenu.removeClass('news-bottom-menu-active');
      $(this).addClass('news-bottom-menu-active');

      newsBottomCont[0].hide();
      newsBottomCont[1].hide();
      newsBottomCont[2].hide();
      newsBottomCont[index].show();


    });
  });
  // 화면 리사이징시 jquery css 제거
  $(window).resize(function () {
    // 화면너비
    let wW = $(window).window();
    if (wW > 630) {
      newsBottomCont[0].removeAttr('style');
      newsBottomCont[1].removeAttr('style');
      newsBottomCont[2].removeAttr('style');
    }else{
      $.each(newsBottomMenu, function(index, item){

        // 화면 리사이즈 마다 물어본다.
        let temp = $(this).hasClass('news-bottom-menu-active');
        if(temp == true){
          newsBottomCont[0].hide();
          newsBottomCont[1].hide();
          newsBottomCont[2].hide();
          newsBottomCont[index].show();

        }
      })
    }
  })


};