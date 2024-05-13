const loadPhone = async(searchText=8, isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll);
}


const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display see more button if there are more than 12 phones
    const seeMoreContainer = document.getElementById('see-more-container');

    if(phones.length > 12 && !isShowAll){
        seeMoreContainer.classList.remove('hidden');
    }
    else {
        seeMoreContainer.classList.add('hidden');
    }

    // Display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    

    // loop through arrays
    phones.forEach(phone =>{
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-[#0D6EFD0D] border`;
        phoneCard.innerHTML = `
        <figure class="px-8 pt-8"><img src="${phone.image}" alt="Shoes" class="rounded-md" /></figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Lorem ipsum dolor sit amet consectetur. Lorem, ipsum dolor.</p>
            <div class="card-actions">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn primary-clr hover:bg-blue-700 font-semibold text-xl text-white">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);

    });
    // Hide Loading Spinner
    toggleLoadingSpinner(false);
}

// Handle Show Detail
const handleShowDetail = async(id) => {
    // console.log('click show detail', id);
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    show_details.showModal();
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <div class="flex justify-center">
    <img src="${phone.image}" alt="" class="object-center">
    </div>
    <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p><span class="font-semibold text-xl">Brand:</span> ${phone?.brand}</p>
    <p><span class="font-semibold text-xl">Storage:</span> ${phone?.mainFeatures?.storage}</p>
    <p><span class="font-semibold text-xl">Memory: </span> ${phone?.mainFeatures?.memory}</p>
    <p><span class="font-semibold text-xl">Chipset: </span> ${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-semibold text-xl">Display: </span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-semibold text-xl">GPS: </span> ${phone?.others?.GPS}</p>
    <p><span class="font-semibold text-xl">Release Date: </span> ${phone?.releaseDate}</p>
    <div class="modal-action">
        <form method="dialog">
            <button class="btn bg-[#DC3545] text-white hover:bg-rose-700">Close</button>
        </form>
    </div>

    `;
}

// Handle Search Button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
    
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// Handle See More
const handleSeeMore = () => {
    handleSearch(true);
}

// dff
loadPhone();


/*
Phone Search
URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

Example: https://openapi.programming-hero.com/api/phones?search=iphone

Phone detail url:
URL Format: https://openapi.programming-hero.com/api/phone/${id}

Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089
*/
