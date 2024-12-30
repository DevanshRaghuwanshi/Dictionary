const wordInput = document.querySelector('#wordInput');
const searchBtn = document.querySelector('#searchBtn');
const meaningDiv = document.querySelector('#meaning');
const exampleDiv = document.querySelector('#example');
const shortMeaningDiv = document.querySelector('#shortMeaning');
const detailedMeaningDiv = document.querySelector('#detailedMeaning');


document.querySelector('#wordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const word = wordInput.value;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;


    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (Array.isArray(json)) {
                const data = json[0]?.meanings;
                const definition = data[0]?.definitions[0]?.definition || "No definition found";
                let example = "No example found";
                for (let i = 0; i < data.length; ++i) {
                    let doBreak = false;
                    for(let j = 0; j < data[i]?.definitions.length; ++j) {
                        if (Object.keys(data[i]?.definitions[j]).includes('example')) {
                            example = data[i]?.definitions[j].example;
                            doBreak = true;
                        }
                    }
                    if(doBreak) break;
                }
                shortMeaningDiv.innerHTML = definition;
                exampleDiv.innerHTML = example;
            }
        })
        .catch(err => {
            console.log(err);
            shortMeaningDiv.innerHTML = "Error occurred while fetching data";
            detailedMeaningDiv.innerHTML = "";
        })
});

