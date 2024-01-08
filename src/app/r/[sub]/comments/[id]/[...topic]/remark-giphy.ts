import { visit } from 'unist-util-visit'
//const GiphyRegExp = new RegExp(/!\[gif\]\(([^|]+)\|(.+)\)/)
const GiphyRegExp = new RegExp(/([^|]+)\|(.+)/)
//![gif](giphy|V2AkNZZi9ygbm)
//https://media.giphy.com/media/{code}/giphy.gif

export default function remarkGiphy(options:any) {
  const settings = options || {}
  function transformer(tree: any) {
    visit(tree, "image", (node: any) => {
      if( GiphyRegExp.test(node.url)) {
        const [provider, code, attr] = node.url.split('|')
        if(code && provider === 'giphy') {
          node.url = `https://media.giphy.com/media/${code}/giphy.gif`
        }
      }
    })
  }

  return transformer;
}