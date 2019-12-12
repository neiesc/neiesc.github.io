function compareValues(key, order = 'asc') {
  return function(a, b) {
    if (
      !Object.prototype.hasOwnProperty.call(a, key) ||
      !Object.prototype.hasOwnProperty.call(b, key)
    ) {
      // property doesn't exist on either object
      return 0
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return order === 'desc' ? comparison * -1 : comparison
  }
}

module.exports = {
  init: async function() {
    const response = await fetch('/podcasts.json')
    const podcasts = await response.json()

    podcasts.sort(compareValues('title'))

    podcasts.forEach(podcast => {
      const timelineItem = document.createElement('div')
      timelineItem.className = 'timeline-item'
      timelineItem.innerHTML = `
      <div class="timeline-left">
          <span class="uk-badge uk-badge-danger"><span uk-icon="heart"></span></span>
      </div>
      <div class="timeline-content">
        <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title"><a href="${podcast.url}" target="_blank" rel="noopener">${podcast.title}</a></h3>
        </div>
      </div>`
      document.querySelector('div.timeline').appendChild(timelineItem)
    })

    const timelineItemFinish = document.createElement('div')
    timelineItemFinish.className = 'timeline-item-finish'
    timelineItemFinish.innerHTML = `
    <div class="timeline-left">
        <span class="uk-badge uk-badge-danger"><span uk-icon="triangle-down"></span></span>
    </div>`
    document.querySelector('div.timeline').appendChild(timelineItemFinish)
  }
}
