

// changePics.forEach(function (elem) {
//   elem
//   .classList
//   .value
//   .split(" ")
//   .forEach(function (item, i) {
//     if(reg.test(item) === true){
//       elem.classList.remove(item)
//       console.log(item);
//     }
//     })
// })


let rgItWas =  /it-was/g;
let rgBeCame =  /became/g;
let rgHide =  /hide/g;

const changesBlock = document.querySelector(".living-example");
const pickItWas = changesBlock.querySelector(".miracles__pic-wrapper--it-was");
const pickBeCame = changesBlock.querySelector(".miracles__pic-wrapper--became");

const rangeBar = changesBlock.querySelector(".range-bar");
const buttons = rangeBar.querySelectorAll(".range-bar__btn");
const btnItWas = rangeBar.querySelector(".range-bar__btn--it-was");
const btnBeCame = rangeBar.querySelector(".range-bar__btn--became");

let hide = "miracles__pic--hide"


rangeBar.addEventListener('click', function(e){


if(e.target.classList.value === 'range-bar__strip'){

  if(e.target.value<50){

    pickItWas.style.width = e.target.value + '%';
    pickBeCame.style.width = 100 - Number(e.target.value) + '%';

  }else{

    pickItWas.style.width = e.target.value + '%';
    pickBeCame.style.width = 100 - Number(e.target.value) + '%';
  }
}

if(rgBeCame.test(e.target.className)) {

 if(!rgHide.test(pickItWas.className)){
    pickItWas.classList.add(hide);
    pickBeCame.classList.remove(hide);
  }
}else if(rgItWas.test(e.target.className)){

    if(!rgHide.test(pickBeCame.className)){

      pickBeCame.classList.add(hide);
      pickItWas.classList.remove(hide);
  }

}
})

rangeBar.addEventListener('touchmove', function(e){

if(e.target.classList.value === 'range-bar__strip'){

  if(e.target.value<50){

    pickItWas.style.width = e.target.value + '%';
    pickBeCame.style.width = 100 - Number(e.target.value) + '%';

  }else{

    pickItWas.style.width = e.target.value + '%';
    pickBeCame.style.width = 100 - Number(e.target.value) + '%';
  }
}

if(rgBeCame.test(e.target.className)) {

 if(!rgHide.test(pickItWas.className)){
    pickItWas.classList.add(hide);
    pickBeCame.classList.remove(hide);
  }
}else if(rgItWas.test(e.target.className)){

    if(!rgHide.test(pickBeCame.className)){

      pickBeCame.classList.add(hide);
      pickItWas.classList.remove(hide);
  }

}
})
