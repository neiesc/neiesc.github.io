const helpers = require('./helpers')

module.exports = {
  init: async function () {
    const response = await fetch('/projects.json')
    const projects = await response.json()

    projects.sort(helpers.compareValues('title'))

    projects.forEach(project => {
      const timelineItem = document.createElement('div')
      timelineItem.className = 'timeline-item'
      timelineItem.innerHTML = `
      <div class="timeline-left">
          <span class="uk-badge uk-badge-danger"><span uk-icon="heart"></span></span>
      </div>
      <div class="timeline-content">
        <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">
              <a href="${project.url}" target="_blank" rel="noopener">${project.title}</a><br />
              License: ${project.license}
            </h3>
        </div>
      </div>`
      document.querySelector('div.timeline').appendChild(timelineItem)
    })

    const timelineItemFinish = document.createElement('div')
    timelineItemFinish.className = 'timeline-item-finish'
    timelineItemFinish.innerHTML = `
    <div class="timeline-left">
        <span class="uk-badge uk-badge-danger"></span>
    </div>`
    document.querySelector('div.timeline').appendChild(timelineItemFinish)
  }
}
