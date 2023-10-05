const btn = document.getElementById("prove")
const msg = document.getElementById("msg")
const txt = document.getElementById("text")
const spinner = document.getElementById("spinner")
const img = document.getElementById("img")
const tex = document.getElementById("tex")
const url = "https://prover-twitter-bot-docker-7go3so6c3a-an.a.run.app/web"

// disable button if text is empty
txt.addEventListener("input", () => {
    if (txt.value === '') {
        btn.disabled = true
    } else {
        btn.disabled = false
    }
})

btn.onclick = async () => {
    // reset
    img.hidden = true
    tex.hidden = true
    msg.innerText = ""

    // disable button and show spinner
    btn.disabled = true
    spinner.hidden = false

    try {
        // send request
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'txt': txt.value })
        })
        // check response
        if (!response.ok) {
            throw new Error(response.status + ' ' + response.statusText)
        }
        // show response
        const json = await response.json()
        msg.innerText = json.msg
        const base64 = json.img
        if (base64) {
            img.hidden = false
            img.src = 'data:image/png;base64,' + base64
            tex.hidden = false
            tex.innerText = json.tex
        }
    } catch (e) {
        msg.innerText = 'An unexpected error has occurred: ' + e
    }

    // enable button and hide spinner
    btn.disabled = false
    spinner.hidden = true
}
