import { exec as _exec } from 'child_process';
import { Code } from 'mdast';
import { join } from 'path';
import { Option, assert } from 'ts-std';
import { promisify } from 'util';
import Options from '../../options';
import parseArgs, { optional, required } from '../../parse-args';

const exec = promisify(_exec);

interface Args {
  lang?: string;
  hidden?: boolean;
  cwd?: string;
  filename?: string;
}

async function applyPatch(patch: string, cwd: string): Promise<void> {
  let promise = exec('git  apply', { cwd });
  promise.child.stdin!.end(patch, 'utf-8');
  await promise;
}

async function generateDiff(filename: string, cwd: string): Promise<{ content: string, diff: string }> {
  let { stdout } = await exec(`git diff -U99999 -- ${JSON.stringify(filename)}`, { cwd });

  assert(!!stdout && stdout !== '\n', `Expecting diff at ${JSON.stringify(filename)}, but was identical`);

  let diff: string[] = [];

  let content = stdout.trimRight().split('\n').filter(line => !(
    line.startsWith('diff ') ||
    line.startsWith('index ') ||
    line.startsWith('--- ') ||
    line.startsWith('+++ ') ||
    line.startsWith('@@ ')
  )).map((line, lineno) => {
    if (line.startsWith('+')) {
      diff.push(`+${lineno}`);
    } else if (line.startsWith('-')) {
      diff.push(`-${lineno}`);
    } else {
      assert(line.startsWith(' '), `diff lines should start with \`[ -+]\`, found ${JSON.stringify(line)}`);
    }

    return line.substr(1);
  });

  return {
    content: content.join('\n'),
    diff: diff.join(',')
  };
}

export default async function patchFile(meta: string, patch: string, options: Options): Promise<Option<Code>> {
  let args = parseArgs<Args>('file:create', meta, [
    optional('lang', String),
    optional('hidden', Boolean),
    optional('cwd', String),
    optional('filename', String)
  ]);

  assert(args.hidden || !!args.filename, `\`filename\` is required, unless \`hidden\` is true`);

  console.log(`Patching file \`${args.filename}\``);

  let cwd = options.cwd;

  if (args.cwd) {
    cwd = join(cwd, args.cwd);
  }

  await applyPatch(patch + '\n', cwd);

  if (args.hidden) {
    return null;
  } else {
    let { content, diff } = await generateDiff(args.filename!, cwd);

    return {
      type: 'code',
      lang: args.lang,
      meta: `{ data-filename="${args.filename}" data-diff="${diff}" }`,
      value: content
    };
  }
}
