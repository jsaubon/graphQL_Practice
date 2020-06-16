export async function graphQLQuery(data = []) {
    let apiUrl = `${window.location.origin}/graphql`;
    let response = await axios.post(`${apiUrl}`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.data;
}
