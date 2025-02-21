const fsp = require("fs").promises;

async function createBatchFile(path) {
    let data = await fsp.readFile(path, 'utf-8');
    data = JSON.parse(data);

    let batchString = "";
    for (const item of data) {
        const prompt = `Answer the given question. Only respond with the answer, nothing else. Question: ${item.question}`;
        batchString += `{"custom_id": "${item.id}", "method": "POST", "url": "/v1/chat/completions", "body": {"model": "gpt-4o-mini", "messages": [{"role": "user", "content": "${prompt}"}], "temperature": 1}}\n`;
    }

    batchString = batchString.substring(0, batchString.length-1);
    await fsp.writeFile("result.jsonl", batchString, 'utf-8');
}


// Process output
async function processBatchOutput(outPath, inPath) {
    let data = await fsp.readFile(outPath, 'utf-8');
    const objects = data.split('\n').map((item) => JSON.parse(item));

    let inputs = await fsp.readFile(inPath, 'utf-8');
    inputs = JSON.parse(inputs);

    // Optional
    let temp = {};
    for (const item of inputs) {
        temp[item.id.toString()] = item;
    }
    inputs = temp;
    //
    
    let finalResults = [];
    for (const item of objects) {
        let newItem = inputs[item.custom_id];
        newItem.answer = item.response.body.choices[0].message.content;
        finalResults.push(newItem);
    }
    await fsp.writeFile("modified_data.json", JSON.stringify(finalResults), 'utf-8');
}



(async () => {
    await processBatchOutput("output.jsonl", "data.json")
})();