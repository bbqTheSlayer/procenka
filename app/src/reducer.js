const reducer = (
    state = {
        TableDataSet: [],

        TotalPrice: "0",
    },
    action
) => {

    switch (action.type){
        case 'SET_STATE':
            state = action.payload;
            return state;
            
    default:
        return state;
    }
};

export default reducer;