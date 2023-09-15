
// Define a variable to store the loaded data.
let newDataOFArray = [];

const loadCategory = async () => {
  try{
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const responseObject = await response.json();
    const responseObjectData = await responseObject.data;
    setCategory(responseObjectData);
  }catch(error){
    console.log(error);
  }
};

const setCategory = (dataArray) => {
  let objectArray = dataArray;
  let categoryPlace = document.getElementById('categoryButton');
  categoryPlace.innerHTML = '';
  
  // Add a "Show All" button to load all videos by default.
  getCategoryElement(1000, true);
  
  objectArray.forEach((category) => {
    let btn = document.createElement('div');
    btn.innerHTML = `
      <button onclick="getCategoryElement(${category.category_id}, false)" 
              class="btn w-[100px] border-[1px] border-black hover:bg-[#FF1F3D] hover:text-white">
        ${category.category}
      </button>
    `;
    categoryPlace.appendChild(btn);
  });
};

const getCategoryElement = async (categoryId, isButtonClicked) => {
  let id = categoryId;
  const categoryById = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
  const categoryByIdData = await categoryById.json();
  const categoryByIdDataArray = await categoryByIdData.data;
  console.log(categoryByIdDataArray)
  
  // ADD DATA TO NEW ARRAY FOR SHORT
  newDataOFArray = categoryByIdDataArray;
  
  // Update the card display.
  lodeCategoryCard(isButtonClicked);
};

const lodeCategoryCard = (isButtonClicked) => {
  const cardPlace = document.getElementById('cardContainer');
  let noDataCardPlace = document.getElementById('noDataCard');
  
  cardPlace.innerHTML =  '';
  noDataCardPlace.innerHTML = '';

  // Sort the video data by views if needed.
  if (isButtonClicked) {
    newDataOFArray.sort((a, b) => {
      let cardA = parseFloat(a.others.views);
      let cardB = parseFloat(b.others.views);
      return cardB - cardA;
    });
  }
  
  let arrayLength = newDataOFArray.length;

  if (arrayLength > 0) {
    newDataOFArray.forEach((singleCard) => {
        const timeSecond =singleCard.others.posted_date;
        let min = Math.floor(timeSecond/60);
        let hours = Math.floor(min/60);
        let setMin = min-(hours*60);
        let createDiv= document.createElement('div');
        createDiv.innerHTML=`
            <div class="card bg-[#eee] p-5 rounded-lg">
                <div class="rounded-lg relative w-[320px] lg:w-full mx-auto">
                    <img src="${singleCard.thumbnail}" alt="CardImage" class="h-[160px] w-[310px] lg:w-[250px] mx-auto rounded-lg ">
                    ${singleCard.others.posted_date?`
                    <div id="time" class="bg-[#171717] p-1 px-2 text-white absolute bottom-2 right-2 rounded-md"><span id="hours"></span>${hours}hrs <span id="minutes">${setMin}</span>min ago</div>
                    `:''}
                </div>
                
                <div class="text flex gap-3 mt-5">
                ${singleCard.authors.map(authorsData=>`
                    <div class="userImage bg-[#eee] overflow-hidden">
                        <img src="${authorsData.profile_picture}" alt="userImage" class="w-[40px] h-[40px] rounded-full">
                    </div>
                    <div class="cardDetails space-y-2">
                        <h2 id="heading" class="font-semibold text-base lg:text-sm xl:text-base text-[#171717] mb-2">${singleCard.title
                        }</h2>
                        <div id="name" class="flex gap-1">
                            <p id="UserName">${authorsData.profile_name}</p>
                            <span>${authorsData.verified?`<img src="./picture/verified.png" alt="image">`:''}</span>
                        </div>
                        <div>
                            <span id="view">${singleCard.others.views}</span> views
                        </div>
                    </div>
                `)}
                </div>
            </div>
        `;
        cardPlace.appendChild(createDiv);
    });
  } else {
    let noData = document.createElement('div');
    noData.innerHTML = `
      <div class="flex flex-col justify-center items-center gap-5 my-10">
        <div class="image">
          <img src="./picture/Icon.png" alt="NoDataImage">
        </div>
        <div class="text">
          <h2 class="w-[300px] mx-auto text-lg lg:text-2xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h2>
        </div>
      </div>
    `;
    noDataCardPlace.appendChild(noData);
  }
};

const blogBTN = () => {
  window.location.href = "blog.html";
};

// DATA SHOT BUTTON FUNCTION.
const dataShort = () => {
  lodeCategoryCard(true);
};

// CALL THE LODE CATEGORY FOR DEFAULT DATA LOAD
loadCategory();
