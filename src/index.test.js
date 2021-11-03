const getProcessingPage = require('./index')

describe('getProcessingPage', () =>
  [
    {
      description: 'should return "Order complete" on [success]',
      input: [{ state: 'success' }, { state: 'success', errorCode: 'INCORRECT_DETAILS' }],
      expected: [
        { title: 'Order complete', message: null },
        { title: 'Order complete', message: null },
      ],
    },
    {
      description: 'should only wait on [processing]',
      input: [{ state: 'processing' }],
      expected: [],
    },
    {
      description: 'should properly handle [error]s ',
      input: [
        { state: 'error', errorCode: 'INCORRECT_DETAILS' },
        { state: 'error', errorCode: 'NO_STOCK' },
        { state: 'error', errorCode: '1234', extraKey: 5678 },
        { state: 'error' },
      ],
      expected: [
        { message: 'Incorrect details have been entered', title: 'Error page' },
        { message: 'No stock has been found', title: 'Error page' },
        { message: null, title: 'Error page' },
        { message: null, title: 'Error page' },
      ],
    },
    {
      description: 'should handle all variants off state',
      input: [
        { state: 'error', errorCode: 'INCORRECT_DETAILS' },
        { state: 'error', errorCode: 'NO_STOCK' },
        { state: 'processing' },
        { state: 'processing' },
        { state: 'success' },
      ],
      expected: [
        { message: 'Incorrect details have been entered', title: 'Error page' },
        { message: 'No stock has been found', title: 'Error page' },
        { message: null, title: 'Order complete' },
      ],
    },
    {
      description: 'should return empty array on empty input',
      input: [],
      expected: [],
    },
    {
      description: 'should return empty array on [undefined] input',
      input: undefined,
      expected: [],
    },
    {
      description: 'should return empty array on [null] input',
      input: null,
      expected: [],
    },
  ].forEach(({ description, input, expected }) => {
    test(description, async () => {
      result = await getProcessingPage(input)
      expect(result).toStrictEqual(expected)
    })
  }))
