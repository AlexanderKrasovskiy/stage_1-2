export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Article {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface SourcesResponse {
    status: 'ok';
    sources: Readonly<NewsSource>[];
}

export interface ArticlesResponse {
    status: 'ok';
    totalResults: number;
    articles: Readonly<Article>[];
}

interface ErrorResponse {
    status: 'error';
    code: string;
    message: string;
}

type ApiResponse = SourcesResponse | ArticlesResponse | ErrorResponse;

export type CallBack = (data?: ApiResponse) => void;
