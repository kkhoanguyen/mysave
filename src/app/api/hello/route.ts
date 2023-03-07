export async function GET(request: Request, res: Response) {
  async function getData() {
    // Fetch data from external API
    try {
      const resp = await fetch(
        `https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc&type=Repositories&per_page=${10}`,
        {
          headers: {
            authorization: `token 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`,
          },
        },
      );
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }

    // Pass data to the page via props
  }
  const data = await getData();
  return new Response(JSON.stringify({ data }));
}
