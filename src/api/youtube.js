import axios from "axios";

export class Youtube {
    constructor() {
        this.httpClient = axios.create({
            baseURL: 'https://www.googleapis.com/youtube/v3',
            params: {
                key: import.meta.env.VITE_YOUTUBE_API_KEY
            }
        });
    }

    async search(query) {
        return query ? this.#searchByQuery(query) : this.#searchPopular();
    }

    async channelImgURL(id){
        return this.httpClient.get('channels', {
            params: {
                part: 'snippet',
                id: id
            }
        })
        .then(response => response.data.items[0].snippet.thumbnails.default.url);
    }

    async #searchByQuery(query) {
        return this.httpClient.get('search', {
            params: {
                part: 'snippet',
                maxResults: 25,
                q: query,                
        }})
        .then((response) => response.data.items)
        .then(items => items.filter(item => item.id.kind.split('#')[1] === 'video'))
        .then(items => items.map(item => ({...item, id: item.id.videoId})));

    }

    async #searchPopular() {
        return this.httpClient.get('videos', {
            params: {
                part: 'snippet',
                maxResults: 25,
                chart: 'mostPopular',
                regionCode : 'KR'
        }})
        .then((response) => response.data.items);
    }

}