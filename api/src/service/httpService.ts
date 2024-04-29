import axios from "axios";

export default class HttpService {
    fetch = async (url: string) => {
        try {
            const config = {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36", //Setting browser headers, because Amazon site has a script blocker for non-browser requests.
                },
            };

            const searchResponse = await axios.get(url, config);

            return searchResponse;
        } catch (err) {
            throw new Error(
                `There was an error tryng to reach the link: ${url}`
            );
        }
    };
}
