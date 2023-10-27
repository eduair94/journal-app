import {AuthStatusEnum} from '../../src/store/auth/auth.interface'

export const initialState = {
    status: AuthStatusEnum.checking,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: AuthStatusEnum.authenticated,
    uid: '123ABC',
    email: 'demo@mail.com',
    displayName: 'Tester',
    photoURL: 'http://demo.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: AuthStatusEnum.notAuthenticated,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@mail.com',
    displayName: 'Demo User',
    photoURL: 'http://photo.jpg'
}