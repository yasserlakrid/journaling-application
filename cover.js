let accessKey='DWYXehW7SqQUqgRAwiLZ--T-yyGyylVc1Dh9uAYuxmk'
let queryList= [ "Nature green background",
"City green background",
"Sunset green background",
"Beach green background",
"Mountain green background",
"Forest green background",
"Animals green background",
"Art green background",
"Abstract green background",
"Architecture green background"]
let query = queryList[Math.random().toFixed(1)*10]
let coverImage = document.querySelector('.cover')

let requesturl =async ()=>{
    try {
    let url = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=1`)
    let urlJson = await url.json()

    if (urlJson.results.length > 0) {
        const imageUrl = urlJson.results[0].urls.regular; // Get the URL of the first image
        
        coverImage.style.backgroundImage=`url(${imageUrl})`
        
  
      } 
    }catch(error){
        console.log(error)
        coverImage.style.backgroundImage=`url(cover.png)`

    }
}
requesturl()