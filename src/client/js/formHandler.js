function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('url').value
    Client.checkForUrl(url)

    console.log("::: Form Submitted :::")

    postData('http://localhost:8082/api', {text: url})
    .then(() => {
        getSentiment('http://localhost:8082/projectData')
    })
    .then(() => {
        updateUI()
    })
}

    const postData = async (url = '', data = {}) => {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        try {
            const newData = await res.json()
            return newData
        } catch(error) {
            console.log('error at post data', error)
        }
    }

const getSentiment = async (url) => {
    const res = await fetch ('http://localhost:8082/projectData')
    try {
        const data = await res.json()
        return data
    } catch(error) {
        console.log('error at getSentiment', error)
    }
}

const updateUI = async () => {
    const req = await fetch('http://localhost:8082/projectData')
    try {
        const allData = await req.json()
        console.log(allData.polarity)
        document.getElementById('polarity').innerHTML = allData.polarity;
        document.getElementById('polarity_confidence').innerHTML = allData.polarity_confidence;
        document.getElementById('subjectivity').innerHTML = allData.subjectivity;
        document.getElementById('subjectivity_confidence').innerHTML = allData.subjectivity_confidence
        document.getElementById('excerpt').innerHTML = allData.text;
    } catch(error) {
        console.log('error at updateUI', error)

    }
}

export { handleSubmit }
