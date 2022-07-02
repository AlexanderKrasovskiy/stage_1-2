import { CallBack, SourcesResponse, ArticlesResponse } from '../types/index';

type LoaderOptions = {
    [key: string]: string;
};

interface GetRespSettings {
    endpoint: string;
    options?: Partial<LoaderOptions>;
}

enum StatusCodes {
    Unauthorized = 401,
    NotFound = 404,
}

class Loader {
    private baseLink: string;
    private options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: GetRespSettings,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === StatusCodes.Unauthorized || res.status === StatusCodes.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options = {}, endpoint: string) {
        const urlOptions = { ...this.options, ...options } as { [key: string]: string };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: 'GET',
        endpoint: string,
        callback: CallBack<SourcesResponse | ArticlesResponse>,
        options = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res): Promise<SourcesResponse | ArticlesResponse> => res.json())
            .then((data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
