/*Bellow, I am simply selecting the various elements that I will need in order to make this image slider functional*/
//slider images will be an array containing each image. I'll be able to access an individual image using an index
let sliderImages = document.querySelectorAll('.slide')
let arrowLeft = document.querySelector('#left')
let arrowRight = document.querySelector('#right')
//current is required in order to minipulate which index of the slider images array i choose to display
let current = 0

/*The first function that I've written, simply 'removes' all the images by selecting them and setting their style property 
to display:none. By doing this, I can decide which images to display based on a click event*/
function reset(){
    for(let i = 0; i < sliderImages.length; i++){
        sliderImages[i].style.display = 'none'
    }
}
/*The function bellow, first calls the function above which hides all the images,then displays one image by setting a 
style property of display:block for Slider images at index zero*/
function startSlide(){
    reset();
    sliderImages[0].style.display = 'block'
}
/*this will display the previous image in the image array by minipulating the index*/
function slideLeft(){
    reset();
    sliderImages[current-1].style.display = 'block'
    current--;
}
/*Same as the function above but increases the index in order to display the next image */
function slideRight(){
    reset();
    sliderImages[current+1].style.display = 'block';
    current++;
}
/*Notice how the three functions above call the reset function before running their own logic,
without this, we run into some bugs */

/*The two functions bellow add event listeners to the left nd right arrow icons, then calls their
corosponding function */
/*The if statement is vital. It checks if the current index of slider images, which is being displayed,
is either the first or the last. if the index is the last and we need to go next, we jump to the first index 
before calling the slide function. If the index is the first and we need to go to the previous image, we jump to 
the last image. */
arrowLeft.addEventListener('click', function(){
    if(current === 0){
        current = sliderImages.length;
    }
    slideLeft();
})

arrowRight.addEventListener('click', function(){
    if(current === sliderImages.length -1){
        current = -1
    }
    slideRight()
})

/*This code is not just to showcase my abilities. I will also use it as a resource for future projects 
that require me to create these things*/