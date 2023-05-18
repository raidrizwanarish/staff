const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search Staff Data and Filter
const searchStates = async (searchText) => {
  const res = await fetch('../data/staff.json');
  const states = await res.json();
  //   console.log(states);
  // Get Match Search Text Input
  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return (
      state.name.match(regex) ||
      state.designation.match(regex) ||
      state.dept.match(regex) ||
      state.joiningdate.match(regex) ||
      state.dob.match(regex) ||
      state.mobile.match(regex) ||
      state.email.match(regex)
    );
  });
  //   if (searchText.length === 0) {
  //     matches = [];
  //   }
  console.log(matches);
  results(matches);
};

// Show Results in Card List

const results = (matches) => {
  if (matches.length > 0) {
    const result = matches
      .map(
        (match) => `
        <div class="card mb-3 rounded overflow-hidden">
        <div class="row">
          <div class="col-5">
            <img src="${match.img}" class="card-img img-fluid " alt="userimage">
          </div>
          <div class="col-7">
            <div>
              <h5 class="card-title mt-2 fs-4">${match.name}</h5><hr class="m-0 p-0">
              <p class="card-text m-0 fw-semibold">${match.designation}</p>
              <p class="card-text m-0"><i class="fa-solid fa-house-user"></i> ${match.dept}</p>
              <!--  <p class="card-text m-0"><i class="fa-solid fa-calendar-days"></i> ${match.joiningdate}</p> -->
              
              <p class="card-text m-0"><i class="fa-solid fa-phone"></i> ${match.mobile}</p>
              <p class="card-text"><i class="fa-solid fa-envelope"></i> ${match.email}</p>
              <div class="row">
              <div class="col-6">
              <p><a href="tel:${match.mobile}" class="btn btn-primary rounded"><i class="fa-solid fa-phone"></i> Call Now</a></p>
          </div>
          <div class="col-6">
              <p><a href="mailto:${match.email}" class="btn btn-primary rounded"><i class="fa-solid fa-envelope"></i> Send Mail</a></p>
          </div>
              </div>
          </div>
          </div>
            </div>
          </div>
        `
      )
      .join('');
    matchList.innerHTML = result;
  } else {
    matchList.innerHTML = `
    <div class="row">
      <div>
          <h1 class="text-center">Data Not Found!</h1>
      </div>
    </div>
    `;
  }
};
search.addEventListener('input', () => searchStates(search.value));
window.addEventListener('load', () => searchStates(search.value));
