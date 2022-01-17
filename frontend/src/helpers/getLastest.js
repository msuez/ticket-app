

export const getLastest = async () => {

    const result = await fetch(`http://localhost:8080/lastest`);
    const data = await result.json();

    return data.lastest;

}