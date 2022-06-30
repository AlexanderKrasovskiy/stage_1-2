interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

interface Article {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface SourcesResponse {
    status: 'ok' | 'error';
    sources: Readonly<NewsSource>[];
}

interface ArticlesResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: Readonly<Article>[];
}

interface ErrorResponse {
    status: 'ok' | 'error';
    code: string;
    message: string;
}

type ApiResponse = SourcesResponse | ArticlesResponse | ErrorResponse;

export type CallBack = (data?: ApiResponse) => void;
