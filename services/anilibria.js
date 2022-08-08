const host = "https://api.anilibria.tv/v2/"
const imageHost = 'https://anilibria.tv'


const getTitles = async(idList, codeList, descriptionType = 'plain') => {
    let resp = await fetch(host + 'getTitles?' + new URLSearchParams({
        id_list: (idList || []).join(','),
        code_list: (codeList || []).join(','),
        description_type: descriptionType,
        playlist_type: 'array',
    }));
    let data = await resp.json();
    return data;
}

const searchTitles = async(query) => {
    let resp = await fetch(host + 'searchTitles?' + new URLSearchParams({
        search: query,
        playlist_type: 'array',
        limit: 30
    }));
    let data = await resp.json();
    return data;
}


export { imageHost, getTitles, searchTitles };