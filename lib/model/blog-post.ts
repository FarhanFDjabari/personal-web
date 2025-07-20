export interface BlogPost {
    title: string,
    link: string,
    pubDate: string,
    description: string,
    contentSnippet: string,
    categories: string[],
    readTime: number,
    wordCount: number
}