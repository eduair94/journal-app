import { startNewNote } from "../../../src/store/journal";

describe('Test in JournalThunks', () => { 
    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(() => jest.clearAllMocks());
    test('startNewNote should create a new blank note', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({auth: {uid}});
        await startNewNote()(dispatch, getState)
    })  
 })