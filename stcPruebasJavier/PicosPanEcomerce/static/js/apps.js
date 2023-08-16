$(document).ready(function () {

console.log('Apps is ready');
$('#cart-info').on('click', function(){
  const cart = $('#cart')
  cart.toggleClass('show-cart')
  console.log('CArt', cart);
})


})
