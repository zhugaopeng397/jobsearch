/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    env: {
        REACT_APP_PINATA_JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZDU2MDI5ZC1jMWRjLTRhNTAtOTM1My1jNmY5ZDhmMTczMTkiLCJlbWFpbCI6InpodWdhb3BlbmczOTdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI3MmFmMzA0YzhkMzA2ZWQ2NmFkIiwic2NvcGVkS2V5U2VjcmV0IjoiMzljN2RiZWFmZDk1ODM5NDE2NmIwNmIyN2NlMTQ3ZWU1ZTA0MDA1ZWFmZGQzMTQ0ZGUxNGMzMTVjZTZlNGZhOSIsImlhdCI6MTY4OTU1ODA5M30.w_CgkBgfrJw0C8ignauyM1ZBLL1NlNOfq4NDnCFFXHU',
        REACT_APP_GOERLI_URL: 'https://eth-goerli.g.alchemy.com/v2/2eInT2-ib6Ss3SEjwfX8_updV6J8M0dq',
        REACT_APP_TESTNET_ALCHEMY_KEY: '2eInT2-ib6Ss3SEjwfX8_updV6J8M0dq'
    }
 
    
};
   
module.exports = nextConfig;
