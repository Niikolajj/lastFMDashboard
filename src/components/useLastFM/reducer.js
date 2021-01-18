const reducer = (state, action) => {
  switch (action.type) {
    case 'PLAY':
      if (state.status === 'initializing' || state.status === 'error') {
        return { ...state, status: 'playing', track: action.payload };
      } else if (JSON.stringify(action.payload) !== JSON.stringify(state.track)) {
        return { ...state, status: 'skipping', track: action.payload };
      } else if (state.status === 'skipping' || state.status === 'playing') {
        return state;
      } else {
        return { ...state, status: 'playing' };
      }
    case 'STOP':
      if (state.status === 'initializing' || state.status === 'error') {
        return { ...state, status: 'stopped', track: action.payload };
      } else if (state.status === 'playing' || state.status === 'skipping') {
        return { ...state, status: 'paused' };
      } else if (state.status === 'paused' || state.status === 'stopped') {
        return state;
      }
      return { ...state, status: 'stopped' };
    case 'PAUSING_ENDED':
      return { ...state, status: 'stopped' };
    case 'SKIPPING_ENDED':
      return { ...state, status: 'playing' };
    case 'ERROR_NO_SONGS':
      if (state.status !== 'error') {
        return { ...state, status: 'error', track: { title: 'No songs', artist: '/Error/' } };
      }
      return state;
    case 'CONNECTION_LOST':
      return state;
  }
};
export default reducer;
