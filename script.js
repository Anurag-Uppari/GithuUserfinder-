let searchBtn =document.querySelector(".btn")
let inputField = document.querySelector(".inpt");
function getGitHubUser(username) {
   return  fetch(`https://api.github.com/users/${username}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      else{
        data=`<h2 style="color:red;" >No Repos found of these ${username}</h2>`
        document.querySelector(".pcard").innerHTML=data;
      }
    })
}
// function getRepos(username) {
//   return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(raw =>{
//     if (raw.ok) {
//       return raw.json();
//     } else {
//       throw new Error('Repos not found');
//     }
//   })
// } 
function decorateprofiledata(details,bi) {

  console.log(details);

  let data=`<h2 class="text-lg font-bold flex items-center gap-2">🧩 Preview</h2>

      <div class="grid sm:grid-cols-[120px_1fr] gap-5 mt-4">
        <img src="${details.avatar_url}" alt="avatar"
             class="w-28 h-28 rounded-xl border border-gray-700" />
        <div class="space-y-3">
          <div>
            <p class="text-xl font-bold">${details.name} <span class="text-gray-400 font-normal">@${details.login}</span></p>
          </div>
          <p class="text-gray-300 leading-relaxed">
            ${details.bio ? details.bio : 'This user has no bio'}
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-full border border-gray-700 text-sm text-gray-400">Followers: ${details.followers}</span>
            <span class="px-3 py-1 rounded-full border border-gray-700 text-sm text-gray-400">Following: ${details.following}</span>
            <span class="px-3 py-1 rounded-full border border-gray-700 text-sm text-gray-400">Repos: ${details.public_repos}</span>
          </div>
        </div>
      </div>`;
  document.querySelector(".pcard").innerHTML=data;


}
searchBtn.addEventListener("click", function(){
  let username= inputField.value.trim();
  if (username.length > 0) {
    getGitHubUser(username).then(data => {
    decorateprofiledata(data);
    })
  }
  else{
    data=`
    <h1 class="text-xl font-bold flex items-center gap-2">🔎 GitHub Profile Search</h1>
      <div class="grid grid-cols-[1fr_auto] gap-3 mt-4">
          <input type="text" name="q" placeholder="Enter GitHub username"
                 class="inpt w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
          <input type="hidden" name="type" value="users" />
            <button type="submit"
                  class="btn bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold text-white">
            Search
          </button>
        
      </div>
     <h2 style="color:red;" >Enter the repo name ${username}</h2>`
        document.querySelector(".se").innerHTML=data;
  }
})