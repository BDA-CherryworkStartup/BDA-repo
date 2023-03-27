import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clauseId : "",
    variantId : "",
    versionId : ""
}

export const appReducer = createSlice({
    name : 'appReducer',
    initialState : initialState,
    reducers : {
        setClause : (state,action)=>{
            state.clause = action.payload
        },
        setVariant : (state,action) =>{
            state.variant = action.payload;
        },
        setVersion : (state,action) =>{
            state.version = action.payload;
        },
    }
});

export const { setClause, setVariant, setVersion} = appReducer.actions;

export default appReducer.reducer;