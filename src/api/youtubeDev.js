import axios from "axios";

export class YoutubeDev {
    constructor() {

    }

    async search(query) {
        return query ? this.#searchByQuery(query) : this.#searchPopular();
    }

    async #searchByQuery(query) {
        const response = await axios.get(`/public/videos/search.json`).then((response) => response.data.items)
        .then(items => items.filter(item => item.id.kind.split('#')[1] === 'video'))
        .then(items => items.map(item => ({...item, id: item.id.videoId})))
        return response;

    }

    async #searchPopular() {
        const response = await axios.get(`/public/videos/popular.json`).then((response) => response.data.items)
        return response;
    }

}