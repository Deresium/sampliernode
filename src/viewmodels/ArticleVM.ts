export default class ArticleVM {
    private articleId: number;
    private title: string;
    private subtitle: string;
    private articleType: string;
    private articleTypeCode: string;
    private date: Date;

    constructor(articleId: number, title: string, subtitle: string, articleType: string, date: Date, articleTypeCode: string) {
        this.articleId = articleId;
        this.title = title;
        this.subtitle = subtitle;
        this.articleType = articleType;
        this.date = date;
        this.articleTypeCode = articleTypeCode
    }

}