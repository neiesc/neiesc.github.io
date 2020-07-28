module.exports = {
  init: async function () {
    fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/edinei-dev'
    )
      .then((res) => res.json())
      .then((data) => {
        // Fillter the array
        const res = data.items // This is an array with the content. No feed, no info about author etc..
        const posts = res.filter((item) => item.categories.length > 0) // That's the main trick* !

        function toText(node) {
          const tag = document.createElement('div')
          tag.innerHTML = node
          node = tag.innerText
          return node
        }
        function shortenText(text, startingPoint, maxLength) {
          return text.length > maxLength
            ? text.slice(startingPoint, maxLength)
            : text
        }

        let output = ''
        posts.forEach(item => {
          output += `
             <li class="blog__post">
                <a href="${item.link}">
                   <img src="${item.thumbnail}" class="blog__topImg"></img>
                   <div class="blog__content">
                      <div class="blog_preview">
                         <h2 class="blog__title">${
                           shortenText(item.title, 0, 30) + '...'
                         }</h2>
                         <p class="blog__intro">${
                           '...' +
                           shortenText(toText(item.content), 60, 300) +
                           '...'
                         }</p>
                      </div>
                      <hr>
                      <div class="blog__info">
                         <span class="blog__author">${item.author}</span>
                         <span class="blog__date">${shortenText(
                           item.pubDate,
                           0,
                           10
                         )}</span>
                      </div>
                   </div>
                <a/>
             </li>`
        })

        document.querySelector('.blog').innerHTML = output
      })
  }
}
