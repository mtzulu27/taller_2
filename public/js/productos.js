// filtro con min y max
console.log('hola cliente');
var slider = document.querySelector('#slider');
var sliderMax = document.querySelector('#sliderMax');
document.querySelector('.minMax').addEventListener('click', function(e){
    e.preventDefault();
    location.href = '/?min=' + slider.value + '&max='+sliderMax.value;
});



// carrito
document.querySelectorAll('.agrega').forEach(function(button) {
    button.addEventListener('click', function(){
        var id = button.parentElement.getAttribute('data-id');

        if(arreglo.indexOf(id) >= 0){
            console.log('paila');
            return;
        }

        arreglo.push(id);
        actualizarCarrito();

        localStorage.setItem('arreglo', JSON.stringify(arreglo));
    });
});
