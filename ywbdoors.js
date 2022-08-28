function initDoors(params){
  document.addEventListener('DOMContentLoaded', function(){
    css = document.createElement('link');
    css.setAttribute('rel','stylesheet');
    css.setAttribute('type','text/css');
    css.setAttribute('href','ywbdoors.css');
    document.querySelector('head').append(css);

    let formBlock = document.querySelector(params.selectors.form);
    formBlock.style.display = 'none';
    let doorsBlock = document.querySelector(params.selectors.doors);
    doorsBlock.innerHTML =
      `<div class="door__wrapper">
    <h2 class="door__title"></h2>
    <div class="door__container">
      <div class="box">
        <div class="hi">
          <p id="door__sales2" class="door__sales "></p>
        </div>
        <div id="door__2" class="door">
        </div>
      </div>
      <div class="box">
        <div class="hi">
          <p id="door__sales1" class="door__sales "></p>
        </div>
        <div id="door__1" class="door">
        </div>
      </div>
      <div class="box">
        <div class="hi">
          <p id="door__sales3" class="door__sales "></p>
        </div>
        <div id="door__3" class="door">
        </div>
      </div>
    </div>
  </div>
  <div class="spin-result-wrapper">
    <div class="pop-up-window">
      <p class="pop-up-text"></p>
      <span class="pop-up-button" href="">OK</span>
    </div>
  </div>`;
    let doors = document.querySelectorAll(".door");
    let boxes = document.querySelectorAll(".box");
    let doorSales = document.querySelectorAll(".door__sales");
    let doorWrapper = document.querySelector(".door__wrapper");
    let spinResultWrapper = document.querySelector(".spin-result-wrapper");
    let door1 = document.getElementById("door__1");
    let door2 = document.getElementById("door__2");
    let door3 = document.getElementById("door__3");
    let doorSale1 = document.getElementById("door__sales1");
    let doorSale2 = document.getElementById("door__sales2");
    let doorSale3 = document.getElementById("door__sales3");
    document.querySelector('.door__title').innerText=params.texts.title;
    document.querySelector('.pop-up-text').innerText=params.texts.popup;

    boxes.forEach(function(box) {
      box.addEventListener("click", spin);
    });
    doors.forEach(function(door) {
      door.addEventListener("click", openDoor);
    });

    document.querySelector('.pop-up-button').addEventListener('click', function(e) {
      e.preventDefault();
      fadeOut(document.querySelector('.spin-result-wrapper'))
    });


    const anchors = document.querySelectorAll('a');

    for (let anchor of anchors) {
      if (!anchor.getAttribute('href')) continue;
      if (anchor.getAttribute('href')!=params.selectors.form) continue;

      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.getElementById(params.selectors.doors.substring(1)).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }

    function openDoor(e) {
      e.currentTarget.classList.add("open");
      setTimeout(function() {
        spinResultWrapper.style.display = "block";
      }, 2500);
      doorSales.forEach(function(sale) {
        if (door1.classList.contains("open")) {
          doorSale1.innerHTML = "50%";
          doorSale2.innerHTML = "10%";
          doorSale3.innerHTML = "25%";
        } else if (door2.classList.contains("open")) {
          doorSale2.innerHTML = "50%";
          doorSale1.innerHTML = "25%";
          doorSale3.innerHTML = "10%";
        } else if (door3.classList.contains("open")) {
          doorSale1.innerHTML = "10%";
          doorSale3.innerHTML = "50%";
          doorSale2.innerHTML = "25%";
        }
      });
      for (let i = 0; i < doors.length; i++) {
        if (!doors[i].classList.contains("open")) {
          setTimeout(function() {
            doors[i].classList.add("open");
          }, 1500);
        }
        doors[i].removeEventListener("click", openDoor);
      }
    }

    function spin() {
      setTimeout(function() {
        fadeOut(document.querySelector('.door__wrapper'));
        fadeIn(document.querySelector(params.selectors.form));
      }, 3000);
    }

  });
}



function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};
