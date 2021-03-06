// //Use Enter Key beside search button
document.querySelector("#search-input").addEventListener("keypress", event => {
  if (event.key !== "Enter") return;
  document.querySelector("#search-btn").click();

});

// //Use Enter Key beside Create Slider button
document.querySelector("#duration-input").addEventListener("keypress", event => {
  if (event.key !== "Enter") return;
  document.querySelector("#create-slider-button").click();

});


const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


//api key (own-created)
const KEY = '20266103-e2f23a73cfc3dfbd94f41ddc0';


//Function to get search string and pass to getImage()
const searchString = () => {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const searchText = document.getElementById('search-input').value;
  getImages(searchText)
  sliders.length = 0;
}

//Function getImages
const getImages = (query) => {
  toggleSpinner(true);
  fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length !== 0) {
        fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&pretty=true`)
          .then(response => response.json())
          .then(data => showImages(data.hits))
          .catch(err => console.log(err))
      } else {
        location.reload();
        alert('Hey, No image found, please search again.');
      }
    })
}


// Function show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail " onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })
  toggleSpinner(false);
}


//Function selectItem
let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;

  if (!event.target.classList.contains('added')) {
    element.classList.add('added');
  } else {
    element.classList.remove('added');
  }

  let item = sliders.indexOf(img);

  if (item === -1) {
    sliders.push(img);
  } else if (item !== -1) {
    sliders.pop(img);
  }
}

// Function check duration
const checkDuration = () => {
  let duration = document.getElementById('duration-input').value;

  // Add a condition to make sure duration is Not Negative 
  if (duration < 0) {
    alert('Please Enter a Positive Duration.');
    return;

  } else if (duration == "") {
    duration = 1000;
  }
  createSlider(duration);
}


//Function CreateSlider
var timer
const createSlider = (duration) => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 images.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';

  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
}


// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}


// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}


//Function Toggle Spinner
const toggleSpinner = (show) => {
  const spinner = document.getElementById('loading-spinner');
  if (show) {
    spinner.classList.remove('d-none');
  } else {
    spinner.classList.add('d-none');
  }

}


