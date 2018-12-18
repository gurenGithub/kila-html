
export default function loader(source) {
  
    console.log(source);
  //source = source.replace(/\[name\]/g, options.name);

  return `export default ${ JSON.stringify(source) }`;
}