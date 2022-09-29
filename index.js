import clipboard from "clipboardy";
import lolcatjs from 'lolcatjs'

export function cli(args) {
    const textoAreaTransferencia = clipboard.readSync();
    const regexPropsCs = /public .+ .+;/gm;
    const propsCs = textoAreaTransferencia.match(regexPropsCs);

    var classeJs = `constructor () {
    $
}`
    if(propsCs == null){
        lolcatjs.options.colors = true;
        lolcatjs.options.seed = Math.round(Math.random() * 1000);
        lolcatjs.fromString('Propriedades não encontradas');
        return;
    }
    propsCs.forEach(propriedade => {
        let propriedadeSepadara = propriedade.split(' ')

        let nomeTipo = propriedadeSepadara[1].replace('?', '');
        let nomeVariavel = propriedadeSepadara[2].replace(';', '');

        classeJs =  classeJs.replaceAll(`$`, `this.${nomeVariavel} = {};
    $`);

    });

    classeJs = classeJs.replaceAll('$', '');
    clipboard.writeSync(classeJs)

}

