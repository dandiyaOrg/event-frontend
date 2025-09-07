import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    data: [{id: "1", text: "Dummy text"}]
}

// ADD ALL FUNCTIONAL LOGIC HERE ONLY

function addExample(state, action){

    const entry =  {
        id: nanoid(),
        text: action.payload?.text,
    }

    state.data.push(entry);
}

export const exampleSlice = createSlice({
    name: "example",
    initialState,
    reducers: {
        addExample: addExample(state, action),
    }
})

export const {addExample} = exampleSlice.actions;

export default exampleSlice.reducer; 