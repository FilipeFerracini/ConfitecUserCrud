export class QueryString {
  public static toString(obj: any): string {
    const params = new URLSearchParams();
    for (const key in obj) {
      if (!(obj[key] === null || obj[key] === undefined)) {
        params.set(key, obj[key]);
      }
    }
    return params.toString();
  }
}
