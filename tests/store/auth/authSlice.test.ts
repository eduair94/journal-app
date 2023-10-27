import { Action } from '@reduxjs/toolkit'
import {authSlice, login, logout} from '../../../src/store/auth/authSlice'
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from '../../fixtures/authFixtures'
import { AuthStatusEnum } from '../../../src/store/auth/auth.interface'
describe('Test in AuthSlice', () => { 
    test('should return the initialState and be called auth', () => {
        expect(authSlice.name).toBe('auth')
        const state = authSlice.reducer(initialState, { type: 'test' } as Action);
        expect(state).toEqual(initialState)
    })
    test('should login', () => {
        const state = authSlice.reducer(initialState, login(demoUser))
        expect(state).toEqual({
            status: AuthStatusEnum.authenticated,
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        })
    })
    test('should logout no args', () => {
        const state = authSlice.reducer(authenticatedState, logout({errorMessage: null}));
        expect(state).toEqual(notAuthenticatedState);
    })
    test('should logout with args', () => {
        const errorMessage = 'test error message';
        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
        expect(state).toEqual({...notAuthenticatedState, errorMessage});
    })

    test('should change checking state', () => {
        const state = authSlice.reducer(initialState, {type: 'auth/checkingCredentials'})
        expect(state.status).toBe(AuthStatusEnum.checking);
    })
})