function haeJuttu() {
    console.log('Kutsutaan fetchiä');
    const promise = fetch('http://localhost:8000');
    console.log('Määritetään resultille then ja catch');
    promise
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response;
        })
        .then((response) => {
            console.log('Valmis');
            console.log('Vastaus:', response);
        })
        .catch((error) => {
            console.log('Epäonnistui');
            console.log('Virhe:', error);
        });
    console.log('Funktio loppui.');
    return 42;
}

async function haeJuttu2() {
    let response;
    try {
        response = await fetch('http://localhost:8000');
        if (!response.ok) {
            throw response;
        }
    } catch (error) {
        return "virhe";
    }
    return "OK";
}

async function haeMontaJuttua() {
    console.log("Kutsutaan haeJuttu2:sta kolme kertaa")
    const promise1 = haeJuttu2();
    const promise2 = haeJuttu2();
    const promise3 = haeJuttu2();
    const promise4 = haeJuttu2();
    const promise5 = haeJuttu2();    
    console.log("Promiset luotu... odotetaan vastauksia...")
    const tulokset = await Promise.all([promise1, promise2, promise3, promise4, promise5]);
    console.log("Tulokset", tulokset);
}