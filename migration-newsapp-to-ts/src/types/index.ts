interface WritableNewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export type NewsSource = Readonly<WritableNewsSource>;

interface WritableArticle {
    source: { readonly id: string | null; readonly name: string };
    author: string | null;
    title: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type Article = Readonly<WritableArticle & Pick<WritableNewsSource, 'url' | 'description'>>;

export interface SourcesResponse {
    status: 'ok';
    sources: NewsSource[];
}

export interface ArticlesResponse {
    status: 'ok';
    totalResults: number;
    articles: Article[];
}

export type CallBack<T> = (data?: T) => void;
