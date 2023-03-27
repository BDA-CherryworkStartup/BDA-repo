import React, { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
// import { ngram } from 'nltk';
const TreeBankTokenizer = require("treebank-tokenizer");

const ScanDocument = () => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const treeBankTokenizerObject = new TreeBankTokenizer();

    const [clauses, setClauses] = useState([]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();

        fileReader.onload = async () => {
            const typedArray = new Uint8Array(fileReader.result);
            const pdfDocument = await pdfjs.getDocument(typedArray).promise;
            const numPages = pdfDocument.numPages;
            console.log(numPages);
            const clauses = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdfDocument.getPage(i);
                const pageTextContent = await page.getTextContent();
                const pageText = pageTextContent.items.map(item => item.str).join('');

                // Use NLTK to tokenize the text and identify clauses
                const tokens = treeBankTokenizerObject.tokenize(pageText);
                // const posTags = ngram.pos_tag(tokens);
                // const chunks = ngram.ne_chunk(posTags);

                // const clauseRegex = /(?:^|\n)(?:(?:Article|Section|Clause)\s+\d+\.\s+)?[A-Z][^.]*?\.(?=\s+[A-Z]|$)/g;
                const clauseRegex = /<section>\s*((?:<p>.*<\/p>\s*)+)<\/section>/g;
                let match;
                while ((match = clauseRegex.exec(pageText)) !== null) {
                    const clauseText = match[0];
                    const clauseStart = match.index;
                    const clauseEnd = clauseStart + clauseText.length;
                    const clause = {
                        text: clauseText,
                        start: clauseStart,
                        end: clauseEnd,
                    };
                    clauses.push(clause);
                }
            }

            setClauses(clauses);
        };

        fileReader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} />
            {clauses.map((clause, index) => (
                <div key={index}>
                    <h3>Clause {index + 1}</h3>
                    <p>{clause.text}</p>
                </div>
            ))}
        </div>
    );
}



export default ScanDocument