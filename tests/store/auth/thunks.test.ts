import { loginUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout, startGoogleSignIn } from '../../../src/store/auth';
import {checkingAuthentication, startLoginWithEmailPassword} from '../../../src/store/auth/thunks'
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Test in AuthThunks', () => { 

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('should invoke checking credentials', async () => {
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials())
    })

    test('startGoogleSignIn should call checkingCredentials and login - success', async () => {
        const loginData = {ok: true, ...demoUser};
        (signInWithGoogle as jest.Mock).mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith( {type: 'auth/login', payload: loginData})
    })

    test('startGoogleSignIn should call logout - fail', async () => {
        const errorMessage = 'Google Error';
        const loginData = {ok: false, errorMessage};
        (signInWithGoogle as jest.Mock).mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith( logout({errorMessage}))
    })

    test('startLoginWithEmailPassword should call checkingCredentials and login - success', async () => {
        const loginData = {ok: true, ...demoUser};
        (loginUserWithEmailPassword as jest.Mock).mockResolvedValue(loginData);
        await startLoginWithEmailPassword({email: demoUser.email, password: 'test'})(dispatch);
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith( login(loginData));
    })

    test('startLoginWithEmailPassword should call checkingCredentials and logout - error', async () => {
        const errorMessage = 'Error login user';
        const loginData = {ok: false, errorMessage};
        (loginUserWithEmailPassword as jest.Mock).mockResolvedValue(loginData);
        await startLoginWithEmailPassword({email: demoUser.email, password: 'test'})(dispatch);
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith( logout({errorMessage}));
    })
 })