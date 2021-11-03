/**
 * Gets the processing page
 * @param {array} data
 */

async function getProcessingPage(data) {
  /* validate input as first step */
  if (!data) {
    return []
  }

  const results = [] //gathers all results

  /* predefine results object */
  const success = {
    title: 'Order complete',
    message: null,
  }

  /**
   * Error handler helper function
   * @param {string | null | undefined} errorCode
   */
  const handleError = errorCode => {
    /*check if errorCode is valid */
    if (!['NO_STOCK', 'INCORRECT_DETAILS'].includes(errorCode)) {
      errorCode = '_EMPTY'
    }

    /* map errorCode to message */
    const message = {
      NO_STOCK: 'No stock has been found',
      INCORRECT_DETAILS: 'Incorrect details have been entered',
      _EMPTY: null,
    }[errorCode || '_EMPTY']

    return {
      message,
      title: 'Error page',
    }
  }

  /* iterate over data with loop */
  for (let i = 0; i < data.length; i++) {
    const { state, errorCode } = data[i]

    switch (state) {
      case 'error':
        results.push(handleError(errorCode))
        break
      case 'success':
        results.push(success)
        break
      case 'processing':
        await wait(2000)
        break
      default:
        break
    }
  }

  return results
}

/**
 * async wait function, takes ms and sets
 * timeout after which promise is resolved
 * @param {number} ms
 */
const wait = async ms => new Promise(resolve => setTimeout(resolve, ms))

const cases = [
  { state: 'error', errorCode: 'INCORRECT_DETAILS' },
  { state: 'error', errorCode: 'NO_STOCK' },
  { state: 'processing' },
  { state: 'error', errorCode: 'X21323' },
  { state: 'success', errorCode: '213XX23' },
  { state: 'success' },
]

async function main() {
  await getProcessingPage(cases)
}

main()

module.exports = getProcessingPage
