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
    const valoresIniciais = {
        string: `''`,
        guid: `''`,
        int: 0,
        double: 0,
        float: 0,
        object: '{}',
        list: `[]`,
        ienumerable: `[]`,
        bool: 'false',
    }
    propsCs.forEach(propriedade => {
        let propriedadeSepadara = propriedade.split(' ')

        let nomeTipo = propriedadeSepadara[1].replace('?', '').replace(/<.+>/gm, '').toLocaleLowerCase();
        let nomeVariavel = propriedadeSepadara[2].replaceAll(';', '');
        classeJs = classeJs.replaceAll(`$`, `this.${nomeVariavel} = ${valoresIniciais[nomeTipo] != undefined ? valoresIniciais[nomeTipo] : '{}' };
    $`);

    });

    classeJs = classeJs.replaceAll('$', '');
    clipboard.writeSync(classeJs)

}

