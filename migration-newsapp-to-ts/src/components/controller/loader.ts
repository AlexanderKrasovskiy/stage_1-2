type LoaderOptions = {
    [key: string]: string;
};

type GetRespSettings = {
    endpoint: string;
    options: Partial<LoaderOptions>;
};

type NewsSource = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

type ApiResponse = {
    status: 'ok' | 'error';
    sources?: NewsSource[];
    code?: number;
    message?: string;
};

type CallBack = (data?: ApiResponse) => void;

enum StatusCodes {
    Unauthorized = 401,
    NotFound = 404,
}

class Loader {
    baseLink: string;
    options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: GetRespSettings,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        //console.log('RESponse: \n', res); // ======================================
        if (!res.ok) {
            if (res.status === StatusCodes.Unauthorized || res.status === StatusCodes.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options = {}, endpoint: string) {
        const urlOptions = { ...this.options, ...options } as { [key: string]: string };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        //console.log('Composed URL: \n', url.slice(0, -1)); // https://newsapi.org/v2/sources?apiKey=4cdc10...
        return url.slice(0, -1);
    }

    load(method: 'GET', endpoint: string, callback: CallBack, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
