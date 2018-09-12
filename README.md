# ihashgen

[![Build Status](https://travis-ci.org/superoo7/intergrity_gen.svg?branch=master)](https://travis-ci.org/superoo7/intergrity_gen)

Generate Intergrity hash for the use of CDN, which can be used via CLI or Node packages. (Haven't tested on web)

Name: ihashgen

[npmjs](https://www.npmjs.com/package/ihashgen)

# Version

Stable

- ihashgen@1.1.3

## Problem Solved

Initially, I wanted to use unpkg for cdn alongside alongside with checksum for intergrity, but I found out that I need to run follwing bash command in order to generate hash. Therefore, I decided to write a CLI tools to "automate" that.

```bash
curl https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css | openssl dgst -sha384 -binary | openssl base64 -A
```

![](assets/sample.png)

With intergrity checksum, eventhough the CDN is compromised, but your website are still safe from it.

![](assets/intergrity.png)

_console on webpage when the checksum is not the same_

Inspired from [srihash.org](https://www.srihash.org/)

## Usage

### Installation

Install with npm or yarn

```bash
npm install -g ihashgen # yarn global add ihashgen
```

### Using it

#### as Dependency

##### node.js

![](assets/node.png)

ihashgen is a function in typescript

```ts
const intergrityGen: (
  url: string,
  type?: "css" | "js" | undefined,
  algo?: "sha384" | undefined
) => Promise<{
  hash: string;
  html: string;
}>;
```

#### CLI tools

##### General

```bash
> ihashgen --version
1.1.3
> ihashgen --help
Usage: ihashgen [options] [command]

Options:

  -V, --version                   output the version number
  -h, --help                      output usage information

Commands:

  generate|g [options] <cdn_url>  generate links based on url given
```

##### Generate

use `ihashgen g <cdn_url>` or `ihashgen generate <cdn_url>`

```bash
> ihashgen g --help
Usage: generate|g [options] <cdn_url>

generate links based on url given

Options:

  -t, --type [css/js]  specify file type (css/js)
  -a, --algo [sha384]  specify hashing algorithm (sha384)
  -h, --help           output usage information
```

Use command `ihashgen generate <cdn_url>`,

- `-t` or `--type` (file **t**ype) is set to default to check the url string ends with js or css
- `-a` or `--algo` (hashing **a**lgorithm used) is set to sha384

```bash
> ihashgen g https://unpkg.com/react@16.0.0/umd/react.production.min.js -t js -a sha384
Generatring hashes for [https://unpkg.com/react@16.0.0/umd/react.production.min.js]
Done hashing 🔑
Hash:  hqL/av/jdhwexbPMcoB6jzLfvBwAgAo5jKJzMpirHW+FBIg769b9IP70lr90RZm0
Html:  <script src="https://unpkg.com/react@16.0.0/umd/react.production.min.js" integrity="sha384-hqL/av/jdhwexbPMcoB6jzLfvBwAgAo5jKJzMpirHW+FBIg769b9IP70lr90RZm0" crossorigin="anonymous"></script>
```

## Library

- Typescript
- Node.js

### CLI

- commander
- chalk
- ora
- inquirer

### Test

- Jest

### Library used

- Crypto-Js
- Axios

## Roadmaps

- Support other hashing algorithm
- Better CLI with inquirer
- Create webpack configuration for [dynamic-cdn-webpack-plugin](https://www.npmjs.com/package/dynamic-cdn-webpack-plugin)

## License

MIT
