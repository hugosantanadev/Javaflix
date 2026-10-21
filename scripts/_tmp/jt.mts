import { compilarEExecutar } from '../lib/java.ts';
async function m(){const t0 = Date.now();
const rs = await Promise.all([
  compilarEExecutar('int x = 10 / 3;\nSystem.out.println("Olá " + x);', { release: 17, executar: true }),
  compilarEExecutar('int x = 10;\nlong y = x;\nint z = y;\n', { release: 17, executar: true }),
  compilarEExecutar('int a = 1 / 0;', { release: 21, executar: true }),
  compilarEExecutar('public class Teste {\n  public static void main(String[] args) {\n    System.out.println("ok " + args.length);\n  }\n}', { release: 25, executar: true }),
  compilarEExecutar('void main() {\n  IO.println("compacto");\n}', { release: 25, executar: true }),
  compilarEExecutar('int _ = 5;', { release: 21, executar: false }),
  compilarEExecutar('int _ = 5;', { release: 25, executar: false }),
]);
for (const r of rs) console.log(JSON.stringify({ c: r.compilou, e: r.erros, s: r.saida, x: r.excecao, cod: r.codigoSaida, modo: r.fonte.modo, cls: r.fonte.classePrincipal }));
console.log('ms', Date.now() - t0);
}
m();
