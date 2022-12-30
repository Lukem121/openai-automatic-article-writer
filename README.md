## Automatic OpenAI Article Writer

Enter a list of article titles (one per line) in the titles.txt.

## How to run

1. Remove the .demo from .env.demo
2. Add your OpenAI API key into the .env file.
3. You can run the script using ts-node:
   `ts-node app.ts`

You can find the created files in the output directory.

The prompt included in app.ts is written to output HTML friendly content. Change it to meet your needs.
