const url = 'https://randomuser.me/api/';
/**
 * Promise Fetch
 */
function prm() {
    console.log("Start fetch...");
    fetch(url)
        .then(data => data.json())
        .then(data => {
            const j = data.results[0];
            return { name: j.name, location: j.location };
        })
        .then(data => {
            console.log(data);
        });
    console.log("End fetch...");
}
/**
 * Async/Await Fetch
 */
async function aa() {
    console.log("Start fetch...");
    let j = await (await fetch(url)).json();
    j = j.results[0];
    j = { name: j.name, location: j.location };
    console.log(j);
    console.log("End fetch...");
    return j;
}

/**
 * Reactive Fetch
 */
function rat() {
    console.log("Start fetch...");
    const { from } = rxjs;
    const { flatMap } = rxjs.operators;
    from(fetch(url))
        .pipe(
            flatMap(r => from(r.json()))
        )
        .subscribe(data => {
            let j = data.results[0];
            j = { name: j.name, location: j.location };
            console.log(j);
            return j;
        });
    console.log("End fetch...");
}

/**
 * The Promise and Reactive are asynchronous
 * Async/Await one is not asynchronous because the log "End fetch..." show after the ajax call done
 */