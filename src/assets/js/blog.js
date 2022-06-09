const BlogUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://dev.to/feed/edineidev';

function toText(node) {
  const tag = document.createElement('div')
  tag.innerHTML = node
  node = tag.innerText
  return node
}

function shortenText(text, startingPoint, maxLength) {
  return text.length > maxLength ? text.slice(startingPoint, maxLength) : text
}

function renderPosts(posts) {
  let output = ''
  posts.forEach(item => {
    output += `
       <li class="blog__post">
          <a target="_blank" href="${item.link}" rel="noopener">
            <div class="uk-card uk-card-default uk-card-body">
              <h3 class="uk-card-title">
                <img src="${item.thumbnail}" class="blog__topImg" alt="${shortenText(item.title, 0, 30) + '...'}">
                </img>
                ${shortenText(item.title, 0, 30) + '...'}
              </h3>
              <span class="blog__categories">${item.categories.map(item => ' ' + item)}</span>
              <p class="blog__intro">${'...' + shortenText(toText(item.content), 60, 300) + '...'}</p>
              <div class="blog__info">
                  <span class="blog__author">${item.author}</span>
                  <span class="blog__date">${shortenText(item.pubDate, 0, 10)}</span>
              </div>
            </div>
          </a>
       </li>`
  })

  return output
}

function getPosts(data) {
  const items = data.items // This is an array with the content. No feed, no info about author etc..
  return items.filter(item => item.categories.length > 0) // That's the main trick* !
}

module.exports = {
  init: async function () {
    fetch(BlogUrl)
      .then(res => res.json())
      .then(data => {
        const posts = getPosts(data)

        document.querySelector('.blog__posts').innerHTML = renderPosts(posts)

        let categories = []

        posts.map(item => item.categories.map(item2 => categories.push(item2)))

        categories = [...new Set(categories)]

        console.log('categories', categories)
        this.initEvents()
      })
  },
  initEvents: async function () {
    console.log(document.querySelector('.blog__categories > li'))
  },
  filterTag: async function (tags) {
    fetch(BlogUrl)
      .then(res => res.json())
      .then(data => {
        let posts = getPosts(data)

        console.log(posts)

        posts = posts.filter(item => item.categories === tags);

        document.querySelector('.blog__posts').innerHTML = renderPosts(posts)
      })
  }
}
