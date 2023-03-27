import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import {Grid} from "@mui/material";

const TextEditor = ({ placeholder }) => {
	const editor = useRef(null);
	const [content, setContent] = useState('');
	return (
        <Grid container>
            <Grid item xs={12} sm={9} md={6}>
                <JoditEditor
                    ref={editor}
                    value={content}
                    // config={config}
                    // tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={newContent => {setContent(newContent);}}
                />
            </Grid>
        </Grid>
	);
};
export default TextEditor;