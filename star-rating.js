class CMSStarRating {
  constructor(options) {
    // Get all the lists
    this.list = document.querySelectorAll(options.list)
    // Saving attributes
    this.wrapper = options.wrapper
    this.positiveStar = options.positiveStar
    this.negativeStar = options.negativeStar
    this.maxStar = options.maxStar
    this.input = options.input
    this.containerClass = options.containerClass
    this.defaultMax = options.defaultMax
    this.starGap = options.starGap
    // Calling build function
    this.createBuild()
  }

  createBuild() {
    // Iterating all lists
    this.list.forEach((item, itemIndex) => {
      // Getting max stars for each list
      let maxStar = parseInt(item.getAttribute(this.removeBracket(this.maxStar)))
      let starGap = parseInt(item.getAttribute(this.removeBracket(this.starGap)))
      let checkFlag = true
      // Iterating through all items
      item.querySelectorAll('.w-dyn-item').forEach((listItem, listItemIndex) => {
        if (checkFlag) {
          // Getting all child elements
          let wrapper = listItem.querySelector(this.wrapper) ? listItem.querySelector(this.wrapper) : null

          let stars = maxStar ? maxStar : this.defaultMax
          let gap = starGap ? starGap : 10

          let input = (listItem.querySelector(this.input))
            ? parseInt(listItem.querySelector(this.input).getAttribute(this.removeBracket(this.input)))
            : null
          let positiveStar = listItem.querySelector(this.positiveStar) ? listItem.querySelector(this.positiveStar) : null
          let negativeStar = listItem.querySelector(this.negativeStar) ? listItem.querySelector(this.negativeStar) : null

          // Checking variable
          checkFlag = this.checkVar(wrapper, input, positiveStar, negativeStar, itemIndex, listItemIndex)

          if (checkFlag) {
            // Adding Stars
            this.addStars(wrapper, input, positiveStar, negativeStar, gap, stars)
          }
        }
      })
    })
  }

  addStars(wrapper, input, positiveStar, negativeStar, starGap, maxStar) {
    // Temp star variable
    let stars = 0
    // Creating star container
    let container = document.createElement('div')
    container.classList = this.containerClass
    container.style = `display: flex; align-items: center; gap: 0 ${starGap}px`
    // Adding active stars
    while (stars < input) {
      container.innerHTML += positiveStar.outerHTML
      stars++
    }
    // Adding unactive stars
    while (stars < maxStar && negativeStar != null) {
      container.innerHTML += negativeStar.outerHTML
      stars++
    }
    // Adding container to wrapper
    wrapper.innerHTML = container.outerHTML
  }

  // Removing [] from a string
  removeBracket(string) {
    return string.replace(/[\[\]']+/g, '')
  }

  // Check Var
  checkVar(wrapper, input, positiveStar, itemIndex, listItemIndex) {
    let flag = true

    if (wrapper === null || typeof wrapper === undefined) {
      console.error(`${this.wrapper} is not found at Collection list index ${itemIndex}`)
      flag = false
    }
    if (input === null || typeof input === undefined) {
      console.error(`${this.input} is not found at Collection list index ${itemIndex}`)
      flag = false
    }
    if (positiveStar === null || typeof positiveStar === undefined ) {
      console.error(`Star Images is not found at Collection list index ${itemIndex} at Collection List item index ${listItemIndex}`)
      flag = false
    }

    if (!flag) {
      return false
    }

    return true

  }
}

new CMSStarRating({
  list: '[px-star-list]',
  input: '[px-star-input]',
  positiveStar: '[px-star = "active"]',
  negativeStar: '[px-star = "inactive"]',
  maxStar: '[px-max-star]',
  wrapper: '[px-star-wrapper]',
  defaultMax: 5,
  containerClass: '.px-star-container',
  starGap: '[px-star-gap]'
})
