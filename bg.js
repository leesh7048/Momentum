const body = document.querySelector("body");

const ACCESS_KEY = "IPcvENpwANB9qOA-VUgowJ-C-_Fg5E9OjvGSnz91K9Y";

async function getRandomPhoto() {
  const res = await fetch(
    `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}`
  );

  const data = await res.json();
  return data.urls.full;
}

async function paintImage() {
  const image = new Image();
  const imageURL = await getRandomPhoto();

  image.src = imageURL;
  image.classList.add("bgImage");
  body.appendChild(image);
}

paintImage();
