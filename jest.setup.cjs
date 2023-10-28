/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
//require('jest-fetch-mock').enableMocks()
//fetchMock.dontMock() 
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('whatwg-fetch');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.test' })

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({...process.env})
}));