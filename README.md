# qr-node
NodeJS ES6 wrapper for libqrencode C library written by Kentaro Fukuchi (http://fukuchi.org/works/qrencode/index.en.html)

### API
```javascript
static encode(value: string, path?: string, options?: IOptions): Promise<any>
```
where:
* value is your data (up to 7000 digits or 4000 characters)
* path (optional) save your data as file on the path
* options (optional) is options

return: Promise


### How to use

Don't save to file and return Buffer. Used the default options
```javascript
Encoder.encode('myText').then((data) => {
  console.log(data.toString('base64'));
});
```

Don't save to file and return Buffer. Change the background color to transparent and the level to hight
```javascript
Encoder.encode('myText', null, {background_color: '#00000000', level: Levels.HIGH}).then((data) => {
  console.log(data.toString('base64'));
});
```

Save as SVG.
```javascript
Encoder.encode('myText', 'qr.svg', {type: Types.SVG}).then(() => {
  console.log('saved');
});
```

#### IOptions
```javascript
interface IOptions {
  foreground_color?: string; // default: #000000
  background_color?: string; // default: #ffffff
  dot_size?: number; // default: 3
  margin?: number; // default: 4
  level?: string; // default: Levels.LOW
  case_sensitive?: boolean; // default: true
  version?: number; // default: 1
  type?: string; // default: Types.PNG
}
```

#### Levels
```javascript
const Levels = {
  LOW: 'L',
  MEDIUM: 'M',
  QUARTILE: 'Q',
  HIGH: 'H'
};
```

#### Types
```javascript
const Types = {
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
```
