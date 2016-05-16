import {spawn, ChildProcess} from 'child_process';

export interface IOptions {
  foreground_color?: string;
  background_color?: string;
  dot_size?: number;
  margin?: number;
  level?: string;
  case_sensitive?: boolean;
  version?: number;
  type?: string;
}

export const Levels = {
  LOW: 'L',
  MEDIUM: 'M',
  QUARTILE: 'Q',
  HIGH: 'H'
};

export const Types = {
  PNG: 'PNG',
  EPS: 'EPS',
  SVG: 'SVG',
  ANSI: 'ANSI',
  ANSI256: 'ANSI256',
  ASCII: 'ASCII',
  ASCIIi: 'ASCIIi',
  UTF8: 'UTF8',
  ANSIUTF8: 'ANSIUTF8'
};

export class Encoder {

  private static options: IOptions = <IOptions>{
    foreground_color: '#000000',
    background_color: '#ffffff',
    dot_size: 3,
    margin: 4,
    level: Levels.LOW,
    case_sensitive: true,
    version: 1,
    type: Types.PNG
  };

  public static encode(value: string, path?: string, options?: IOptions): Promise<any> {
    let buffer: Buffer = Buffer.from? Buffer.from(value) : new Buffer(value);
    Object.assign(this.options, options);

    let qrencode_args: Array<any> = [
      '-s', this.options.dot_size,
      '-m', this.options.margin,
      '-l', this.options.level,
      '-v', this.options.version,
      '-t', this.options.type,
      '-o', path || '-'
    ];

    qrencode_args[qrencode_args.length] = '--foreground=' + this.options.foreground_color.replace('#','');
    qrencode_args[qrencode_args.length] = '--background=' + this.options.background_color.replace('#','');

    if (this.options.case_sensitive) {
      qrencode_args[qrencode_args.length] = '-i';
    }
    qrencode_args[qrencode_args.length] = buffer;

    return new Promise((resolve, reject) => {
      let process: ChildProcess =  spawn('qrencode', qrencode_args);

      process.stdout.on('data', (data) => {
        resolve(data);
      });

      process.stderr.on('data', (data) => {
        reject(data);
      });
    });
  }
}