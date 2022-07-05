// function sleep(time) {
//   return new Promise(function(resolve, reject){
// if(time < 500){
//   reject(`${time / 1000} секунд слишком мало для сна`)
// }

//     setTimeout(function(){
//       resolve(`поспал ${time / 1000} секунд`)
//     }, time);
//   })
// }


// sleep(1500).then(res => {
//   console.log(res)
//   return sleep(300);
// }).then(res => {
//   console.log(res)
//   return sleep(5000);
// }).then(res => {
//   console.log(res)
// }).catch(error => {
//   console.log('Ошибочка', error)
// } )

const changesBlock = document.querySelector(".living-example");
const changePics = changesBlock.querySelectorAll(".miracles__pic-wrapper");
let reg = /--hide/g;
// let str = "miracles--hide";
// console.log(reg.test(str))

changePics.forEach(function (item) {
  item
  .classList
  .value
  .split(" ")
  .forEach(function (item, index) {
      console.log(reg.test(String(item)), item, index)
    })
})
